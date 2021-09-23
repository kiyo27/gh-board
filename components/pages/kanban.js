const KanbanTemplate = require('../templates/kanban')
const query = require('../../api/query_project')

module.exports = class {
  constructor(screen) {
    this.screen = screen
    this.kanban = new KanbanTemplate(screen)
    this.labels = ['Backlog', 'In Progress', 'Done']
    this.currentFocus = 0
    screen.key('right', this.focusNext.bind(this))
    screen.key('left', this.focusPrev.bind(this))
    screen.on('element focus', this.select.bind(this))
    this.addItem()

    this.kanban.columns[this.currentFocus].focus()
  }
  
  focusNext() {
    if (this.currentFocus !== this.labels.length - 1) {
      this.currentFocus = ++this.currentFocus % 3
      this.kanban.columns[this.currentFocus].focus()
      this.screen.render()
    }
  }

  focusPrev() {
    if (this.currentFocus !== 0) {
      this.currentFocus = --this.currentFocus % 3
      this.kanban.columns[this.currentFocus].focus()
      this.screen.render()
    }
  }

  select(el) {
    this.currentFocus = this.labels.indexOf(el.options.label)
  }

  addItem() {
    query.project.then(data => {
      data.forEach(nodes => {
        let index = this.labels.indexOf(nodes.name)
        nodes.cards.nodes.forEach(content => {
          this.kanban.columns[index].addItem(content.content.title, content.content.number)
        })

      })
      this.screen.render()
    })
  }
}