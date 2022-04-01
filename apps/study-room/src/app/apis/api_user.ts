import { AvatarConfiguration } from "../data/avatar";
import { API_Response } from "./api_config";



export async function AvatarModification_API(avatarConfig:AvatarConfiguration):Promise<API_Response>{
  return {
    message:"修改成功",
    status:"Success"
  }
}
