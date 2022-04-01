import { Response } from "express";


export const eventGenerator = function (rawString: string = "eyJxdWVyeSI6IntcclxuICAgIGhlbGxvXHJcbn0ifQ==", method: string = "GET", path: string = "/test",res:Response,stringfy:boolean=true) {
  const  event = {
    body: Buffer.from(JSON.stringify(rawString)).toString('base64'),
    multiValueHeaders: {
      "content-type": "application/json",
    },//Inject
    "headers": {
      "X-Ca-Dashboard-Uid": "123456",
      "X-Ca-Dashboard-Action": "DEBUG",
      "X-Ca-Dashboard-Role": "USER",
      "X-Forwarded-For": "1.1.1.1",
    },
    "httpMethod": method.toUpperCase(),
    "isBase64Encoded": true,
    "path": path,
    "pathParameters": {},
    "queryParameters": {},
    requestContext: {
    },//Inject
  };
  if(res.locals.parsedToken){
    event.headers = {...event.headers,...PayloadMapper(res.locals.parsedToken.payload)}
  }
  if(stringfy)
  return JSON.stringify(event);
  return event;
}
const PayloadMap = {
  user_uuid:"X-UserUUID",
  user_email:"X-UserEmail",
  user_name:"X-UserName",
  user_plugins:'X-UserPlugins',
}
export const PayloadMapper = (token:{[key:string]:string})=>{
  let res={};
  for (const key in PayloadMap) {
    if (Object.prototype.hasOwnProperty.call(PayloadMap, key)) {
      const element = PayloadMap[key];
      res[element] = token[key];
    }
  }
  return res;
}

export const contextGenerator = function (fn: string = "Test", handler: string = "index.handler", service: string = "test") {
  return {
    "requestId": "AAAAAA-BBBBB-CCCC-DDDDD-EEEEEEEEEE",
    "credentials": {
      "accessKeyId": "123465",
      "accessKeySecret": "1234654897313",
      "securityToken": "123465789134"
    },
    "function": {
      "name": fn,
      "handler": handler,
      "memory": 128,
      "timeout": 60
    },
    "service": {
      "name": service,
      "logProject": "aliyun-fc-cn-hangzhou-123465",
      "logStore": "function-log",
      "qualifier": "LATEST"
    },
    "region": "cn-hangzhou",
    "accountId": "123456789",
    "logger": {
      "requestId": "AAAAAA-BBBBB-CCCC-DDDDD-EEEEEEEEEE"
    },
    "retryCount": 0,
    "tracing": {
      "openTracingSpanBaggages": {}
    }
  }
}
