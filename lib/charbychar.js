const { concatAudiofiles } = require('./concatAudioFiles')
const { loadConfig, audioFilePath } = require('./characters.js')
const { sanitizeFilename } = require('./sanitizeFilename')
const { getArgs } = require('./getArgs')


/**
 * charByChar 
 *
 * the text is spelled, pronouncing each char in sequence.
 * The returned object is an audio file.
 *
 * @param {String}  text            sentence to be spoken
 * @param {string}  language        language_code ('en-us', 'it', )
 * @param {String}  filename        name of audio file
 * @param {Number}  interCharPause  blank to be inserted between chars
 *
 * @return {String} filename       name of audio file
 *
 */
function charByChar( text, language, filename, interCharPauseFile ) {

  const inputFilenames = text
    // create and array iof characters from the string
    .toLowerCase()
    .split('')

    // assign a filename for each character (the spelling speech)
    .map( char => audioFilePath(char, language) )
    
    // insert a pause file after each character spelling speech
    .map( i => [i, interCharPauseFile] )
    .flat()

  // concatenate all files 
  return concatAudiofiles( inputFilenames, filename )
}  


function helpAndExit(programName) {
  console.log()
  console.log('usage:')
  console.log()
  console.log(`    ${programName} \\ `)
  console.log('         --language=<languagecode> \\ ')
  console.log('         --text=<textToSpeech> \\ ')
  console.log('         [--pause=<pauseFile>]')
  console.log()    
  console.log('    where:')
  console.log('        <language>   : language ISO code (it/en/etc.)')
  console.log('                       see https://cloud.google.com/speech-to-text/docs/languages')
  console.log('        <text>       : text you want to render in speech')
  console.log('        <pause>       : silence file for the inter char pause')
  console.log()    
  console.log('example:')
  console.log()
  console.log(`    ${programName} --text=CQH-7865 --language=it`)
  console.log('    -> audio/it/CQH-7865.mp3')
  console.log()
  process.exit(1)
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
  const text = args.text 
  let pause = args.pause 
  const interCharPauseFileDefault = 'audio/PAUSE.mp3'

  if ( !language ) 
    helpAndExit(programName)

  if ( !text ) 
    helpAndExit(programName)
  
  if ( !pause ) {
    console.log(`pause file not supplied. I'll Use: ${interCharPauseFileDefault}`)
    pause = interCharPauseFileDefault
  }

  return { language, text, pause }
}


/**
 * unit test
 */
async function main() {
  
  //const language = 'en'
  //const text = 'CSQU3054383'
  //const text = 'RAIU 690011 4 25 U1'
  //const text = 'JL1349-76 [45A/MU4]'
  //const interCharPauseFile = 'audio/PAUSE.mp3'
  
  const { args } = getArgs()
  const { language, text, pause } = checkArgs(args, 'node lib/charByChar')
  
  const filename = sanitizeFilename(text) 
  const fullPathFileName = `audio/${language}/${filename}.mp3` 

  loadConfig(language) 

  charByChar( text, language, fullPathFileName, pause ) 
    .then( result => {

      if (result.exit == 0) {
        console.info()
        console.info( `text     : ${text}` )
        console.info( `pause    : ${pause}` )
        console.info( `language : ${language}` )
        console.info( `filename : ${fullPathFileName}` )
        console.info( result )
      }  
      else
        console.error( `ERROR charByChar.concatAudiofiles: ${JSON.stringify(result, null, 2)}` )
    
    })
    .catch( error => console.error(error) )
  
}  

if (require.main === module) 
  main()

module.exports = { 
  charByChar, 
  spelling: charByChar 
}

