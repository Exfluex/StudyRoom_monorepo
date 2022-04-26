import { setCookie } from "../utils/cookie";
import { API_Response } from "./api_config";




export async function Login_API(data: { email: string; password: string }): Promise<API_Response> {

  const res  = await fetch('/api/auth',{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  });
  if(res.status === 200){
    const json = await res.json();
    setCookie("token",json.token)
    return {
      message:"LoggedIn",
      status:"success",
    }
  }
  return {
    message:"Login Failed",
    status:"fail"
  }
}



export async function Register_API(data: {
  username: string;
  email: string;
  password: string;
  comfirmPassword: string;
}): Promise<API_Response> {
  return {
    message: "Register",
    status: "success"
  }
}
