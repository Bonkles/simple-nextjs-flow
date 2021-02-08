import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  gql,
} from '@apollo/client';


export const typeDefs = gql`
  extend type Query {
    investorType: String!
  }
`;
