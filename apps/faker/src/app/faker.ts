import { PrismaClient,room } from '@prisma/client'
const client = new PrismaClient();
import { faker } from '@faker-js/faker'
import * as crypto from 'crypto'

const password = crypto.createHash('md5').update("123456").digest('hex');


export const userGenerator = async function () {
  let i = 500;
  while (i--) {
    try {
      let user = {
        user_email: faker.internet.email(),
        user_name: faker.name.findName(),
        user_uuid: faker.datatype.uuid(),
        user_password: password,
      };
      const auser = await client.user.create({
        data: user
      })
      console.log(auser);
    } catch (e) {

    }
  }
}

export const roomGenerator = async function(){
  let i = 20;
  while(i--){
    try{
      let room={
        room_name:faker.name.findName(),
        room_owner:"0d862d83-adb2-11ec-9ab1-00163e1c8a9c",
        room_status:0,
        room_administrator_num:0,
        room_uuid:faker.datatype.uuid(),
        room_password:"",
      }
      const aroom = await client.room.create({
        data:room
      })
      console.log(aroom);
    }catch(e){

    }
  }
}
