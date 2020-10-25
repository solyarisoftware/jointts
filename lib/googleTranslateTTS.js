const fs = require('fs')
const path = require('path')
const https = require('https')
const googleTTS = require('google-tts-api')

const Elapsed = require('./elapsed')
const { sanitizeFilename } = require('./sanitizeFilename')
const { getArgs } = require('./getArgs')

/**
 * Google language codes:
 * @see https://cloud.google.com/speech-to-text/docs/languages
 */
const OUTPUT_TTS_DIRECTORY = `${path.resolve('.')}/audio`
const ITALIAN_LANGUAGE_CODE = 'it-IT'
const NORMAL_SPEED = 1

/**
 * @desc true if argument is a number
 *
 * @param {Number}
 * @returns {Boolean}
 *
 */
function isNumber(num) {
  return !isNaN(parseFloat(num)) && isFinite(num)
}



/**
 * googleTranslateTTS
 * download Google Translate TTS MP3 file
 * @public
 *
 * Google TTS (Text-To-Speech) for node.js
 * @see https://github.com/zlargon/google-tts
 * @see https://cloud.google.com/speech-to-text/docs/languages
 *
 * @param {String} sentence
 * @param {String} fileName
 * @param {Number} speed
 *
 * @returns {Promise.<err>} 
 * @returns {Promise.<resolveObj>} 
 * @typedef resolveObj
 * @property {String} url - url returned by googleTTS
 * @property {String} time - execution elapsed time 
 */
function googleTranslateTTS(sentence, fileName, languageCode=ITALIAN_LANGUAGE_CODE, speed=NORMAL_SPEED) {
  return new Promise( (resolve, reject) => {

    googleTTS(sentence, languageCode, speed)   
      .then( url => {
        const elapsedTime = new Elapsed()

        // download the MP3 audio file from specified url
        https.get( url, response => { 
          response
            .pipe(fs.createWriteStream(fileName))
            .on('finish', () => 
              resolve( { url, time: elapsedTime.elapsed() } )) 
        })
      })
      .catch( err => reject(err) ) 

  })
}


/**
 * command line parsing
 *
 * @returns {SpeedAndSentence}
 * @typedef {Object} SpeedAndSentence
 * @property {number} speed 
 * @property {number} sentence 
 * 
 */
function commandLineParsing() {

  // get command line args and commands
  const { args, commands } = getArgs()

  if ( !args.language && !commands.length ) {
    console.log()
    console.log('usage:')
    console.log()
    console.log('    node googleTranslateTTS <sentence to elaborate> --lang=<languagecode> [--speed=<speed>]')
    console.log()    
    console.log('    where:')
    console.log('    <language>: it/en/etc.')
    console.log('    <speed>: 1 = normal (default), 0.24 = slow, 0 = very slow')
    console.log()    
    console.log('examples:')
    console.log()
    console.log('    node lib/googleTranslateTTS mi chiamo Giorgio --language=it')
    console.log('    node googleTranslateTTS mi chiamo Giorgio Robino e sono nato a Genova, in Italia. --language=it-IT --speed=0.2')
    console.log('    node googleTranslateTTS "my name is Giorgio Robino and I\'m born in Genoa, Italy." --language=en ')
    console.log()
    process.exit(1)
  }

  const sentence = commands.join(' ')

  if (sentence.length > 200) {
    console.error('sentence length must be max 200 characters')
    process.exit(1)
  }

  const language = args.language 
  const speed = isNumber(args.speed) ? +args.speed : 1

  return { sentence, language, speed }
}


/**
 * unit test main 
 */
function test() {

  const { sentence, language, speed } = commandLineParsing()

  //const fileName = path.resolve(__dirname,`${sanitizeFileName(sentence)}.mp3`) 
  const fileName = `${OUTPUT_TTS_DIRECTORY}/${sanitizeFilename(sentence)}.mp3`

  //
  // call translate TTS API
  //
  console.log()
  console.log(`sentence       : ${sentence}`)
  console.log(`language       : ${language}`)
  console.log(`speed          : ${(speed === 0) ? 'very slow' : ((speed <= 0.3) ? 'slow' : 'normal')}`)

  googleTranslateTTS(sentence, fileName, language, speed)
    .then( result => {
      console.info(`url            : ${result.url}`) 
      console.log(`file name      : ${fileName}` )
      console.info(`elapsed time   : ${result.time}`)
    })
    .catch( err => {
        console.error(err.stack) 
    })
}  


if (require.main === module) 
  test()

// exports public function 
module.exports = { googleTranslateTTS }

