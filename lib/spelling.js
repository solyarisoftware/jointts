const { concatAudiofiles } = require('./concatAudioFiles')
const { loadConfig, audioFilePath } = require('./characters.js')
const { sleep } = require('./sleep')
const { insertItemArray } = require('./insertItemArray')

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
  console.log('        <pause>      : each spelled character is follwed by a pause')
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
 * @param {String} text       sentence to be spoken
 * @param {string} language   language_code ('en-us', 'it', )
 * @param {String} filename   name of audio file
 * @param {Number} pauseChar  blank to be inserted between chars
 * @return {String} filename  name of audio file
 *
 */
function spelling( text, language, filename, pauseChar ) {

  // 
  // create the list of input filenames (one for each char).
  //
  const textAsArray = text.toLowerCase().split('')

  const inputFilenames = insertItemArray( textAsArray, pauseChar ) 
    // assign a filename for each item of the array
    .map( char => audioFilePath(char, language) )

  return concatAudiofiles( inputFilenames , filename )
}  


/**
 * unit test
 */
async function main() {
  
  const PAUSE_CHAR = ' '
  const text = 'CSQU3054383'
  const language = 'it'

  loadConfig('it') 

  const filename = `audio/${language}/${text}.mp3` 


  spelling( text, language, filename, PAUSE_CHAR ) 
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
  spelling, 
  charByChar: spelling 
}


