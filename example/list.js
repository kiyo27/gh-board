const blessed = require('blessed');

// Create a screen object.
const screen = blessed.screen({
  smartCSR: true,
  fullUnicode: true,
  log: 'list.log',
  debug: true,
});

var list1 = blessed.list({
  screen: screen,
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  border: {
    type: 'line'
  },
  items: [
    'one',
    'two',
    'three'
  ],
  // vi: true,
  keys: true,
  mouse: true,
  style: {
    fg: 'white',
    // bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    },
    selected: {
      bg: 'green'
    },
    // item: {
    //   bg: 'white'
    // }
  }
});

list1.on('select', function(el, idx) {
  screen.log('select', el)
})

screen.append(list1)

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

list1.focus()
screen.render()