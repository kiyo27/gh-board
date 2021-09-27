const { gql } = require('graphql-request')
const proxy = require('./proxy')
const config = require('../util/yaml')

async function getIssueBodyByNumber(number) {
  const query = gql`
    query getIssues($name: String!, $owner: String!, $number: Int!) {
      repository(name: $name, owner: $owner) {
        issue(number: $number) {
          body
        }
      }
    }
  `

  const variables = {
    name: config.repository,
    owner: config.owner,
    number: number
  }

  const key = `IssueBody#${number}`

  const data = await proxy.request(key, query, variables)
  return data.repository.issue.body

  // return { key, query, variables }
  // const data = await client.GraphQL(query, variables)
}


module.exports = {
  getIssueBodyByNumber
}
