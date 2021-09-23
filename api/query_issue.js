const { GraphQLClient, gql } = require('graphql-request')

const endpoint = 'https://api.github.com/graphql'

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
  },
})

const query = gql`
  query getIssues($name: String!, $owner: String!, $number: Int!) {
    repository(name: $name, owner: $owner) {
      issue(number: $number) {
        body
    }
    }
  }
`

module.exports = async function main(number) {
  const variables = {
    name: "PersonalTaskManagement",
    owner: "kiyo27",
    number: number
  }
  const data = await graphQLClient.request(query, variables)
  const decode = JSON.stringify(data)
  // console.log(data.repository.issues.nodes)
  return data.repository.issue.body
}

// module.exports = {
//   body: main
// }