//const path = require('path')
const { sanitizeFilename } = require('./sanitizeFilename')

//const AUDIO_FILES_DIRECTORY = `${path.resolve('.')}/audio`
const AUDIO_FILES_DIRECTORY = `${__dirname}/audio`
const AUDIO_FILES_FORMAT = 'mp3' 
const AUDIO_FILES_LANGUAGE = 'en' 

const DEFAULT_CONFIG = { 
  directory: AUDIO_FILES_DIRECTORY, 
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

  // TODO
  // validate attributes
  return `${config.directory}/${config.language}/${sanitizeFilename(text)}.${config.suffix}`
  
}  


/**
 * unit test main
 */
function test() {

  const texts = [ 
    ' ',
    'mi chiamo',
    'giorgio robino'
  ]

 console.log( texts ) 
 console.log( texts.map(text => audioFilename(text, {language: 'it'})) ) 
}


if (require.main === module)
  test()

// exports public function
module.exports = { audioFilename}

