const argv = require('yargs/yargs')(process.argv.slice(2)).argv;

function run() {

  if (argv.init) {
    const init = require('./src/init')
    init.run()
  }

  if (argv.up) {
    const blessed = require('blessed');
    const kanban = require('./src/components/pages/kanban')
    
    // Create a screen object.
    const screen = blessed.screen({
      smartCSR: true,
      fullUnicode: true,
      log: 'list.log',
      debug: true,
      // dump: 'list.log'
    });
    
    new kanban(screen)
    
    // Quit on Escape, q, or Control-C.
    screen.key(['escape', 'q', 'C-c'], function(ch, key) {
      return process.exit(0);
    });
    
    // Render the screen.
    screen.render();
  }
}

module.exports = run
