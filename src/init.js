const { Octokit } = require("@octokit/core");

async function run() {
  const repo = process.env.REPO_NAME || 'api-sample'
  const owner = process.env.REPO_OWNER || null
  const project = process.env.PROJECT_NAME || 'SampleProject'
  const pat = process.env.ACCESS_TOKEN || null

  
  const octokit = new Octokit({ auth: pat });

  // Get a repository info.
  // If the repository that is specified by the environment variable does not exists on the GitHub,
  // then create a repository alternatively.
  const repoInfo = await octokit.request('GET /repos/{owner}/{repo}', {
    owner: owner,
    repo: repo
  })
    .catch(function(err) {
      return octokit.request('POST /user/repos', {
        name: repo,
        private: true,
        description: 'This repository has been created automatically.'
      })
    })

  // Create a project
  const { data } = await octokit.request('POST /repos/{owner}/{repo}/projects', {
    owner: owner,
    repo: repo,
    name: project
  })

  // Add columns
  const backlog = await octokit.request('POST /projects/{project_id}/columns', {
    project_id: data.id,
    name: 'Backlog'
  })
  await octokit.request('POST /projects/{project_id}/columns', {
    project_id: data.id,
    name: 'In Progress'
  })
  await octokit.request('POST /projects/{project_id}/columns', {
    project_id: data.id,
    name: 'Done'
  })

  // Create a sample issue
  const issue = await octokit.graphql(
    `mutation ($title: String!, $projectIds: ID!, $repoId: ID!) {
      createIssue(input:{title: $title, projectIds: $projectIds, repositoryId: $repoId}) {
        issue {
          projectCards(first: 1) {
            nodes {
              id
            }
          }
        }
      }
    }`,
    {
      title: "Hello world!",
      projectIds: data.node_id,
      repoId: repoInfo.data.node_id
    }
  );

  // Move the issue to the Backlog column
  const move = await octokit.graphql(
    `mutation ($cardId: String!, $columnId: ID!) {
      moveProjectCard(input:{cardId: $cardId, columnId: $columnId}) {
        cardEdge {
          node {
            url
          }
        }
      }
    }`,
    {
      cardId: issue.createIssue.issue.projectCards.nodes[0].id,
      columnId: backlog.data.node_id
    }
  );
  
  console.log('Sample project is deployed.')
}

module.exports = { run }
