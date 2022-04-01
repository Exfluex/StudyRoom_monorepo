import { ApolloServer } from 'apollo-server-lambda'
import {BaseRedisCache} from 'apollo-server-cache-redis'
import { resolvers } from './graphql/resolvers/resolvers';
import { typeDefs } from './graphql/schemas/schemas';
import { ContextBuilder } from '../data/context';
import { redis } from '../data/database';


const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  persistedQueries:{
    cache: new BaseRedisCache({
      client: redis,
    }),
    ttl:900
  },
  context:ContextBuilder,
  plugins: [],
});
const apolloHandler = server.createHandler();
export const handler = async (rawevent: any, context: any, callback: any) => {
  let event = JSON.parse(rawevent);
  event.requestContext = {};
  event.multiValueHeaders = { "content-type": "application/json" };
  //@ts-ignore
  apolloHandler(event, context).then((d) => {
    callback(null, d);
    //@ts-ignore
  }).catch(e => {
    callback(e);
  });
};
