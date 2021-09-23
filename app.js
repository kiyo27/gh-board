const blessed = require('blessed');
const contrib = require('blessed-contrib')
const query = require('./api/query_project')
const chalk = require('chalk')
const body = require('./api/query_issue')
// const columns = require('./components/organisms/columns')
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
// new columns(screen)

// let style = {
//   align: 'left',
//   vi: true,
//   keys: true,
//   mouse: true,
//   // fg: 'blue',
//   // bg: 'default',
//   // selectedBg: 'green',
//   // style: {
//   //   selected: {
//   //     bg: 'green'
//   //   },
//   //   fg: 'blue',
//   //   bg: 'default'
//   // },
//   label: 'Backlog',
//   scrollbar: {
//     ch: ' ',
//     track: {
//       bg: 'yellow'
//     },
//     style: {
//       inverse: true
//     }
//   }
// }

// let ipStyle = {
//   label: "In Progress",
//   align: 'left',
//   vi: true,
//   keys: true,
//   mouse: true,
//   // fg: 'blue',
//   // bg: 'default',
//   scrollbar: {
//     ch: ' ',
//     track: {
//       bg: 'yellow'
//     },
//     style: {
//       inverse: true
//     }
//   }
// }

// let dStyle = { ...style }
// dStyle.label = 'Done'

// const grid = new contrib.grid({rows: 12, cols: 12, screen: screen})
// var box = grid.set(0,0,12,4, blessed.list, style)
// var inprogress = grid.set(0,4,12,4, blessed.list, ipStyle)
// var done = grid.set(0,8,12,4, blessed.list, dStyle)

// markdown
// const markdown = contrib.markdown()
// markdown.setOptions({ firstHeading: chalk.red.italic })
// markdown.setMarkdown('# Hello \n This is **markdown** printed in the `terminal` 11')

// var markdown = grid.set(0,0,12,4, contrib.markdown, {})
// markdown.setOptions({ firstHeading: chalk.red.italic })
// markdown.setMarkdown('# Hello \n This is **markdown** printed in the `terminal` 11')

// var markdown = grid.set(0,0,12,4, contrib.markdown, {})
// markdown.setOptions({ firstHeading: chalk.red.italic })
// markdown.setMarkdown('# Hello \n This is **markdown** printed in the `terminal` 11')

// var markdown = grid.set(0,0,12,4, contrib.markdown, {})
// screen.append(markdown)
// markdown.hide()

// let fc = 'Backlog'

// // blur event
// function blurFn(el) {
//   this.style.selected.bg = 'default'
//   // fc = el.options.label
//   screen.render()
// }
// box.on('blur', blurFn)
// inprogress.on('blur', blurFn)
// done.on('blur', blurFn)

// // focus event
// function focusFn() {
//   this.style.selected.bg = 'green'
//   screen.render()
// }
// box.on('focus', focusFn)
// inprogress.on('focus', focusFn)
// done.on('focus', focusFn)

// // click event
// box.on('select', function(el) {
//   const title = el.options.content
//   const re = /^.*\s#(\d{1,})$/
//   const result = title.match(re)
//   issueNumber = result[1]

//   box.toggle()
//   inprogress.toggle()
//   done.toggle()
//   markdown.toggle()
//   screen.render()
//   // screen.log(issueNumber)
//   body(Number(issueNumber)).then(data => {
//     markdown.setMarkdown(data)
//     screen.render()
//   })
// })

// screen.key('a', function() {
//   box.toggle()
//   inprogress.toggle()
//   done.toggle()
//   markdown.toggle()
//   screen.render()
//   body(12).then(data => {
//     screen.log(data)
//     markdown.setMarkdown(data)
//     screen.render()
//   })
// })

// screen.key('left', function() {
//   if (fc === 'In Progress') {
//     box.focus()
//   } else if (fc === 'Done') {
//     inprogress.focus()
//   }
// })

// screen.key('right', function() {
//   if (fc === 'Backlog') {
//     inprogress.focus()
//   } else if (fc == 'In Progress') {
//     done.focus()
//   }
// })

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});


// box.focus()

// Render the screen.
screen.render();

// function createTitle(title, num) {
//   return title + " #" + num
// }

// add items to columns
// query.project.then(data => {
//   data.forEach(element => {
//     if (element.name === "Backlog") {
//       element.cards.nodes.forEach(el => {
//         box.addItem(createTitle(el.content.title, el.content.number))
//       })
//     } else if (element.name === "In Progress") {
//       element.cards.nodes.forEach(el => {
//         inprogress.addItem(createTitle(el.content.title, el.content.number))
//       })
//     } else if (element.name = "Done") {
//       element.cards.nodes.forEach(el => {
//         done.addItem(createTitle(el.content.title, el.content.number))
//       })
//     }
//   })
//   screen.render()
// })
