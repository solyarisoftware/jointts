const { concatAudiofiles } = require('./concatAudioFiles')
const { loadConfig, audioFilePath } = require('./characters.js')
const { sleep } = require('./sleep')

/**
 * charByChar 
 *
 * the text is spelled, pronouncing each char in sequence.
 * The returned object is an audio file.
 *
 * @param {String} text       sentence to be spoken
 * @param {string} language   language_code ('en-us', 'it', )
 *
 * @return {String} filename  name of audio file
 *
 */
function charByChar( text, language, filename ) {

  // create the list of input filenames (one for each char).
  const inputFilenames = text
    .toLowerCase()
    .split('')
    .map( char => audioFilePath(char, language) )

  return concatAudiofiles( inputFilenames , filename )
}  


/**
 * unit test
 */
async function main() {
  
  const text = 'CSQU3054383'
  const language = 'it'

  loadConfig('it') 

  const filename = `audio/${language}/${text}.mp3` 

  charByChar( text, language, filename ) 
    .then( result => {

      if (result.exit == 0)
        console.info( result )
      else
        console.error( `ERROR charByChar.concatAudiofiles: ${result}` )
    
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


