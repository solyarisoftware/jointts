const fs = require('fs')
const path = require('path')

const { googleTranslateTTS } = require('./googleTranslateTTS')
const { validIsoCode } = require('./googleTranslateLanguages')
const { sleep } = require('./sleep')

/**
 * buildCharsAudio
 * 
 * build TTS audio files for each character in configuration file:
 * your/home/path/config/<language iso code>
 * using Google Translate TTS API, 
 *
 * Configuration file: 
 *   config
 *   └── it
 *       └── characters.json
 *     
 *  Audio files created:    
 *    audio/it
 *    ├── àcca.mp3
 *    ├── accento_acuto.mp3
 *    ├── accento_grave.mp3
 *    ├── à_con_accento_grave.mp3
 *    ├── a.mp3
 *    ├── apostrofo.mp3
 *    ├── barra.mp3
 *    ├── barra_retroversa.mp3
 *    ├── barra_verticale.mp3
 *    ├── bi.mp3
 *    ├── ...
 *    ├── ...
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
  console.log('Configuration: ' + configFilePath)

  //
  // produce an audio file for each character,
  // following configuration settings
  //
  for (const char in characters) {

    const audioFileName = `${audioFilePath}/${characters[char].file}`
    const speech = characters[char].speech

    console.info()
    console.info(`char  : ${char}`)
    console.info(`speech: ${speech}`)
    console.info(`file  : ${audioFileName}`)

    for (;;) {
      try {
        // call translate TTS API
        const result = await googleTranslateTTS(speech, audioFileName, language)
        
        console.info(`created file ${audioFileName} in ${result.time}`)
        break
      }  
      catch(error) {
        console.error(`ERROR generating googleTransalteTTS for character ${char}: ${error}`)
        // sleep for a second before retrying
        await sleep(900)
      }
    }  

    // sleep for a while before next character  
    await sleep(900)
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

