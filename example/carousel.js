const blessed = require('blessed');
const contrib = require('blessed-contrib')
 
// Create a screen object.
const screen = blessed.screen({
  smartCSR: true
});

function page1(screen) {
    const map = contrib.map({label: 'World Map'})
    screen.append(map)
}

function page2(screen) {
    const line = contrib.line({
        width: 80,
        height: 30,
        left: 15,
        top: 0,
        xPadding: 5,
        label: 'Title'
    })

    const data = [{
        title: 'us-east',
        x: ['t1', 't2', 't3', 't4'],
        y: [0, 0.0695652173913043, 0.11304347826087, 2],
        style: {
            line: 'red'
        }
    }]

    screen.append(line)
    line.setData(data)
}

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0)
})

const carousel = new contrib.carousel(
    [page1, page2],
    {
        screen: screen,
        // interval: 3000,
        controlKeys: true
    }
)

carousel.start()