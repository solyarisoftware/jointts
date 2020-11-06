const fs = require('fs')
const path = require('path')

//
// set the configuration home directory path
//
const configHomeDirectory = `${path.resolve(__dirname, '..')}/config`

let CHARACTERSET = {}


/**
 * loadConfig
 *
 * load JSON file in memory
 *
 * @param {String} language ISO code
 * @return {Object} characters.json as js object
 * 
 */ 
function loadConfig(language) {

  const configFilePath = `${configHomeDirectory}/${language}/characters.json`
  
  return (CHARACTERSET = JSON.parse(fs.readFileSync(configFilePath)))

}  


/**
 * audioFilePath
 * 
 * returns the filename of a character speech file, reading the dictionary in memory.
 * does not check if the file exists.
 *
 * @param {String}  char 
 * @param {String}  language 
 * @param {String}  dictionary configuration dictionary TODO 
 * @return {String} filename   fullpath 
 * 
 */ 
function audioFilePath (char, language, dictionary=CHARACTERSET) {

  // verify that language code JSON attribute corresponds to that requested  
  if (language !== dictionary.language) {
    console.error(`ERROR in audioFilePath: language ${language} doesn't match dictionary language attrribute ${dictionary.language}`)
    return null
  }  

  // TODO
  // validate if char exists in the dictionary.
  if ( !dictionary.characters[char] ) {
    console.error(`ERROR in audioFilePath: char ${char} not found in ${language} dictionary`)
    return null
  }  

  const audioFilePath = `${dictionary.homedirectory}/${dictionary.language}`
  const filename = `${audioFilePath}/${dictionary.characters[char].file}`
  return filename

}

/**
 * unit test
 */
function main() {
  console.log( loadConfig('it') )
  console.log()
  console.log( audioFilePath('昨', 'it') )
  console.log( audioFilePath('@', 'it') )
  console.log( audioFilePath('z', 'it') )
}  

if (require.main === module) 
  main()

module.exports = { 
  loadConfig,
  audioFilePath
}
