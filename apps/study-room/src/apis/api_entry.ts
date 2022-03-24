import { API_Response } from "./api_config";




export async function Login_API(data: { email: string; password: string }): Promise<API_Response> {
  return {
    message: "LoginedIn",
    status: "success"
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
