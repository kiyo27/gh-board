const blessed = require('blessed')

module.exports = class {
  constructor(grid) {
    const content = 'q: quit    b: kanban'
    this.footer = grid.set(11,0,1,12, blessed.box, {content})
  }
}