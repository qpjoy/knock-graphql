var { graphql, buildSchema } = require('graphql');

// Build schema based on the GraphQL concept
var schema = buildSchema(` 
type Query { 
hello: String 
} 
`);

// API root provides a resolver function for each accessing endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

// Execute GraphQL query '{ hello }' and display the corresponding answer
graphql(schema, '{ hello }', root).then(response => {
console.log(response);
});