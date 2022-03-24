

export const baseUrl="http://localhost:3333/api/v1/";



export function createAPI<Fn>(path:string,fn:Fn){

}


export type API_Response = {
  data?:any;
  message:string;
  status:string;
}
