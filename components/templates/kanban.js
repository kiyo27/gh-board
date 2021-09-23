const blessed = require('blessed')
const contrib = require('blessed-contrib')
const query = require('../../api/query_project')
const column = require('../../components/organisms/column')

module.exports = class {

  constructor(screen) {

    const grid = new contrib.grid({rows: 12, cols: 12, screen: screen})

    this.columns = [
      new column(grid, [0,0,12,4], {label: 'Backlog'}),
      new column(grid, [0,4,12,4], {label: 'In Progress'}),
      new column(grid, [0,8,12,4], {label: 'Done'})
    ]
  }
}