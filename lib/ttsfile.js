const { concatAudiofiles } = require('./concatAudioFiles')
const { sanitizeFilename, fullFilename } = require('./sanitizeFilename')
const fs = require('fs')

 
/**
 *
 * ttsFile 
 *
 * The returned object is an audio file, lossless (e.g. `wav`) 
 * or in a compressed lossy compression format (e.g. 'ogg')
 *
 * @param [{String}] text            sentence to be spoken, splitted in an array of tokens
 * @param {string}   path            home directory path, where input files are located
 * @param {string}   language        language_code ('en-us', 'it', )
 * @param {String}   suffix          file suffix / audio coding format ('mp3','wav'/'ogg'/etc.)
 * @return {String}  outputfilename  name of audio file
 */

async function ttsFile(texts, path, language, suffix, outputFilename) {

  // outputFilename=fileNameConcat(inputFilenames)

  // build the list of fullpath input filenames
  const inputFilenames = [] 
  const outputFilenameAsConcat = [] 
  
  for (const text of texts) {

    const filename = fullFilename(text, {path, language, suffix})

    // validate file existence, async
    fs.access(filename, (err) => {
      if (err) 
        throw new Error(`${err}: file ${filename} does not exist.`)
    })

    // create the list of input full filenames
    inputFilenames.push( filename )
    
    // prepare the list of input filenames string, to be attached
    outputFilenameAsConcat.push( sanitizeFilename(text) )
  
  }  

  // if outputfilename has not specificed as parameter, 
  // it's build concatenating input filenames
  if ( ! outputFilename ) 
    outputFilename = fullFilename( outputFilenameAsConcat.join(''), {path, language, suffix} )

  //console.log(inputFilenames)
  //console.log(outputFilename)

  // concatenate all files 
  try {
    const result = await concatAudiofiles( inputFilenames, outputFilename )
    
    if (result.exit === 0) {
      //console.info( result )
      return result
    }  
    else
      console.error( `ERROR (concatAudiofiles): ${result}` )
  }  
  catch(error) {
    console.error(error) 
  }  
}  


/**
 * unit test main 
 */
async function main() {

  //
  // to generate input files:
  // node lib/googleTranslateTTS.js "mi chiamo " --language=it
  // node lib/googleTranslateTTS.js "Giorgio Robino " --language=it
  //
  const texts = [ 
    'mi chiamo ',
    'Giorgio Robino '
  ]

  try {
    const result = await ttsFile(texts, 'audio', 'it', 'mp3') 
    console.info( result )
  }  
  catch(error) {
    console.error(error) 
  }  

}  


if (require.main === module) 
  main()


module.exports = { 
  ttsFile
}

