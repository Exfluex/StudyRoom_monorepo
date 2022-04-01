import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";

export const redis = new Redis({
  host:process.env.DB_REDIS_ENDPOINT,
  port:Number.parseInt(process.env.DB_REDIS_PORT),
  username:process.env.DB_REDIS_USER,
  password:process.env.DB_REDIS_PASSWORD,
  db:0
});
export const prisma = new PrismaClient();
