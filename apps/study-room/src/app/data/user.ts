import { AvatarConfiguration } from "./avatar";
import { Entity, Id } from "./entity";


enum UserBasicStatus{
  Online=0,
  Offline=1,
  Banned=2,
  Delete=-1
}

export interface UserBreifExcerpt extends Entity{
  username:string;
  email:string;
  avatar:AvatarConfiguration;
  accountStatus:UserBasicStatus;
  status:string;//string[]? annotation?
}
export interface User extends Entity{
  username:string;
  email:string;
  description:string;
  own:Id[];//Room Id
  friends:{[Id:string]:{}};
  avatar:AvatarConfiguration;
  accountStatus:UserBasicStatus;
  status:string;//string[]? annotation?
}
