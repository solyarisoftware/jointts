const { spawnAsync } = require('./spawn')
const { sleep } = require('./sleep')
const { fileExtension, fileNameConcat } = require('./fileHelpers')

const DEBUG = true

/*
 * - File-level concatenation
 * 
 *   The quick&dirty approach is to use `ffmpeg` or `sox`, 
 *   as a background process that create dynamic concatenations.
 *  
 *   - audio files concatenation using `ffmpeg`:
 *     - https://trac.ffmpeg.org/wiki/Concatenate
 *     - https://superuser.com/questions/587511/concatenate-multiple-wav-files-using-single-command-without-extra-file/1307384#1307384
 * 
 *   - audio files concatenation using `sox`:
 *     - https://superuser.com/questions/571463/how-do-i-append-a-bunch-of-wav-files-while-retaining-not-zero-padded-numeric
 *     - https://superuser.com/questions/64164/linux-command-to-concatenate-audio-files-and-output-them-to-ogg
 *     - https://stackoverflow.com/questions/10721089/combine-two-audio-files-with-a-command-line-tool
 *     - https://askubuntu.com/questions/20507/concatenating-several-mp3-files-into-one-mp3
 *     - http://sox.sourceforge.net/Docs/Documentation
 *     - http://sox.sourceforge.net/sox.html#EFFECTS
 * 
 * - In-memory concatenation of audio buffers: 
 * 
 *   that's the correct / fastest solution: working in-memory.
 *   It require having audio chunks as `PCM`, see:
 *     - https://github.com/benmangold/audio-concatenation
 *     - https://github.com/streamich/memfs
 */ 


/**
 * concatAudiofiles
 *
 * basic files concatenation, using ffmpeg "concat", 
 * applicable with audio files having the same codec. 
 * 
 * The concat protocol works at the file level. 
 * Certain files (MPEG-2 transport streams, possibly others) can be concatenated. 
 * This is analogous to using cat on UNIX-like systems.
 *
 * All MPEG codecs (MPEG-4 Part 10 / AVC, MPEG-4 Part 2, MPEG-2 Video, 
 * MPEG-1 Audio Layer II, MPEG-2 Audio Layer III (MP3), MPEG-4 Part III (AAC)) 
 * are supported in the MPEG-TS container format.
 *
 * @see https://trac.ffmpeg.org/wiki/Concatenate
 * @example 
 * ffmpeg -loglevel panic \
 * -i "concat:audio/mi_chiamo_.mp3|audio/giorgio_robino_.mp3" \
 * -c copy audio/concatenationresult.mp3 -y
 *
 * @param {string[]}                  inputFilenames array of filenames
 * @param {string}                    outputFilename
 * @returns {Promise<SpawnedProcess>} status of ffmpeg spawned process
 *
 */
function concatAudiofiles ( inputFilenames, outputFilename=fileNameConcat(inputFilenames) ) {

  if (DEBUG) {
    console.log()
    console.log( `input files: ${inputFilenames.join(', ')}` )
    console.log( 'output file: ' + outputFilename )
  }  

  // TODO
  // VALIDATION of inputFilenames: need a check verifying if filenames have the same codecs (at least the same suffix)

  const firstFile = inputFilenames[0]
  const suffix = fileExtension(firstFile)

  // verify if all file externsions are equal
  if( ! inputFilenames.every( filename => fileExtension(filename) === suffix ) )
    return Promise.reject(`ERROR on concatAudiofiles: inputFilenames (${inputFilenames.join(', ')}) have NOT the same suffix.`)

  // WARNING 
  // ffmpeg error handling weird behaviour: 
  // ffmpeg do not riase any error if 
  // - one or more files to be concatenated are not in the same codec
  // - or if the files exists!

  const args = [
    '-loglevel', 'panic', 
    '-i', `concat:${inputFilenames.join('|')}`, 
    '-c', 'copy',
    outputFilename, 
    '-y'
  ]
  
  return spawnAsync('ffmpeg', args)
}  


/**
 * unit test main 
 */
async function test() {

  //
  // to generate input files:
  // node lib/googleTranslateTTS.js "mi chiamo " --language=it
  // node lib/googleTranslateTTS.js "Giorgio Robino " --language=it
  //
  const inputs = [ 
    'audio/it/mi_chiamo_.mp3',
    'audio/it/giorgio_robino_.mp3'
  ]


  concatAudiofiles( inputs /*, 'audio/it/concatexample.mp3'*/ )
    .then( result => {

      if (result.exit == 0)
        console.info( result )
      else
        console.error( `ERROR (concatAudiofiles): ${result}` )
    
    })
    .catch( error => console.error(error) )
  
  await sleep(1000)

}


if (require.main === module) 
  test()

// exports public function 
module.exports = { concatAudiofiles }

