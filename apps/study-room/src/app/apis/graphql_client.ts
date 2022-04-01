import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";


export const GraphQLClient = new ApolloClient({
  uri:"http://localhost:3333/api/graphql",
  cache: new InMemoryCache()
})

