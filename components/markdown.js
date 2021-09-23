const chalk = require('chalk')

// var markdown = grid.set(0,0,12,4, contrib.markdown, {})
// markdown.setOptions({ firstHeading: chalk.red.italic })
// markdown.setMarkdown('# Hello \n This is **markdown** printed in the `terminal` 11')

module.exports = class {
  constructor(mdObj) {
    this.mdObj = mdObj
  }

  setOptions(option) {
    this.mdObj.setOptions(option)
  }

  setMarkdown(contents) {
    this.mdObj.setMarkdown(contents)
  }

  hide() {
    this.mdObj.hide()
  }

  toggle() {
    this.mdObj.toggle()
  }
}