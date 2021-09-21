var blessed = require('blessed');
const contrib = require('blessed-contrib')
 
// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
});
 
screen.title = 'my window title';
 
const grid = new contrib.grid({rows: 12, cols: 12, screen: screen})

// Create a box perfectly centered horizontally and vertically.
// var box = blessed.box({
//   top: 'center',
//   left: 'center',
//   width: '50%',
//   height: '50%',
//   content: 'Hello {bold}world{/bold}!',
//   tags: true,
//   border: {
//     type: 'line'
//   },
//   style: {
//     fg: 'white',
//     bg: 'magenta',
//     border: {
//       fg: '#f0f0f0'
//     },
//     hover: {
//       bg: 'green'
//     }
//   }
// });
const style = {
    label: 'Backlog',
    content: 'Hello {bold}world{/bold}!',
    tags: true,
    border: {
        type: 'line'
    },
    style: {
        fg: 'white',
        bg: 'magenta',
        border: {
            fg: '#f0f0f0'
    },
    hover: {
        bg: 'green'
    }
    }
};
 
// Append our box to the screen.
var box = grid.set(0,0,12,4, blessed.box, style)
var inprogress = grid.set(0,4,12,4, blessed.box, {label: 'In Progress'})
var done = grid.set(0,8,12,4, blessed.box, {label: 'Done'})
// screen.append(box);


// If our box is clicked, change the content.
box.on('click', function(mouse) {
  box.setContent('You clicked ' + mouse.x + ', ' + mouse.y + '.')
  screen.render();
});
 
// If box is focused, handle `enter`/`return` and give us some more content.
box.key('enter', function(ch, key) {
  box.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
  box.setLine(1, 'bar');
  box.insertLine(1, 'foo');
  screen.render();
});
 
// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});
 
// Focus our element.
box.focus();
 
// Render the screen.
screen.render();