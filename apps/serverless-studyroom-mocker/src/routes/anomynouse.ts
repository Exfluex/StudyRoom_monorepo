import * as express from 'express';
import {handler as authorizer} from '../handlers/authorizer'
import {handler as register} from '../handlers/register'
import { contextGenerator, eventGenerator } from '../utils/mock_ev_ctx_generator';
import { useCallback, useShortenCall } from '../utils/utils';
const anonymous = express.Router();
anonymous.post('/auth', (req, res) => {
  useShortenCall(authorizer,req,res);
});

anonymous.post('/register',(req,res)=>{
  useShortenCall(register,req,res);
})
export default anonymous;
