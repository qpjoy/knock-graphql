var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');


// Build schema based on the GraphQL concept
var schema = buildSchema(` 
type Query { 
hello: String,
what: String
} 
`);

// API root provides a resolver function for each accessing endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  what: () => {
    return 'what';
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
app.listen(4000);
console.log('Ececute GraphQL API server on localhost:4000/graphql');