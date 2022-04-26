import { PrismaClient, room, user } from "@prisma/client";
import { IResolvers, ISchemaLevelResolver, IFieldResolver } from '@graphql-tools/utils'
import { Context } from "../../../data/context";
import { parse, stringify } from 'uuid'
import { selectNormalUser } from "../../../data/select";
import { createRoom } from "./mutations";
import { joinRoom } from "./room_resolvers";
// import { createAccount } from "./mutations";
const prisma = new PrismaClient();


const meQuery: ISchemaLevelResolver<any, Context> = async (parent, args, context, info) => {
  const self = await prisma.user.findFirst({
    select: selectNormalUser,
    where: {
      user_uuid: Buffer.from(context.authentication.user_uuid)
    }
  });
  return self;
};


const listRooms: ISchemaLevelResolver<any, Context, { offset: number, pageSize: number }> = async (parent, args, context, info) => {
  const rooms = context.prisma.room.findMany({ take: args.pageSize, skip: args.pageSize * args.offset });
  return rooms;
}





const RoomOwner: IFieldResolver<room, Context> = (room, __, context, info) => {
  return prisma.user.findFirst({
    select: selectNormalUser,
    where: {
      user_uuid: room.room_owner
    }
  });
}

export const resolvers: IResolvers<any, Context> = {
  Query: {
    me: meQuery,
    listRooms: listRooms,
  },
  Mutation:{
    createRoom:createRoom,
    joinRoom:joinRoom
  },
  User: {
    owned_rooms: (user: user, { take }: { take: number }, context: Context, info) => {
      return context.prisma.user.findFirst({ where: { user_uuid: user.user_uuid } }).rooms({ take });
    },
    user_uuid:(user: user, { take }: { take: number }, context: Context, info) => {
      return stringify(user.user_uuid);
    },
  },
  Room: {
    room_owner: RoomOwner,
    room_count:async (room:room,_,context:Context,info)=>{
      //TODO retreive as a unified api
      const count = await context.redis.get(room.room_uuid.toString("binary")+".count")??0;
      return count;
    },
    room_uuid: (room:room,_,context:Context,info)=>{
      return stringify(room.room_uuid)
    }
  },
  // Mutation: {
    // createAccount: createAccount,
  // }
}
