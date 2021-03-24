const fs = require('fs')
const path = require('path')

const { googleTranslateTTS } = require('./googleTranslateTTS')
const { validIsoCode } = require('./googleTranslateLanguages')
const { sleep } = require('./sleep')
const { getArgs } = require('./getArgs')

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
 * checkArgs
 * command line parsing
 *
 * @param {String}                    args
 * @param {String}                    programName
 *
 * @returns {SentenceAndAttributes}
 * @typedef {Object} SentenceAndAttributes
 * @property {String} language 
 * 
 */
function checkArgs(args, programName) {

  const language = args.language 

  if ( !language ) 
    helpAndExit(programName)
  
  return { language }
}


function helpAndExit(programName) {
  console.log()
  console.log('usage:')
  console.log()
  console.log(`    ${programName} --language=<languagecode>`)
  console.log()    
  console.log('    where:')
  console.log('        <languageCode> : language ISO code (it/en/etc.)')
  console.log('                         see https://cloud.google.com/speech-to-text/docs/languages')
  console.log()    
  console.log('example:')
  console.log()
  console.log(`    ${programName} --language=it`)
  console.log()
  process.exit(1)
}  


/**
 * unit test
 */
async function main() {

  const { args } = getArgs()
  const { language } = checkArgs(args, 'node lib/buildCharactersAudio')
  
  await buildCharsAudio(language)

}  

if (require.main === module) 
  main()

module.exports = { buildCharsAudio }

