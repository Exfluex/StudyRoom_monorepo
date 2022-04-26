import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4, parse } from 'uuid'
import { redis } from '../data/database'
const prisma = new PrismaClient();
import * as crypto from 'crypto'
interface createAccountParameter {
  email: string;
  password: string;
  username: string;
}

export const handler = async (rawevent: any, context: any, callback: any) => {
  let event = JSON.parse(rawevent);
  const payloadStr = Buffer.from(event.body, 'base64').toString('utf8');
  const uuid = uuidv4();
  let bytes = parse(uuid) as Uint8Array;
  //recheck duplicated
  try {
    const params = JSON.parse(payloadStr) as createAccountParameter;
    const uname = params.username + uuid.slice(0, 4);
    const hash = crypto.createHash('md5').update(params.password).digest('hex');
    let user = await prisma.user.create({
      select:{
        user_uname:true,
      },
      data: {
        user_email: params.email,
        user_password: hash,
        user_name: params.username,
        user_uname: uname,
        user_uuid: Buffer.from(bytes)
      }
    })
    callback(null,{user})
    // return user;
  }
  catch (e) {
    callback(null,{ status: "fail" })
  }
}
