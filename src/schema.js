var { buildSchema } = require("graphql")

// Construct a schema, using GraphQL schema language
var schemaExport = buildSchema(`
  type Query {
    hello: String
  }
`)

module.export = schemaExport