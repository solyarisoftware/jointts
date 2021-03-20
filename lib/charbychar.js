const { concatAudiofiles } = require('./concatAudioFiles')
const { loadConfig, audioFilePath } = require('./characters.js')
const { sleep } = require('./sleep')

function helpAndExit(programName) {
  console.log('usage:')
  console.log()
  console.log(`    ${programName} <text> \\ `)
  console.log('         --language=<languagecode> \\ ')
  console.log('         --path=<directory>')
  console.log('         [--pause] ')
  console.log()    
  console.log('    where:')
  console.log('        <language>   : language ISO code (it/en/etc.)')
  console.log('                       see https://cloud.google.com/speech-to-text/docs/languages')
  console.log('        <pause>      : each spelled character is followed by a pause')
  console.log('        <directory>  : directory path of generated file')
  console.log()    
  console.log('example:')
  console.log()
  console.log(`    ${programName} CQH-7865 --language=it --path=/home/myproject/audio/it/`)
  console.log('    -> /home/myproject/audio/it/CQH-7865.mp3')
  console.log()
  process.exit(1)
}  

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


/**
 * unit test
 */
async function main() {
  
  const language = 'it'
  const interCharPauseFile = 'audio/PAUSE.mp3'
  //const text = 'CSQU3054383'
  //const text = 'RAIU 690011 4 25 U1'
  const text = 'JL1349-76 [45A/MU4]'
  const filename = `audio/${language}/${'example'}.mp3` 
  
  loadConfig(language) 

  charByChar( text, language, filename, interCharPauseFile ) 
    .then( result => {

      if (result.exit == 0)
        console.info( result )
      else
        console.error( `ERROR charByChar.concatAudiofiles: ${JSON.stringify(result, null, 2)}` )
    
    })
    .catch( error => console.error(error) )
  
  await sleep(2000)
}  

if (require.main === module) 
  main()

module.exports = { 
  charByChar, 
  spelling: charByChar 
}

