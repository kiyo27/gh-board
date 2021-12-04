const { GraphQLClient, gql } = require('graphql-request')
const config = require('../util/config')
const endpoint = 'https://api.github.com/graphql'

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${config.pat}`,
  },
})

const query = gql`
  query getIssues($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      project(number: 1) {
        columns(first: 3) {
          nodes {
            name
            cards {
              nodes {
                content {
                  __typename
                  ... on Issue {
                    number
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const variables = {
    name: config.name,
    owner: config.owner
}


async function main() {
  const data = await graphQLClient.request(query, variables)
  return data.repository.project.columns.nodes
}

exports.project = main()
