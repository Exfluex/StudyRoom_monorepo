import { ISchemaLevelResolver } from '@graphql-tools/utils'
import { Context } from 'apps/serverless-studyroom-mocker/src/data/context'
import { v4 as uuidv4, parse } from 'uuid'
// interface createAccountParameter {
//   email:string;
//   password:string;
//   username:string;
// }

//unused temporarily
// because of JWT Token validate the request from client for this graphql API
// export const createAccount:ISchemaLevelResolver<{},Context,createAccountParameter>= async (_,params,ctx)=>{

//   const uuid =uuidv4();
//   let bytes = parse(uuid) as Uint8Array;
//   //recheck duplicated
//   const uname = params.username + uuid.slice(0,4);
//   let user = await ctx.prisma.user.create({
//     data:{
//       user_email:params.email,
//       user_password:params.password,
//       user_name:params.username,
//       user_uname:uname,
//       user_uuid:Buffer.from(bytes)
//     }
//   })
//   return user;
// }


interface createRoomParameter {
  room_name: string;
  room_description?:string;
  room_password?:string;
}
export const createRoom: ISchemaLevelResolver<{}, Context, createRoomParameter> = async (_, params, ctx) => {
  const uuid = uuidv4();
  let bytes = parse(uuid) as Uint8Array;
  let room = await ctx.prisma.room.create({
    data:{
      room_uuid:Buffer.from(bytes),
      room_owner:ctx.authentication.user_uuid,
      room_description:params.room_description??"",
      room_name:params.room_name,
      room_password:params.room_password??""
    }
  })
  return room;
}
