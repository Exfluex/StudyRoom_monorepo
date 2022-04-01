import * as express from 'express';
import * as jwt from 'jsonwebtoken'
import {handler as graph} from '../handlers/graphql'
import {handler as echo} from '../handlers/echo'
import { useShortenCall } from '../utils/utils';
//@ts-ignore
BigInt.prototype.toJSON = function() {
  return this.toString()
}
export const authorized = express.Router().use("*",(req,res,next)=>{
  let parsedToken;
  try{
    //@ts-ignore
    parsedToken = jwt.verify(req.headers["x-token"] as string,process.env.JWT_SECRET,{complete:true,algorithms:[process.env.ALG]});
    res.locals.parsedToken = parsedToken;
  }
  catch(e){
    res.send(e);
    return;
  }
  next();
});//JWT Token Check;
authorized.get('/echo', (req, res) => {
  useShortenCall(echo,req,res);
});
authorized.post('/echo',(req,res)=>{
  useShortenCall(echo,req,res);
})
authorized.post("/graphql", (req, res) => {
  useShortenCall(graph,req,res);
})

