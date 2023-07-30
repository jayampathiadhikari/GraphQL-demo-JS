var { graphqlHTTP } = require("express-graphql")
var { buildSchema } = require("graphql")
var express = require("express")



// Construct a schema, using GraphQL schema language
// ! means that value cannot be null
var schema = buildSchema(`
  type Query {
    hello (userId: Int!, name:String): User,
    random: [Int]
    getDie(numSides: Int): RandomDie
  }

  type User {
    id: Int
    name: String
  }

  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }
`)

// The root provides a resolver function for each API endpoint
/* example query.
query : { hello(userId:123, name: "jayam") {id,name}, random}
*/
// This class implements the RandomDie GraphQL type

class RandomDie {
  constructor(numSides) {
    this.numSides = numSides
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides)
  }

  roll({ numRolls }) {
    var output = []
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce())
    }
    return output
  }
}

class User {
  constructor(id, name) {
    this.id = id
    this.name = "__" + name + "__"
  }
}

var root = {
  hello: ({userId, name}) => {
    return new User(userId, name)
  },
  random: () => {
    return [1,2,3]
  },
  getDie: ({ numSides }) => {
    return new RandomDie(numSides || 6)
  },
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