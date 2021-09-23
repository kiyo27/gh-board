const { GraphQLClient, gql } = require('graphql-request')
const yaml = require('js-yaml')
const fs = require('fs')

const endpoint = 'https://api.github.com/graphql'

const doc = yaml.load(fs.readFileSync('./config.yaml', 'utf-8'))

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${doc.access_token}`,
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
    name: doc.repository,
    owner: doc.owner
}


async function main() {
  const data = await graphQLClient.request(query, variables)
  const decode = JSON.stringify(data)
  // console.log(data.repository.issues.nodes)
  return data.repository.project.columns.nodes
}

exports.project = main()
