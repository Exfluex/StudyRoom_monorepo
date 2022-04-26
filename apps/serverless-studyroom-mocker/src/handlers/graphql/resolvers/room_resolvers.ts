import { IResolvers, ISchemaLevelResolver, IFieldResolver } from '@graphql-tools/utils'
import { Context } from 'apps/serverless-studyroom-mocker/src/data/context';
import { parse } from 'uuid';
import * as crypto from 'crypto'
import { UserInputError } from 'apollo-server-lambda';
// Join Room
//Keep active room infromation in Redis
//Return room's detailed information
interface joinRoomParameter {
  room_uuid: string;
  room_password?: string;
}

//if not active room
// redis load password & create current in-room students & incr
//if active room
// check full
// check password
const count_identifier = ".count";
const password_identifier = ".pass";
export const joinRoom: ISchemaLevelResolver<any, Context, joinRoomParameter> = async (parent, params, ctx, info) => {
  const b_room_uuid = Buffer.from(parse(params.room_uuid) as Uint8Array);
  // assume active room
  const result = await ctx.redis.evalsha("3b9cb98f537f8b4c20f10099ec56ec90d76cdd24", 2, ctx.authentication.user_uuid.toString("binary"), b_room_uuid.toString("binary"), crypto.createHash('md5').update(params.room_password ?? "").digest('hex')) as string;
  // const count = await ctx.redis.get(b_room_uuid.toString() + count_identifier);
  switch (result) {
    case "SUCCEED":
      const sroom = await ctx.prisma.room.findFirst({
        where: {
          room_uuid: b_room_uuid,
        }
      })
      return sroom;
    case "INACTIVE":
      let iroom = await ctx.prisma.room.findFirst({
        where: {
          room_uuid: b_room_uuid,
        }
      });
      if (iroom) {
        if (iroom.room_password == crypto.createHash('md5').update(params.room_password ?? "").digest('hex')) {
          await ctx.redis.evalsha("2918ed753afa0649d096d10a17e88a30c358b1ea" , 2, ctx.authentication.user_uuid.toString("binary"), b_room_uuid.toString("binary"), iroom.room_password);
          return iroom;
        }
        throw new UserInputError(result);
      }
      throw new UserInputError(result);
    default:
      throw new UserInputError(result);
  }
  // if (count) {
  //   // //active room
  //   // const n_count = Number.parseInt(count);
  //   // if (n_count > 30) {
  //   //   return null;
  //   // }
  //   // ctx.redis.incr(s_room_uuid + count_identifier);
  //   // const pass = await ctx.redis.get(s_room_uuid + password_identifier);
  //   // if (pass == "" || pass == crypto.createHash('md5').update(params.room_password ?? "").digest('hex')) {

  //   //   //re-enter check
  //   //   await ctx.redis.setex(ctx.authentication.user_uuid.toString() + ".status", 3600, room.room_uuid);
  //   //   //exit & enter
  //   //   //Lua script is a perfect way 2 implements this logic

  //   //   return room;
  //   // }
  //   // return null;
  // }
}

