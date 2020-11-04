const { name, version, author, description } = require('../package')

function info() {
  return ( 
    '\n' +
    `${name}, ${description}\n` +
    `v. ${version}, (C) ${author}\n`
  )
}  

module.exports = { info }
