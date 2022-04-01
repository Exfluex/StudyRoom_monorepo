/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
require('dotenv').config()
import * as express from 'express';
import { authorized } from './routes/authorized';
import { anonymous } from './routes/anomynouse';

const app = express();
app.use(express.json());

app.use('/api',anonymous);
app.use('/api', authorized);
const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
