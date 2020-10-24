/*
 * @module convert text to audio Webm ogg  file 
 * @author giorgio.robino@gmail.com 
 */
const path = require('path')

const Elapsed = require('./elapsed')
const ffmpeg = require('./ffmpeg')
const { googleTranslateTTS } = require('./googleTranslateTTS')
const { serialize } = require('./serialize')
const { sentenceTokenizer } = require('./sentenceTokenizer')
const filename = require('./filename')

const OUTPUT_TTS_DIRECTORY = `${path.resolve('.')}/audio`

const MAX_LEN_SENTENCE = 200

// https://cloud.google.com/speech-to-text/docs/languages
const LANGUAGE_ITALIAN = 'it-IT' // language ISO code
    
//const DEBUGOUTPUTMESSAGES = false

const toWebmOpusErrorReply = 'Ho un problema tecnico nella conversione del formato audio.'
const googleTranslateTTSErrorReply = 'Non riesco a produrre la voce sintetica.'
const StringTooLongReply = googleTranslateTTSErrorReply + ' ' + 'La frase è troppo lunga.'


/**
 * convert text to speech 
 * Only 1 sentence, max 200 characters.
 *
 * @param {String} sentence
 * @param {Number} speed [1.0]
 * @param {String} caption [sentence]
 * @param {String} languageCode [it-IT] - language ISO code
 *
 * @return {Promise.<resolveObj>} 
 * @return {Promise.<rejectObj>} 
 *
 * @typedef resolveObj
 * @property {String} filename - speech file produced 
 *
 * @typedef rejectObj
 * @property {String} text - error message for user 
 *
 *
 */
function textToSpeech(sentence, filename, speed=1, caption, languageCode=LANGUAGE_ITALIAN) {
  return new Promise( (resolve, reject) => {

    let mp3FileName

    // TODO
    if (sentence.length > MAX_LEN_SENTENCE) {
      //sendText(id, StringTooLongReply)
      reject(StringTooLongReply)
      return
    }  

    // if caption argument is not passed, then is assigned to sentence
    if ( !caption )
      caption = sentence
    
    if (filename)
      mp3FileName = filename + '.mp3'
    else
      mp3FileName = `${OUTPUT_TTS_DIRECTORY}/${sanitizeFileName(sentence)}.mp3`

    const elapsedTime = new Elapsed()


    // debug
    //console.log( 'textToSpeechTokenizeSentences:', sentence, speed, caption)

    googleTranslateTTS(sentence, speed, mp3FileName, languageCode)

      .then( () => { // result

        //console.info(`url            : ${result.url}`) 
        //console.log(`download to    : ${fileName}` )
        //console.info(`download time  : ${result.time}`)

        //
        // convert downloaded file to suitable audio format
        // 
        ffmpeg.toWebmOpus(mp3FileName)

          .then( (result) => {
             if (result.exit == 0) {

               //sendVoice(id, fileName, { caption: caption })
               //   .then( o => { if (DEBUGOUTPUTMESSAGES) console.log(o) } )
               //log.out(id, `[audio tts${caption!=='\t'? '] ' + caption : ' no caption] ' + sentence }`)

               const webmFileName = mp3FileName + '.webm'

               console.info(`googleTranslateTTS>ffmpeg.toWebmOpus> webm opus file : ${webmFileName}` )
               console.info(`googleTranslateTTS>ffmpeg.toWebmOpus> conversion time: ${elapsedTime.elapsed()}`)

               resolve(webmFileName)
             }  
             else {
               //sendText(id, toWebmOpusErrorReply)
               console.error(`googleTranslateTTS>ffmpeg.toWebmOpus> ffmpeg error. Exit code: ${result.exit}`)
               reject(toWebmOpusErrorReply)
             }  
           })

         .catch( (data) => { // data
           //sendText(id, toWebmOpusErrorReply) 
           console.error(`googleTranslateTTS>ffmpeg.toWebmOpus> ffmpeg error: ${data}`)
           reject(toWebmOpusErrorReply)
         })

      })

      .catch( err => {
           //sendText(id, googleTranslateTTSErrorReply) 
           console.error(`googleTranslateTTS: ${err.stack}`) 
           reject(googleTranslateTTSErrorReply)
      })
  })
}


/**
 * convert speech to text  of any text.
 * Multisentence are splitted in a list of sentences.
 * Each sentence can't exceed 200 chars.
 *
 * @param {String} multiSentence
 * @param {Number} speed [1.0] 
 * @param {String} caption [sentence] 
 * @param {String} languageCode [it-IT] - language ISO code
 *
 * @return {Promise.<resolveObj>} 
 * @return {Promise.<rejectObj>} 
 *
 * @typedef resolveObj
 * @property {String} filename - speech file produced 
 *
 * @typedef rejectObj
 * @property {String} text - error message for user 
 *
 * @see GoogleTTS languageCode list https://cloud.google.com/speech-to-text/docs/languages
 * @see https://hackernoon.com/functional-javascript-resolving-promises-sequentially-7aac18c4431e
 */
function textToSpeechTokenizeSentences(multiSentence, speed=1, caption, languageCode=LANGUAGE_ITALIAN) {

  // if caption argument is not passed, then is assigned to sentence
  if ( !caption )
    caption = multiSentence

  // Split multi sentence text in an array of sentences.
  const arrayOfSentences = sentenceTokenizer(multiSentence, MAX_LEN_SENTENCE)

  if (arrayOfSentences.length > 1) {
    // create a list of premises, to be executed sequentially.
    // WARNING: each sentence must be less than 200 chars. TODO
    const funcs = arrayOfSentences.map(sentence => () => textToSpeech(sentence, speed, sentence, languageCode) ) 
    //{
    //const localCaption = (arrayOfSentences.length > 1) ? undefined : caption
    //textToSpeech(id, sentence, speed, localCaption) 
    //}

    // run sequentially funcs
    return serialize(funcs) //.then(console.log.bind(console))
    //return textToSpeech(id, multiSentence, speed, caption)
    }
  else {
    const sentence = arrayOfSentences[0]
    textToSpeech(sentence, speed, caption, languageCode)  
    }
}


/*
 * sanitizeFileName
 *
 * @param {String}
 * @returns {String}
 *
 * @see https://stackoverflow.com/a/8485137/1786393
 * @see https://stackoverflow.com/questions/42068/how-do-i-handle-newlines-in-json
 */
function sanitizeFileName(string) {  
  return string
    //.toLowerCase() // lowercase all
    .replace(/[^a-z0-9àèéìòù]/gi, '_') // sanitize
    .replace(/_{2,}/g, '_') // remove duplicate underscores
}  


/*
 * isNumber
 *
 * @param {Number}
 * @returns {Boolean}
 *
 */
function isNumber(num) {
  return !isNaN(parseFloat(num)) && isFinite(num)
}


/**
 * command line parsing
 *
 * @returns {SpeedAndSentence}
 * @typedef {Object} SpeedAndSentence
 * @property {Number} speed 
 * @property {Number} sentence 
 *
 */
function commandLineParsing() {

  const nodeProgramName = path.parse(process.argv[1]).name
  const argvLength = process.argv.length
  const lastargvIndex = argvLength-1
  const lastArgv = +process.argv[lastargvIndex] 

  if ( argvLength < 3 ) {
    console.log()
    console.log(`usage  : node ${nodeProgramName} <sentence to elaborate> [speed]`)
    console.log('         speed: 1 = normal  normal (default), 0.24 = slow, 0 = very slow')
    console.log(`example: node ${nodeProgramName} siamo orgogliamente genovesi! Non è così?`)
    console.log()
    process.exit(1)
  }

  let speed   
  let sentence

  if ( isNumber(lastArgv) ) {
    speed = lastArgv
    sentence = process.argv.slice(2, lastargvIndex).join(' ')
  } 
  else {
    speed = 1 // default value, for normal speed 
    sentence = process.argv.slice(2).join(' ')
  }  

  if (sentence.length > MAX_LEN_SENTENCE) {
    console.log(`sentence length must be max ${MAX_LEN_SENTENCE} characters`)
    process.exit(1)
  }

  return { sentence, speed }
}


/**
 * unit test main 
 */
async function main() {

  const { sentence, speed } = commandLineParsing()

  //const fileName = `${OUTPUT_TTS_DIRECTORY}/${sanitizeFileName(sentence)}.mp3`
  //const fileName = path.resolve(__dirname,`${sanitizeFileName(sentence)}.mp3`) 

  //
  // call translate TTS API
  //

  const ttsFilename = filename.create(OUTPUT_TTS_DIRECTORY + '/', 'userid')

  try {

    //textToSpeechTokenizeSentences(id, sentence, speed) 
    const filename = await textToSpeech(sentence, ttsFilename) 

    console.log()
    console.log('language       : ' + LANGUAGE_ITALIAN) 
    console.log(`speed          : ${(speed == 0) ? 'very slow' : ((speed <= 0.3) ? 'slow' : 'normal')}`)
    console.log(`sentence       : ${sentence}`)
    console.log('filename       : ' + filename) 
  }

  catch(err) {  
    console.error(err)  
  }  
}  


if (require.main === module) 
  main()

module.exports = { 
  textToSpeechTokenizeSentences, 
  textToSpeech 
}

