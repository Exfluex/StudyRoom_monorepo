
import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken'
const private_key_sec = process.env.JWT_SECRET.replace(/\\n/g,'\n');
import * as crypto from 'crypto'
import { redis } from '../data/database';
const prisma = new PrismaClient();

export const handler = async (rawevent: any, context: any, callback: any) => {
  let event = JSON.parse(rawevent);
  const payloadStr= Buffer.from(event.body,'base64').toString('utf8');
  let payload;
  let usr;
  try{
    payload = JSON.parse(payloadStr) as {email:string;password:string};
    const md5pass = crypto.createHash('md5').update(payload.password).digest('hex');
    usr = await prisma.user.findFirst({select:{user_email:true,user_name:true,user_uuid:true,user_plugins:true},where:{ user_email:payload.email,user_password:md5pass}})
    // redis.set(``)
  }
  catch(e){
    callback(null,{e,payloadStr});
    return;
  }
  let token;
  try{
    //@ts-ignore
    token = jwt.sign(usr,private_key_sec, {
      expiresIn: process.env.EXPIRESIN,
      algorithm: process.env.ALG,
      keyid: process.env.KEYID,
      header: {
        kid: process.env.KEYID,
        alg: process.env.ALG
      }
    })
  }
catch(e){
    console.log(e);
    callback(null,{status:'fail'})
    return;
  }

  callback(null, { token });
}

