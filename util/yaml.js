const yaml = require('js-yaml')
const fs = require('fs')

const doc = yaml.load(fs.readFileSync('./config.yaml', 'utf-8'))

module.exports = doc