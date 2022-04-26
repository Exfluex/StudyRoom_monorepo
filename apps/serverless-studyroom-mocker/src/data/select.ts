import { Prisma } from "@prisma/client";




export const selectNormalUser  = Prisma.validator<Prisma.userSelect>()({
  user_name:true,
  user_uuid:true,
  user_uname:true,
  user_email:true,
  user_create_date:true,
  user_latest_login_date:true,
  user_plugins:true,
  user_role:true
})

export const selectNormalRoom = Prisma.validator<Prisma.roomSelect>()({
  room_name:true,
  room_uuid:true,
  room_latest_action_date:true,
  room_status:true,
  room_description:true,
  room_owner:true,
})
