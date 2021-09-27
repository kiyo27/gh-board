const chalk = require('chalk')
const contrib = require('blessed-contrib')
const issue = require('../../api/query_issue')

// var markdown = grid.set(0,0,12,4, contrib.markdown, {})
// markdown.setOptions({ firstHeading: chalk.red.italic })
// markdown.setMarkdown('# Hello \n This is **markdown** printed in the `terminal` 11')

module.exports = class {
  constructor(grid) {
    // this.screen = screen
    this.markdown = grid.set(0,0,11,12, contrib.markdown, {})
    // screen.append(this.markdown)
    this.markdown.setOptions({ firstHeading: chalk.red.italic })
    // markdown.setMarkdown('# Hello \n This is **markdown** printed in the `terminal` 11')
    // this.setMarkdown('hoge')

    this.markdown.key('k', this.mode.bind(this))
  }

  setOptions(option) {
    this.mdObj.setOptions(option)
  }

  setMarkdown(contents) {
    this.markdown.setMarkdown(contents)
  }

  show() {
    this.markdown.show()
  }
  
  hide() {
    this.markdown.hide()
  }

  focus() {
    this.markdown.focus()
  }

  toggle() {
    this.markdown.toggle()
  }

  mode() {
    this.markdown.emit('kanban')
    // return false
  }
}