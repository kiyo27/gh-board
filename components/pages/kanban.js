const KanbanTemplate = require('../templates/kanban')
const query = require('../../api/query_project')
const issue = require('../../api/query_issue')

module.exports = class {
  constructor(screen) {
    this.screen = screen
    this.kanban = new KanbanTemplate(screen)
    this.labels = ['Backlog', 'In Progress', 'Done']
    this.currentFocus = 0

    screen.key('right', this.focusNext.bind(this))
    screen.key('left', this.focusPrev.bind(this))
    screen.on('element focus', this.focus.bind(this))
    screen.on('element select', this.showBody.bind(this))
    screen.on('element kanban', this.modeKanban.bind(this))

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

  focus(el) {
    this.screen.log('focus: ', el.options.label)
    if (this.labels.indexOf(el.options.label) > -1) {
      this.currentFocus = this.labels.indexOf(el.options.label)
    }
  }
  
  showBody(el) {
    this.screen.log('enter: ', el.options.label)
    const issueNumber = this.kanban.columns[this.currentFocus].getIssueNumber(el)
    const result = issue.getIssueBodyByNumber(Number(issueNumber))
    this.modeMarkdown()
    this.screen.render()
    
    result.then(data => {
      this.kanban.markdown.setMarkdown(data)
      this.screen.render()
    })
  }
  
  modeMarkdown() {
    this.labels.forEach((_, idx) => {
      this.kanban.columns[idx].hide()
    })
    this.kanban.markdown.show()
    this.kanban.markdown.focus()
  }

  modeKanban() {
    this.labels.forEach((_, idx) => {
      this.kanban.columns[idx].show()
    })
    this.kanban.markdown.hide()
    this.kanban.columns[this.currentFocus].focus()
    // this.screen.log(this.currentFocus)
    this.screen.render()
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