const blessed = require('blessed');
const contrib = require('blessed-contrib')
const query = require('./api/query_project')
const chalk = require('chalk')
const kanban = require('./components/pages/kanban')

// Create a screen object.
const screen = blessed.screen({
  smartCSR: true,
  fullUnicode: true,
  log: 'list.log',
  debug: true,
  // dump: true
});

new kanban(screen)

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Render the screen.
screen.render();
