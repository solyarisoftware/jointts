const fs = require('fs')
const path = require('path')

const configHomeDirectory = `${path.resolve(__dirname, '..')}/config`

function loadConfig(language) {

  const configFilePath = `${configHomeDirectory}/${language}/characters.json`
  const characterSet = JSON.parse(fs.readFileSync(configFilePath))

  return characterSet

}  


function audioFilePath (char, language) {

  const audioFilePath = `${characterSet.homedirectory}/${characterSet.language}`
  const filename = `${audioFilePath}/${characterSet.characters[char].file}`
  return filename

}
