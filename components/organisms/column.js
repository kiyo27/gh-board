const blessed = require('blessed')

module.exports = class {
  constructor(grid, pos, options) {
    const style = {
      align: 'left',
      // vi: true,
      // keys: true,
      mouse: true,
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
    const label = options.label

    // row, col, rowSpan, colSpan
    this.column = grid.set(pos[0],pos[1],pos[2],pos[3], blessed.list, { ...style, label })

    this.column.on('blur', this._blur.bind(this))
    this.column.on('focus', this._focus.bind(this))

    this.column.key('k', function() {
      this.up()
    })
    this.column.key('j', function() {
      this.down()
    })
    this.column.key('enter', function(el) {
      this.emit('select')
    })
  }

  focus() {
    this.column.focus()
  }

  _focus() {
    this.column.style.selected.bg = 'green'
    this.column.screen.render()
  }

  _blur() {
    this.column.style.selected.bg = 'default'
  }

  show() {
    this.column.show()
  }

  hide() {
    this.column.hide()
  }

  toggle() {
    this.column.toggle()
  }

  getIssueNumber(el) {
    const title = el.value
    if (title) {
      const re = /^.*\s#(\d{1,})$/
      const result = title.match(re)
      const issueNumber = result[1]
      return issueNumber
    }
  }

  addItem(title, number) {
    const issueTitle = title + " #" + number
    this.column.addItem(issueTitle)
  }
}