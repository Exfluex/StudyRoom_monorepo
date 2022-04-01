import { Prisma, PrismaClient } from "@prisma/client";
import { ExpressContext } from "apollo-server-express";
import { Request } from "express";
import Redis from "ioredis";
import { prisma, redis } from "./database";

export interface AliyunFCContext {
  accountId: string;
  credential: {
    accessKeyId: string;
    accessKeySecret: string;
    securityToken: string;
  };
  function: {
    name: string;
    handler: string;
    memory: number;
    timeout: number;
  }
  logger: {
    requestId: string;
  }
  region: string;
  requestId: string;
  retryCount: number;
  service: {
    name: string;
    logProject: string;
    logStore: string;
    qualifier: string;
  }
  tracing: {
    openTracingSpanBaggages: any;
  }
}
export interface AliyunAPIGatewayEventHeaders {
  [headerName: string]: string;
}
export interface AuthenticatedAliyunAPIGatewayEventHeaders extends AliyunAPIGatewayEventHeaders{
  "X-UserUUID":string;
  "X-UserEmail":string;
  "X-UserName":string;
  "X-UserPlugins":string;
}

export interface AliyunAPIGatewayEvent {
  body?: string;
  headers: AliyunAPIGatewayEventHeaders;
  httpMethod: string;
  isBase64Encoded: boolean;
  path: string;
  pathParameters: any;
  queryParameters: any;
}
export interface Context {
  event: AliyunAPIGatewayEvent;
  context: AliyunFCContext;
  request: Request;
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;
  redis: Redis;
  authentication:{
    user_uuid:string;
    user_name:string;
    user_email:string;
    user_plugins:string
  }
}

export const ContextBuilder: (data:{ event: AliyunAPIGatewayEvent, context: AliyunFCContext, express: ExpressContext }) => Context = ({ event, context, express }) => {
  let authentication = null;
  if(event.headers["X-UserUUID"]){
    authentication ={
      user_uuid:event.headers["X-UserUUID"],
      user_name:event.headers["X-UserName"],
      user_email:event.headers["X-UserEmail"],
      user_plugins:event.headers["X-UserPlugins"]
    }
  }
  return { event, context, request: express.req, prisma, redis,authentication }
};
