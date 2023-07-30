var { graphqlHTTP } = require("express-graphql")
var { buildSchema } = require("graphql")
var express = require("express")



// Construct a schema, using GraphQL schema language
// ! means that value cannot be null
var schema = buildSchema(`
  type Query {
    hello (userId: Int!, name:String): User,
    random: [Int]
  }

  type User {
    id: Int
    name: String
  }
`)

// The root provides a resolver function for each API endpoint
/* example query.
query : { hello(userId:123, name: "jayam") {id,name}, random}


 
*/
var root = {
  hello: ({userId, name}) => {
    return {id: userId, name: name + "______"}
  },
  random: () => {
    return [1,2,3]
  }
}
  

  var app = express()
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
    })
  )
  app.listen(4000)
  console.log("Running a GraphQL API server at http://localhost:4000/graphql")