/**
 * @module convertcodecs
 * convert an audio file to PCM audio codec, using ffmpeg
 * convert an audio file to WAV audio codec, using ffmpeg
 * convert an audio file to WEBM audio codec, using ffmpeg
 * convert an audio file to OGG audio codec, using ffmpeg
 * convert an audio file to OPUS audio codec, using ffmpeg
 *
 * @author giorgio.robino@gmail.com 
 *
 * @see
 * https://www.stefaanlippens.net/audio_conversion_cheat_sheet/
 *
 * @install sudo apt-get install libopus0 opus-tools ffmpeg
 */
const fs = require('fs')
const { spawnAsync } = require('./spawn')
const { sleep } = require('./sleep')
const { getArgs } = require('./getArgs')

/**
 * toOpus
 * Convert an input audio/video file to OPUS audio codec, using ffmpeg
 *
 * @see https://opus-codec.org/
 * @see https://en.wikipedia.org/wiki/WebM 
 * @public
 *
 * @param {String}                    inputFile filename 
 * @param {String}                    [suffix=opus] file suxxix, default: opus, also used: opus
 * @returns {Promise<SpawnedProcess>} status of ffmpeg spawned process
 */
function toOpus(inputFile, suffix='opus') {
  
  // add a suffic to the OPUS audio output filename
  const opusFile = `${inputFile}.${suffix}`
  
  /**
   * Basic conversion to OPUS format (using defaults)
   * ffmpeg -loglevel panic -i $AUDIO_FILE -c libopus $WAV_FILE -y
   *
   * Converstion to OPUS format, with some tunings for voice
   * https://stackoverflow.com/questions/38185598/how-to-convert-an-mp3-file-to-an-ogg-opus-file
   * ffmpeg -loglevel panic -i  $AUDIO_FILE -c:a libopus  -compression_level 10 -frame_duration 60 -vbr -application voip $OGG_AUDIO_FILE -y
   */
  const ARGS = [
    '-loglevel', 'panic', 
    '-i', inputFile, 

    '-c:a', 'libopus', 

    // 16 Khz
    '-ar', '16000', 

    '-compression_level', '10',
    '-frame_duration', '60', 
    '-vbr', 'on', 
    '-application', 'voip',

    opusFile, 
    '-y'
  ]
  
  return spawnAsync('ffmpeg', ARGS)
}  


/**
 * toPcm
 * Convert an input audio/video file to PCM format, using ffmpeg
 *
 * @public
 * @param {String}                    inputFile filename 
 * @returns {Promise<SpawnedProcess>} status of ffmpeg spawned process
 */
function toPcm(inputFile) {
  
  // wav audio output filename
  const pcmFile = inputFile + '.pcm'

  // ffmpeg -i wav/one.wav -acodec pcm_s16le -f s16le -ac 1 -ar 44100 pcm/one.pcm
  const args = [
    '-loglevel', 'panic', 

    '-i', inputFile, 

    '-ac', '1',

    '-acodec', 'pcm_s16le',
    
    '-f', 's16le',
    
    '-ar', '16000', 

    pcmFile, 
    '-y'
  ]
  
  return spawnAsync('ffmpeg', args)
}  

/**
 * toWav
 * Convert an nput audio/video file to wav format, using ffmpeg
 *
 * @public
 * @param {String}                    inputFile filename 
 * @param {Number}                    [mode=16] values: 8 -> ARGS_ or	16 (default) i-> ARGS_16
 * @returns {Promise<SpawnedProcess>} status of ffmpeg spawned process
 */
function toWav(inputFile, mode=16) {
  
  // wav audio output filename
  const wavFile = inputFile + '.wav'
  
  /**
   * ARGS_8: 8 bit 8KHz
   *
   * ffmpeg -loglevel panic -i $AUDIO_FILE -ac 1 -acodec pcm_u8 -ar 8000 $WAV_FILE -y
   */
  const ARGS_8 = [
    '-loglevel', 'panic', 
    '-i', inputFile, 

    // loudness normalization
    '-filter:a', 'loudnorm',

    // mono
    '-ac', '1', 

    // 8 bits
    '-acodec', 'pcm_u8', 
    
    // 8 KHz
    '-ar', '8000', 
    
    wavFile, 
    '-y'
  ]

  /**
   * ARGS_16: 16 bit 16KHz
   *
   * ffmpeg -loglevel panic -i $AUDIO_FILE -ac 1 -ar 16000 $WAV_FILE -y
   */
  const ARGS_16 = [
    '-loglevel', 'panic', 
    '-i', inputFile, 

    // loudness normalization
    //'-filter:a', 'loudnorm',
    // https://developers.google.com/actions/tools/audio-loudness#using_ffmpeg
    //'-af', 'loudnorm=I=-19:dual_mono=true:TP=-1.5:LRA=11', 
    
    // mono
    '-ac', '1',
    
    // 16 bits
    // https://stackoverflow.com/a/19073622/1786393
    '-acodec', 'pcm_s16le',

    // 16 Khz
    '-ar', '16000', 

    wavFile, 
    '-y'
  ]
  
  // default mode is ARGS_16
  const args = (mode == 8) ? ARGS_8 : ARGS_16 

  //const result = await spawnAsync('ffmpeg', args)
  return spawnAsync('ffmpeg', args)
}  

function helpAndExit(programName) {
  console.log('usage:')
  console.log()
  console.log(`    ${programName} <filename> \\ `)
  console.log('         --format=<allowedSuffix> \\ ')
  console.log()    
  console.log('    where:')
  console.log('         <AllowedSuffix> : pcm | wav | opus | ogg | webm')
  console.log()    
  console.log('example:')
  console.log()
  console.log(`    ${programName} /home/myproject/audio/mi_chiamo_Giorgio.mp3 --format=pcm`)
  console.log('    -> /home/myproject/audio/mi_chiamo_Giorgio.mp3.pcm')
  console.log()
  process.exit(1)
}  


/**
 * checkArgs
 * command line parsing
 *
 * @returns {FileAndAttributes}
 * @typedef {Object} FileAndAttributes 
 * @property {String} filename 
 * @property {String} format 
 * 
 */
function checkArgs(commands, args, programName) {

  const filename = commands[0]
  const suffix = args.format 

  if ( !suffix && !commands.length ) 
    helpAndExit(programName)
  
  if ( !fs.existsSync(filename) ) {
    console.error(`\nERROR: input filename: ${filename} doesn't exist.`)
    process.exit(1)
  }

  if (! ['pcm', 'wav', 'opus', 'ogg', 'webm'].includes(suffix) ) {
    console.error(`\nERROR on convertAudioFormat: suffix ${suffix} uncovered. Allowed: pcm, wav, opus, ogg, webm.`)
    process.exit(1)
  }

  // return validated values
  return { filename, suffix }

}


/**
 * convertAudioFormat
 * Convert an input audio/video file to using ffmpeg
 *
 * @public
 * @param {String}                    commands
 * @param {String}                    args
 * @param {String}                    programName
 * @returns {Promise<SpawnedProcess>} status of ffmpeg spawned process
 */
function convertAudioFormat(commands, args, programName) {

  const { filename, suffix } = checkArgs(commands, args, programName)

  switch (suffix) {
    case 'pcm':
      return toPcm(filename)
    case 'wav':
      return toWav(filename)
    case 'opus':
      return toOpus(filename, 'opus')
    case 'ogg':
      return toOpus(filename, 'ogg')
    case 'webm':
      return toOpus(filename, 'webm')
    default:
      console.error(`ERROR on convertAudioFormat: suffix ${suffix} invalid.`)
  }  

}  

/**
 * for unit test
 * @private
 */
async function testSequential() {

  // 
  // generate an input MP3 audio file:
  // node lib/googleTranslateTTS mi chiamo Giorgio --language=it
  //
  const MP3_AUDIO_FILE = 'audio/it/mi_chiamo_giorgio_robino.mp3'

  console.log ( `\ntoOpus (from ${MP3_AUDIO_FILE} to ${MP3_AUDIO_FILE}.opus)` )

  toOpus(MP3_AUDIO_FILE, 'opus')
    .then( result => {

      if (result.exit == 0)
        console.log( result )
      else
        console.error( `command ${result.fullcmd} failed with exit code: ${result.exit}` )
    
    })
    .catch( data => console.log( `command failed with error. See: ${data}` ))

  await sleep(2000)

  console.log ( `\ntoOpus (from ${MP3_AUDIO_FILE} to ${MP3_AUDIO_FILE}.ogg)` )
  toOpus(MP3_AUDIO_FILE, 'ogg')
    .then( result => {

      if (result.exit == 0)
        console.log( result )
      else
        console.error( `command ${result.fullcmd} failed with exit code: ${result.exit}` )
    
    })
    .catch( data => console.log( `command failed with error. See: ${data}` ))
  
  await sleep(2000)

  console.log ( `\ntoOpus (from ${MP3_AUDIO_FILE} to ${MP3_AUDIO_FILE}.webm)` )
  toOpus(MP3_AUDIO_FILE, 'webm')
    .then( result => {

      if (result.exit == 0)
        console.log( result )
      else
        console.error( `command ${result.fullcmd} failed with exit code: ${result.exit}` )
    
    })
    .catch( data => console.log( `command failed with error. See: ${data}` ))
  
  await sleep(2000)

  console.log ( `\ntoWav (from ${MP3_AUDIO_FILE} to ${MP3_AUDIO_FILE}.wav)` )

  toWav(MP3_AUDIO_FILE, 'wav')
    .then( result => {

      if (result.exit == 0)
        console.log( result )
      else
        console.error( `command ${result.fullcmd} failed with exit code: ${result.exit}` )
    
    })
    .catch( data => console.log( `command failed with error. See: ${data}` ))

  await sleep(2000)

  console.log ( `\ntoPcm (from ${MP3_AUDIO_FILE} to ${MP3_AUDIO_FILE}.pcm)` )

  toPcm(MP3_AUDIO_FILE, 'pcm')
    .then( result => {

      if (result.exit == 0)
        console.log( result )
      else
        console.error( `command ${result.fullcmd} failed with exit code: ${result.exit}` )
    
    })
    .catch( data => console.log( `command failed with error. See: ${data}` ))
}

/**
 * unit test main 
 */
function test() {

  // get command line args and commands
  const { commands, args } = getArgs()

  convertAudioFormat(commands, args, 'node convertAudioFormat')
    .then( result => {

      if (result.exit == 0)
        console.log( result )
      else
        console.error( `command ${result.fullcmd} failed with exit code: ${result.exit}` )
    
    })
    .catch( data => console.log( `command failed with error. See: ${data}` ))

}  


if (require.main === module)
  test()

module.exports = { 
  toPcm,
  toWav, 
  toOpus,
  convertAudioFormat
}

