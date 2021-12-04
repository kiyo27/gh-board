const { GraphQLClient } = require('graphql-request')
const config = require('../util/config')

exports.GraphQL = function(query, variables) {
  const graphQLClient = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
      authorization: `Bearer ${config.pat}`,
    },
  })
  return graphQLClient.request(query, variables)
}

