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
function sanitizeFileName(text, allowedCharacters=ALLOWED_CHARACTERS) {  

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
 * @return {String}
 *
 * @see 
 * https://serverfault.com/questions/348482/how-to-remove-invalid-characters-from-filenames
 * https://stackoverflow.com/questions/1976007/what-characters-are-forbidden-in-windows-and-linux-directory-names/1976131#:~:text=Under%20Linux%20and%20other%20Unix,path%20name%2C%20separating%20directory%20components.
 * https://unix.stackexchange.com/questions/230291/what-characters-are-valid-to-use-in-filenames
 * https://stackoverflow.com/a/8485137/1786393
 * https://stackoverflow.com/questions/42068/how-do-i-handle-newlines-in-json
 */
function sanitizeFileName2(text) {  
  return text
    .toLowerCase() // lowercase all
    .replace(/[.]/gi, '_dot_') /// TODO TBV
    .replace(/[/]/gi, '_slash_')
    .replace(/[ ]/gi, '_')
}  



function main() {

  console.log()
  console.log('perché non ce l\'hai detto, però?')
  console.log(sanitizeFileName('perché non ce l\'hai detto, però?'))
  console.log()
  console.log('http://convcomp.it')
  console.log(sanitizeFileName('http://convcomp.it'))
  console.log()

}


if (require.main === module) 
  main()


// exports public function 
module.exports = { 
  sanitizeFileName,
  sanitizeFileName2
}

