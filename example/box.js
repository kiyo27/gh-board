const blessed = require('blessed');
const contrib = require('blessed-contrib')
 
// Create a screen object.
const screen = blessed.screen({
  smartCSR: true,
  fullUnicode: true
});

// const screen2 = blessed.screen({
//     smartCSR: true
// })

var box1 = blessed.box({
  screen: screen,
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
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
});


function simpleTest(screen) {
    var box2 = blessed.box({
        parent: screen,
        top: 0,
        left: 0,
        width: '50%',
        height: '50%',
        content: 'Multiple screen',
        tags: true,
        border: {
          type: 'line'
        },
        style: {
          fg: 'white',
          bg: 'magenta',
          border: {
            fg: '#f0f0f0'
          }
        }
    });

    screen.append(box2)

    screen.key('i', function() {
      box2.style.bg = 'blue';
      screen.render();
    });

    screen.key(['d'], function(ch, key) {
        // screen.remove(box2)
        box2.detach()
        screen.render()
    })

    screen.render();
}

screen.append(box1)

box1.on('click', function(mouse) {
    // box1.setContent('You clicked ' + mouse.x + ', ' + mouse.y + '.')
    // screen.render();
    simpleTest(screen)
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
});

box1.focus();
screen.render()