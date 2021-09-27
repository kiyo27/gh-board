const { GraphQLClient } = require('graphql-request')
const yaml = require('js-yaml')
const fs = require('fs')

const doc = yaml.load(fs.readFileSync('./config.yaml', 'utf-8'))


exports.GraphQL = function(query, variables) {
  const graphQLClient = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
      authorization: `Bearer ${doc.access_token}`,
    },
  })
  return graphQLClient.request(query, variables)
}

