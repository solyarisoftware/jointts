const fs = require('fs')
const path = require('path')
const https = require('https')
const googleTTS = require('google-tts-api')

const Elapsed = require('./elapsed')
const { sanitizeFilename } = require('./sanitizeFilename')
const { getArgs } = require('./getArgs')
const { validIsoCode } = require('./googleTranslateLanguages')


const AUDIO_FILES_HOME = `${path.resolve('.')}/audio`

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
 * @param {String} filename
 * @param {String} lang
 * @param {Boolean} slow
 *
 * @returns {Promise.<err>} 
 * @returns {Promise.<resolveObj>} 
 * @typedef resolveObj
 * @property {String} url - url returned by googleTTS
 * @property {String} time - execution elapsed time 
 */
function googleTranslateTTS(sentence, filename, lang, slow=false) {
  return new Promise( (resolve, reject) => {

    if ( ! validIsoCode(lang) )
      reject( `ERROR: on function googleTranslateTTS. Invalid language code: ${lang}` )

    const elapsedTime = new Elapsed()
    const url = googleTTS.getAudioUrl( sentence, { lang, slow } )

    // download the MP3 audio file from specified url
    https.get( url, response => { 
      response
        .pipe(fs.createWriteStream(filename))
        .on('finish', () => 
          resolve( { url, time: elapsedTime.elapsed() } )) 
    })

  })
}


function helpAndExit(programName) {
  console.log('usage:')
  console.log()
  console.log(`    ${programName} <sentence to elaborate> \\ `)
  console.log('         --language=<languagecode> \\ ')
  console.log('        [--directory=<path/to/audio/home/directory>] \\ ')
  console.log('        [--speed=<speed>]')
  console.log()    
  console.log('    where:')
  console.log('        <language> : language ISO code (it/en/etc.)')
  console.log('                     see https://cloud.google.com/speech-to-text/docs/languages')
  console.log('        <directory>: path to audio files home directory. Default: your/path/audio')
  console.log('        <speed>    : 1 = normal (default), 0 = slow')
  console.log()    
  console.log('examples:')
  console.log()
  console.log(`    ${programName} mi chiamo Giorgio --language=it`)
  console.log(`    ${programName} mi chiamo Giorgio Robino e sono nato a Genova, in Italia. --language=it-IT --speed=1`)
  console.log(`    ${programName} "my name is Giorgio Robino and I'm born in Genoa, Italy." --language=en `)
  console.log(`    ${programName} "my name is Giorgio Robino" --language=en --directory=/home/giorgio/myproject/audio`)
  console.log()
  process.exit(1)
}  

/**
 * checkArgs
 * command line parsing
 *
 * @param {String}                    commands
 * @param {String}                    args
 * @param {String}                    programName
 *
 * @returns {SentenceAndAttributes}
 * @typedef {Object} SentenceAndAttributes
 * @property {String} sentence 
 * @property {String} directory 
 * @property {String} language 
 * @property {Number} speed 
 * 
 */
function checkArgs(commands, args, programName) {

  const language = args.language 
  const speed = isNumber(args.speed) ? +args.speed : 1
  let directory = args.directory

  if (!directory) 
    directory = `${process.cwd()}/audio` 

  if ( !language && !commands.length ) 
    helpAndExit(programName)
  
  // create audio home directory if not exists
  if ( !fs.existsSync(directory) ) {
    fs.mkdirSync(directory)
    console.log(`created directory: ${directory}`)
  }

  // create the sentence text from command line words
  const sentence = commands.join(' ')

  if (sentence.length > 200) {
    console.error('sentence length must be max 200 characters')
    process.exit(1)
  }

  // retrun validate values
  return { sentence, directory, language, speed }
}

/**
 * @public
 * @param {String}                    commands
 * @param {String}                    args
 * @param {String}                    programName
 * 
 */
function downloadGoogleTransalteMP3(commands, args, programName) {

  const { sentence, directory, language, speed } = checkArgs(commands, args, programName)
  let slow

  const languageDirectory = `${directory}/${language}`

  // create language directory if not exists
  if ( !fs.existsSync(languageDirectory) ) {
    fs.mkdirSync(languageDirectory)
    console.log(`created directory: ${languageDirectory}`)
  }

  const filename = `${AUDIO_FILES_HOME}/${language}/${sanitizeFilename(sentence)}.mp3`

  console.log()
  console.log(`sentence       : ${sentence}`)
  console.log(`language       : ${language}`)
  console.log(`speed          : ${speed < 1 ?  slow = true : slow = false}`)
  console.log()


  // call translate TTS API
  googleTranslateTTS(sentence, filename, language, slow)
    .then( result => {
      console.info(`url            : ${result.url}`) 
      console.log(`file name      : ${filename}` )
      console.info(`elapsed time   : ${result.time}`)
    })
    .catch( err => console.error(err) )

}  


/**
 * unit test main 
 */
function test() {

  // get command line args and commands
  const { commands, args } = getArgs()

  downloadGoogleTransalteMP3(commands, args, 'node googleTranslateTTS')

}  


if (require.main === module) 
  test()

module.exports = { 
  googleTranslateTTS,
  downloadGoogleTransalteMP3 
}

