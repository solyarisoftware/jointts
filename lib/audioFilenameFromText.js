//const path = require('path')
const { sanitizeFilename } = require('./sanitizeFilename')

//const AUDIO_FILES_DIRECTORY = `${path.resolve('.')}/audio`
const AUDIO_FILES_DIRECTORY = `${__dirname}/audio`
const AUDIO_FILES_FORMAT = 'mp3' 
const AUDIO_FILES_LANGUAGE = 'it' 

const DEFAULT_CONFIG = { 
  homedirectory: undefined, 
  suffix: AUDIO_FILES_FORMAT, 
  language: undefined
}

/**
 * audioFilename
 *
 * return the audio file name corresponding to a text
 *
 * @param {String} text 
 * @param {String} directory  home directory of all audio files
 * @param {String} suffix     of the file. Identify the audio format
 * @param {String} language   ISO code
 *
 */ 
function audioFilename( text, configVariant ) {

  const config = { 
    ...DEFAULT_CONFIG, 
    ...configVariant 
  }

  // 
  // TODO 
  // validate attributes
  // 
  // validate chars in text. 
  // Considering linux filesystems rules, any char is valid except NULL and SLASH. 
  // See: https://unix.stackexchange.com/questions/230291/what-characters-are-valid-to-use-in-filenames
  //
  //const sanitizedText = text
  //  .replaceAll('\0', 'NULL')
  //  .replaceAll('/', 'SLASH')

  // build filename fullpath
  const homedirectory = config.homedirectory ? config.homedirectory + '/' : ''
  const language = config.language ? config.language + '/' : ''
  const name = `${sanitizeFilename(text)}.${config.suffix}`

  return `${homedirectory}${language}${name}`
  
}  


/**
 * unit test main
 */
function test() {

  const texts = [ 
    ' ',
    '\0',
    '/a',
    'á con accento acuto',
    'à con accento grave',
    '89/56 [ABC43@RT]',
    'giorgio robino'
  ]


 console.log( 'texts:' ) 
 console.log( texts ) 
 console.log() 

 console.log( 'audio files names options:' ) 
 
  console.log( texts.map(text => audioFilename(text)) )
 
  console.log( texts.map(text => audioFilename(text, {homedirectory: '', language: 'it'})) ) 
 
  console.log( texts.map(text => audioFilename(text, {
   homedirectory: AUDIO_FILES_DIRECTORY, 
   language: AUDIO_FILES_LANGUAGE, 
   suffix: AUDIO_FILES_FORMAT 
 })) )

 console.log() 
}


if (require.main === module)
  test()

// exports public function
module.exports = { audioFilename }

