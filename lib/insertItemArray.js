function insertItemArray(array, item) {

  if ( !item )
    return array

  //const item = BLANK.repeat(n)

  const newArray = array
    .map(i => [i, item])
    .flat()

  newArray.pop()

  return newArray
}


if (require.main === module) {

  const text = 'CGREU45'
  const BLANK = ' '
  const textAsArray= text.toLowerCase().split('')
  
  console.log( insertItemArray(textAsArray) )
  console.log( insertItemArray(textAsArray, BLANK) )

  //console.log( insertItemArray(textAsArray, BLANK).join('').split('') )
}  

module.exports = { insertItemArray }
