
function columnsSeparator() {
  let columns = []
  if (process.env.KANBAN_COLUMNS === undefined) {
    return columns = ['Backlog', 'In Progress', 'Done']
  }

  columns = process.env.KANBAN_COLUMNS.split(',')
  return columns
}

module.exports = function() {
  const errorMessages = {
    pat: 'Access token must be set as an environment variable.',
    name: 'Repository name must be set as an environment variable.',
    owner: 'Repository owner must be set as an environment variable.'
  }

  let config = {
    pat: process.env.ACCESS_TOKEN || null,
    name: process.env.REPO_NAME || null,
    owner: process.env.REPO_OWNER || null
  }

  for (const prop in config) {
    if (config[prop] === null) {
      console.error(errorMessages[prop])
      process.exit(1)
    }
  }

  config['columns'] = columnsSeparator()

  return config
}()
