const { GraphQLClient, gql } = require('graphql-request')

const endpoint = 'https://api.github.com/graphql'

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
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
    name: "PersonalTaskManagement",
    owner: "kiyo27"
}


async function main() {
  const data = await graphQLClient.request(query, variables)
  const decode = JSON.stringify(data)
  // console.log(data.repository.issues.nodes)
  return data.repository.project.columns.nodes
}

exports.project = main()
