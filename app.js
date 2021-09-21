const blessed = require('blessed');
const contrib = require('blessed-contrib')
const query = require('./api/query_project')

// Create a screen object.
const screen = blessed.screen({
  smartCSR: true,
  fullUnicode: true,
  log: 'list.log',
  // debug: true,
  // dump: true
});

let style = {
  align: 'left',
  vi: true,
  keys: true,
  mouse: true,
  // fg: 'blue',
  // bg: 'default',
  // selectedBg: 'green',
  // style: {
  //   selected: {
  //     bg: 'green'
  //   },
  //   fg: 'blue',
  //   bg: 'default'
  // },
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

let ipStyle = {
  label: "In Progress",
  align: 'left',
  vi: true,
  keys: true,
  mouse: true,
  // fg: 'blue',
  // bg: 'default',
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

let dStyle = { ...style }
dStyle.label = 'Done'

const grid = new contrib.grid({rows: 12, cols: 12, screen: screen})
var box = grid.set(0,0,12,4, blessed.list, style)
var inprogress = grid.set(0,4,12,4, blessed.list, ipStyle)
var done = grid.set(0,8,12,4, blessed.list, dStyle)

let fc = 'Backlog'

// blur event
function blurFn(el) {
  this.style.selected.bg = 'default'
  fc = el.options.label
  screen.render()
}
box.on('blur', blurFn)
inprogress.on('blur', blurFn)
done.on('blur', blurFn)

// focus event
function focusFn() {
  this.style.selected.bg = 'green'
  screen.render()
}
box.on('focus', focusFn)
inprogress.on('focus', focusFn)
done.on('focus', focusFn)

// click event
box.on('select', function(el) {
  const title = el.options.content
  const re = /^.*\s#(\d{1,})$/
  const result = title.match(re)
  issueNumber = result[1]
})

screen.key('left', function() {
  if (fc === 'In Progress') {
    box.focus()
  } else if (fc === 'Done') {
    inprogress.focus()
  }
})

screen.key('right', function() {
  if (fc === 'Backlog') {
    inprogress.focus()
  } else if (fc == 'In Progress') {
    done.focus()
  }
})

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});


box.focus()

// Render the screen.
screen.render();

function createTitle(title, num) {
  return title + " #" + num
}

// add items to columns
query.project.then(data => {
  data.forEach(element => {
    if (element.name === "Backlog") {
      element.cards.nodes.forEach(el => {
        box.addItem(createTitle(el.content.title, el.content.number))
      })
    } else if (element.name === "In Progress") {
      element.cards.nodes.forEach(el => {
        inprogress.addItem(createTitle(el.content.title, el.content.number))
      })
    } else if (element.name = "Done") {
      element.cards.nodes.forEach(el => {
        done.addItem(createTitle(el.content.title, el.content.number))
      })
    }
  })
  screen.render()
})