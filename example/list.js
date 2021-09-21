const blessed = require('blessed');
const contrib = require('blessed-contrib')

// Create a screen object.
const screen = blessed.screen({
  smartCSR: true,
  fullUnicode: true,
  log: 'list.log',
  // debug: true,
  // dump: true
});

const style = {
  align: 'center',
  vi: true,
  keys: true,
  mouse: true,
  fg: 'blue',
  bg: 'default',
  selectedBg: 'green',
  label: 'Backlog',
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
var box = grid.set(0,0,12,4, blessed.list, style)
var inprogress = grid.set(0,4,12,4, blessed.list, {label: 'In Progress'})
var done = grid.set(0,8,12,4, blessed.list, {label: 'Done'})

box.addItem('one')
box.addItem('two')
box.addItem('three')
box.addItem('four')
box.addItem('five')

box.key('enter', function() {
  // box.detach()
  // screen.render()
  box.destroy()
  inprogress.destroy()
  done.destroy()
  screen.render()
})

function init() {
  // const grid = new contrib.grid({rows: 12, cols: 12, screen: screen})
  // var box = grid.set(0,0,12,4, blessed.list, style)
  // var inprogress = grid.set(0,4,12,4, blessed.list, {label: 'In Progress'})
  // var done = grid.set(0,8,12,4, blessed.list, {label: 'Done'})
  
  box.toggle()
}

screen.key('i', function() {
  init()
  screen.render()
})

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

box.focus()
// Render the screen.
screen.render();