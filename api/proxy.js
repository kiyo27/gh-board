const issue = require('./query_issue')
const client = require('./client')

class Proxy {
  constructor() {
    this.cache = {}
  }

  request(key, query, variables) {
    if (this.cache.hasOwnProperty(key)) {
      // return 'cache hit'
      return this.cache[key]
    }

    const result = client.GraphQL(query, variables)
    this.cache[key] = result
    return result
  }
}

module.exports = new Proxy()