// const blessed = require('blessed')
const contrib = require('blessed-contrib')
const column = require('../../components/organisms/column')
const markdown = require('../../components/organisms/markdown')
const footer = require('../organisms/footer')

module.exports = class {

  constructor(screen, labels) {

    const [rows, cols] = [12, 12]
    const grid = new contrib.grid({ rows, cols, screen})

    let colSpan = 0
    const colIncrement = labels.length + 1

    this.columns = labels.map(label => {
      const c = new column(grid, [0, colSpan, 11, 12 / labels.length], { label })
      colSpan += colIncrement
      return c
    })

    this.markdown = new markdown(grid)
    this.markdown.hide()

    this.footer = new footer(grid)
  }
}
