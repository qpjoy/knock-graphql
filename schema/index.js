const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

const UserType = require('./types/user');
const pgdb = require('../database/pgdb');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      description: 'The *mandatory* hellow world example', // User documentation and supports markdown
      resolve: () => 'world',
    },
    me: {
      type: UserType,
      description: 'The current user identified by an api key',
      args: {
        key: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (obj, args, { pgPool }) => pgdb(pgPool).getUserByApiKey(args.key),
    },
  },
});

const ncSchema = new GraphQLSchema({
  query: RootQueryType,
  // mutation: ...
});

module.exports = ncSchema;
