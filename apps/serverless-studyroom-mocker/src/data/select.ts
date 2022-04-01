import { Prisma } from "@prisma/client";




export const selectNormalUser  = Prisma.validator<Prisma.userSelect>()({
  user_name:true,
  user_uuid:true,
  user_email:true,
  user_create_date:true,
  user_latest_login_date:true,
  user_plugins:true,
  user_role:true
})
