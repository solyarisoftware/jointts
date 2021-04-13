const ALLOWED_CHARACTERS = 'a-z0-9àèéìòù'

/**
 * sanitizeFileName
 * transaltate a sentence in a valid filename 
 * old version restrictive (allow just a set of chars)
 *
 * @param {String}
 * @return {String}
 *
 * @see https://stackoverflow.com/a/8485137/1786393
 * @see https://stackoverflow.com/questions/42068/how-do-i-handle-newlines-in-json
 */
function sanitizeFilenameOLD(text, allowedCharacters=ALLOWED_CHARACTERS) {  

  const sanitizeRegex = new RegExp(`[^${allowedCharacters}]`, 'gi') 

  return text
    .toLowerCase() // lowercase all
    .replace(sanitizeRegex, '_') // sanitize
    .replace(/_{2,}/g, '_') // remove duplicate underscores
}  


/**
 * sanitizeFileName
 * transaltate a sentence in a valid filename 
 *
 * @param {String}   text
 * @param {Object}   options
 * @return {String}
 *
 * @see 
 * https://serverfault.com/questions/348482/how-to-remove-invalid-characters-from-filenames
 * https://stackoverflow.com/questions/1976007/what-characters-are-forbidden-in-windows-and-linux-directory-names/1976131#:~:text=Under%20Linux%20and%20other%20Unix,path%20name%2C%20separating%20directory%20components.
 * https://unix.stackexchange.com/questions/230291/what-characters-are-valid-to-use-in-filenames
 * https://stackoverflow.com/a/8485137/1786393
 * https://stackoverflow.com/questions/42068/how-do-i-handle-newlines-in-json
 */
function sanitizeFilename(text, options={toLowerCase: false, noBlanks: true, noDots:false}) {  
    
  // validate chars in text: 

  // https://flaviocopes.com/un\x00/
  // The first 32 characters, U+0000-U+001F (0-31) are called Control Codes.
  if ( /[\u0000-\u001F]/.test(text) ) {
    console.error(`ERROR: text contains invalid characters: [${text}]`)
  }  

  // Considering linux filesystems rules, any char is valid except NULL and SLASH. 
  // See: https://unix.stackexchange.com/questions/230291/what-characters-are-valid-to-use-in-filenames

  if ( options.toLowerCase ) 
    text = text.toLowerCase()

  if ( options.noBlanks )
    text = text.replace(/[ ]/gi, '_')

  if ( options.noDots )
    text = text.replace(/[.]/gi, '_dot_') 

  return text
    .replace(/[/]/gi, '_slash_')
    .replace(/[\u0000-\u001F]/gi, '_')
}  


/**
 * fullFileName
 * transaltate a sentence in a valid full filename (path, suffi. etc.) 
 *
 * @param {String}   text
 * @param {Object}   options
 * @param {Object}   sanitizeOptions
 *
 * @return {String}
 *
 */
function fullFilename( text, options={path: 'audio', language: 'it', suffix: 'mp3'}, sanitizeOptions  ) {

  // TODO
  // validate attributes loss
  return `${options.path}/${options.language}/${sanitizeFilename(text, sanitizeOptions)}.${options.suffix}`

}  


function main() {

  let sentence
 
  sentence = 'perché\0 non ce l\'hai detto, però?'
  console.log()
  console.log(sentence)
  console.log(sanitizeFilename(sentence))

  sentence = 'http://convcomp.it'
  console.log()
  console.log(sentence)
  console.log(sanitizeFilename(sentence, {noDots: true}))

  sentence = 'Ha detto: "Non è vero". E tu digli che é un\'idiota!"'
  console.log()
  console.log(sentence)
  console.log(sanitizeFilename(sentence))

  sentence = 'á con accento acuto'
  console.log()
  console.log(sentence)
  console.log(sanitizeFilename(sentence))

  sentence = 'à con accento grave'
  console.log()
  console.log(sentence)
  console.log(sanitizeFilename(sentence))

  sentence = '.'
  console.log()
  console.log(sentence)
  console.log(sanitizeFilename(sentence))

  sentence = 'RAIU 690011 4 25 U1'
  console.log()
  console.log(sentence)
  console.log(sanitizeFilename(sentence))
  console.log(fullFilename(sentence))

  sentence = 'JL1349-76 [45A/MU4]'
  console.log()
  console.log(sentence)
  console.log(sanitizeFilename(sentence))
  console.log(fullFilename(sentence))

  console.log()

}


if (require.main === module) 
  main()


// exports public function 
module.exports = { 
  sanitizeFilenameOLD,
  sanitizeFilename,
  fullFilename
}

