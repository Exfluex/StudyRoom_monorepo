import { Response } from "express";
import { contextGenerator, eventGenerator } from "./mock_ev_ctx_generator";


export const useCallback = (res: Response) => {
  return (error, data) => {
    if (data.multiValueHeaders) {
      for (const header in data.multiValueHeaders) {
        if (Object.prototype.hasOwnProperty.call(data.multiValueHeaders, header)) {
          const element = data.multiValueHeaders[header];
          res.setHeader(header, element);
        }
      }
      res.status(data.statusCode)

      res.send(data.body)
      return;
    }
    res.send(data);
  }
}
export const useShortenCall = (handler, req, res) => { handler(eventGenerator(req.body, req.method, req.path, res), contextGenerator(), useCallback(res)); }
