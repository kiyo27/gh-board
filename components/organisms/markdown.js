const chalk = require('chalk')
const contrib = require('blessed-contrib')

module.exports = class {
  constructor(grid) {
    const style = {
      scrollable: true,
      alwaysScroll: true,
      mouse: true,
      keys: true,
      vi: true,
      scrollbar: {
        ch: ' ',
        track: {
          bg: 'yellow'
        },
        style: {
          inverse: true
        }
      }
    }

    this.markdown = grid.set(0,0,11,12, contrib.markdown, style)
    this.markdown.setOptions({ firstHeading: chalk.red.italic })

    this.markdown.key('b', this.mode.bind(this))
  }

  setOptions(option) {
    this.mdObj.setOptions(option)
  }

  loading() {
    this.markdown.setMarkdown('Now loading...')
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