const blessed = require('blessed')
const contrib = require('blessed-contrib')
const column = require('../../components/organisms/column')
const markdown = require('../../components/organisms/markdown')
const footer = require('../organisms/footer')

module.exports = class {

  constructor(screen) {

    const grid = new contrib.grid({rows: 12, cols: 12, screen: screen})

    this.columns = [
      new column(grid, [0,0,11,4], {label: 'Backlog'}),
      new column(grid, [0,4,11,4], {label: 'In Progress'}),
      new column(grid, [0,8,11,4], {label: 'Done'})
    ]

    this.markdown = new markdown(grid)
    this.markdown.hide()

    this.footer = new footer(grid)
  }
}