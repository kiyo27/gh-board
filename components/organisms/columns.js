const blessed = require('blessed')
const contrib = require('blessed-contrib')
const query = require('../../api/query_project')
const column = require('./column')

module.exports = class {

  constructor(screen) {
    this.screen = screen;
    this.currentFocus = 'Backlog'
    const style = {
      align: 'left',
      vi: true,
      keys: true,
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

    const grid = new contrib.grid({rows: 12, cols: 12, screen: screen})

    // this.backlog = grid.set(0,0,12,4, blessed.list, { ...style, label: 'Backlog' })
    this.backlog = new column(grid, [0,0,12,4], {label: 'Backlog'})
    this.inprogress = new column(grid, [0,4,12,4], {label: 'In Progress'})
    this.done = new column(grid, [0,8,12,4], {label: 'Done'})

    // this.inprogress = grid.set(0,4,12,4, blessed.list, { ...style, label: 'In Progress' })
    // this.done = grid.set(0,8,12,4, blessed.list, { ...style, label: 'Done' })

    // this.setEvent()
    this.fetchData()
  }

  setEvent() {
    // this.backlog.on('blur', this.blur)
    // this.inprogress.on('blur', this.blur)
    // this.done.on('blur', this.blur)
    
    // this.backlog.on('focus', this.focus)
    // this.inprogress.on('focus', this.focus)
    // this.done.on('focus', this.focus)
    
    // this.backlog.on('select', this.selected)
  }
  
  // blur event
  blur(el) {
    // el.screen.log('blur')
    // this.style.selected.bg = 'default'
    // currentFocus = el.options.label
    // el.screen.render()
  }
  
  // focus event
  focus(currentFocus) {
    // this.style.selected.bg = 'green'
    this.inprogress.focusColumn()
    // screen.render()

  }

  toggle() {
    this.backlog.toggle()
    this.inprogress.toggle()
    this.done.toggle()
    
  }
  
  // select event
  selected(el) {
    const title = el.options.content
    const re = /^.*\s#(\d{1,})$/
    const result = title.match(re)
    const issueNumber = result[1]
  }

  createTitle(title, num) {
    return title + " #" + num
  }

  fetchData() {
    query.project.then(data => {
      data.forEach(element => {
        if (element.name === "Backlog") {
          element.cards.nodes.forEach(el => {
            this.backlog.addItem(this.createTitle(el.content.title, el.content.number))
          })
        } else if (element.name === "In Progress") {
          element.cards.nodes.forEach(el => {
            this.inprogress.addItem(this.createTitle(el.content.title, el.content.number))
          })
        } else if (element.name = "Done") {
          element.cards.nodes.forEach(el => {
            this.done.addItem(this.createTitle(el.content.title, el.content.number))
          })
        }
      })
    })
  }

}