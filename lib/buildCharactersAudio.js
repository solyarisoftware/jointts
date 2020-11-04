const fs = require('fs')
const path = require('path')

const { googleTranslateTTS } = require('./googleTranslateTTS')
const { validIsoCode } = require('./googleTranslateLanguages')
const { sleep } = require('./sleep')


/**
 * build Characters audio files
 *
 * @param {String} language ISO code
 *
 */ 
async function buildCharsAudio(language) {

  if ( !validIsoCode(language) )
    return console.error(`ERROR: ${language} is not a valid Google Translate ISO code.`)

  //
  // read characters.json config file
  //
  const configHomeDirectory = `${path.resolve(__dirname, '..')}/config`
  const configFilePath = `${configHomeDirectory}/${language}/characters.json`
  const characterSet = JSON.parse(fs.readFileSync(configFilePath))

  const characters = characterSet.characters
  const audioFilePath = `${characterSet.homedirectory}/${characterSet.language}`

  //console.log(characters)

  //
  // produce an audio file for each character,
  // following configuration settings
  //
  for (const char in characters) {

    const filename = `${audioFilePath}/${characters[char].file}`

    console.info()
    console.info(`char: ${char}`)
    console.info(`text: ${characters[char].text}`)
    console.info(`file: ${filename}`)

    for (;;) {
      try {
      // call translate TTS API
        const result = await googleTranslateTTS(char, filename, language)
        
        console.info(`created file name: ${filename} in ${result.time}`)
        break
      }  
      catch(error) {
        console.error(`WARNING generating googleTransalteTTS for character ${char}: ${error}`)
        // sleep for a second before retrying
        await sleep(1000)
      }
    }  

    // sleep for a second before next character  
    await sleep(1000)
  }  

}


/**
 * unit test
 */
async function main() {
  await buildCharsAudio('it')
}  

if (require.main === module) 
  main()

module.exports = { buildCharsAudio }

