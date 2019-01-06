const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require('graphql');


const pgdb = require('../../database/pgdb');
const NameType = require('./name');
const ContestStatusType = require('./contest-status');

module.exports = new GraphQLObjectType({
  name: 'ContestType',

  fields: {
    id: { type: GraphQLID },
    code: { type: GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    status: { type: GraphQLNonNull(ContestStatusType) },
    createdAt: { type: GraphQLNonNull(GraphQLString) },
    names: {
      type: new GraphQLList(NameType),
      resolve(obj, args, { pgPool }) {
        return pgdb(pgPool).getNames(obj);
      },
    },
  },
});
