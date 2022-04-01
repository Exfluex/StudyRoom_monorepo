import { PrismaClient, room, user } from "@prisma/client";
import {IResolvers,ISchemaLevelResolver,IFieldResolver} from '@graphql-tools/utils'
import { Context } from "../../../data/context";
import { selectNormalUser } from "../../../data/select";
const prisma = new PrismaClient();


const meQuery:ISchemaLevelResolver<any,Context>=(parent,args,context,info)=>{
  const self = prisma.user.findFirst({
    select:selectNormalUser,
    where:{
      user_uuid:context.authentication.user_uuid
    }
  });
  return self;
};


const listRooms:ISchemaLevelResolver<any,Context,{offset:number,pageSize:number}>=async (parent,args,context,info)=>{
  console.log({parent,info});
  const rooms = context.prisma.room.findMany({ take:args.pageSize,skip:args.pageSize*args.offset});
  return rooms;
}





const RoomOwner:IFieldResolver<room,Context>=(room,__,context,info)=>{
  return prisma.user.findFirst({
    select:selectNormalUser,
    where:{
      user_uuid:room.room_owner
    }
  });
}


export const resolvers:IResolvers<any,Context> = {
  Query: {
    me:meQuery,
    listRooms:listRooms
  },
  User:{
    owned_rooms:(user:user,{take}:{take:number},context:Context,info)=>{
      return context.prisma.user.findFirst({where:{user_uuid:user.user_uuid}}).rooms({take});
    }
  },
  Room:{
    room_owner:RoomOwner
  }
};
