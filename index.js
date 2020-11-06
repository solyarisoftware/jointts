/**
 * setup 
 *
 * @param {string}  language  language code ('en-us', 'it', )
 * @param {String}  codec     audio coding format (wav/ogg/etc.)
 * @return {String} spelling  character-by-character spelling mode (''/'nato'/etc.)
 *
 * @example
 * const {setup} = require('jointts')
 * setup('it', 'ogg', 'nato')
 *
 */
function setup( language, codec, spelling ) {
}  

/**
 * ttsfile 
 *
 * The returned object is an audio file, lossless (e.g. `wav`) 
 * or in a compressed lossy compression format 
 *
 * @param {String} text       sentence to be spoken
 * @param {string} language   language_code ('en-us', 'it', )
 * @param {String} codec      audio coding format (wav/ogg/etc.)
 *
 * @return {String} filename  name of audio file
 *
 * @example
 * const {ttsfile} = require('jointts')
 * const fileName = ttsfile('Container JL1349-76 has been cleared for pick-up.', 'en', 'ogg')
 */
function ttsFile( text, language, codec, filename ) {
}  


/**
 * ttsbuf 
 * WARNING
 * TODO
 *
 * The returned object is a memory buffer in the above specified format.
 *
 * @param {String} text       sentence to be spoken
 * @param {string} language   language_code ('en-us', 'it', )
 * @param {String} codec      audio coding format (wav/ogg/etc.)
 *
 * @return {Buffer}  
 *
 * @example
 * const {ttsbuf} = require('jointts')
 * const buffer = ttsbuf('Il container JL1349-76 è pronto per il ritiro.', 'it', 'ogg')
 */
function ttsBuffer( text, language, codec ) {
}  


module.exports = {
  setup,
  ttsFile,
  ttsBuffer
  
}  
