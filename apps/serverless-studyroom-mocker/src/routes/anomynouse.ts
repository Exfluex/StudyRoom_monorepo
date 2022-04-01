import * as express from 'express';
import {handler as authorizer} from '../handlers/authorizer'
import { contextGenerator, eventGenerator } from '../utils/mock_ev_ctx_generator';
import { useCallback, useShortenCall } from '../utils/utils';
export const anonymous = express.Router();
anonymous.post('/auth', (req, res) => {
  useShortenCall(authorizer,req,res);
});

