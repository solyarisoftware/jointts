// italian character set
const { CHARACTER_SIMPLIFIED } = require('./characterSetIt')
const { audioFilename } = require('./audioFilenameFromText')

const AUDIO_FILES_FORMAT = 'mp3' 

/**
 * buildConfigJson
 * build configuration JSON file
 *
 * @param {String} homedirectory
 * @param {language} language two letters ISO code
 * @param {Object} characterSet 
 * @param {String} file suffix
 *
 */ 
function buildConfigJson(homedirectory, language, characterSet, suffix) {

  const characters = {}

  for (const item in characterSet) {

    const text = characterSet[item]
   
    characters[item] = { 
      text,
      file: audioFilename( text, { suffix } )
      //file: audioFilename(text, { homedirectory: 'audio', language: 'it'} )
    }

  }    

  const config = {
    
    homedirectory,
    language,
    characters, 
    words: {},
    phrases:  {}

  }

  // $ node lib/buildConfigJson > audio/config/it/config.json
  console.log( JSON.stringify(config, null, 4) )

}  


if (require.main === module)
  buildConfigJson('audio', 'it', CHARACTER_SIMPLIFIED, AUDIO_FILES_FORMAT )


module.exports = {
  buildConfigJson
}


