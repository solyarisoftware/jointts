var path = require('path')

// https://stackoverflow.com/a/12900504/1786393
function fileExtension(path) {

  const basename = path.split(/[\\/]/).pop() // extract file name from full path ...
                                             // (supports `\\` and `/` separators)
  const pos = basename.lastIndexOf('.')      // get last position of `.`

  if (basename === '' || pos < 1)            // if file name is empty or ...
      return ''                              //  `.` not found (-1) or comes first (0)

  return basename.slice(pos + 1)             // extract extension ignoring `.`

}


//Extract the filename:
function fileBasename(fullPathName) {
  return path.basename(fullPathName)
}

//Extract the filename:
function fileName(fullPathName) {
  return path.basename(fullPathName).split('.')[0]
}


function filePath(fullPathName) {
  return path.dirname(fullPathName)
}

/**
 * fileNameConcat
 * outputFilename is made joining names of inputFilenames
 *
 * @param {string[]} inputFilenames array of filenames
 * @returns {string} status of ffmpeg spawned process
 */
function fileNameConcat(inputFilenames) {

  const firstFile = inputFilenames[0]
  const suffix = fileExtension(firstFile)

  const path = filePath(firstFile)
  const name = inputFilenames
    .map( fname => fileName(fname) )
    .join('') 

  return `${path}/${name}.${suffix}`

}

function main() {

  console.log( '\'' + fileExtension('/path/to/name') + '\'' )
  console.log( '\'' + fileExtension('/path/to/file.mp3') + '\'' ) 
  console.log( '\'' + fileExtension('/path/to/name.with.many.dots.mp3.opus') + '\'' )
  console.log()
  console.log( filePath('/path/to/name.with.many.dots.mp3.opus') )
  console.log( fileBasename('/path/to/name.with.many.dots.mp3.opus') )
  console.log( fileName('/path/to/name.with.many.dots.mp3.opus') )
  console.log()
  console.log( fileNameConcat(['/path/en/first.mp3.opus', '/path/en/second.mp3.opus']) )
}


/**
 * unit test
 */
if (require.main === module) main()

module.exports = { 
  fileExtension,
  fileName,
  fileNameConcat,
  fileBasename,
  filePath
}
