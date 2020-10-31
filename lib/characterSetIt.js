
/**
 * ITALIAN LANGUAGE ALPHABET
 *
 * @see
 * https://it.wikipedia.org/wiki/Alfabeto_telefonico_italiano
 * https://it.wikipedia.org/wiki/Alfabeto_fonetico_NATO
 * https://corsidia.com/materia/web-design/caratterispecialihtml
 * https://it.wikipedia.org/wiki/Compitazione
 *
 */

const LETTER_SEMPLIFIED = {
  'a': 'a',
  'b': 'bi',
  'c': 'ci',
  'd': 'di',
  'e': 'é',
  'f': 'èffe',
  'g': 'gi',
  'h': 'àcca',
  'i': 'i',
  'j': 'i lùnga',
  'k': 'càppa',
  'l': 'èlle',
  'm': 'èmme',
  'n': 'ènne',
  'o': 'ò',
  'p': 'pi',
  'q': 'cu',
  'r': 'èrre',
  's': 'èsse',
  't': 'ti',
  'u': 'u',
  'v': 'vu',
  'w': 'dóppia vu',
  'x': 'ics',
  'y': 'ìpsilon',
  'z': 'zèta',
}  

const LETTER_SPELLING_ITALIAN_PHONE_ALPHABET = {
  'a': 'a come Ancona',
  'b': 'bi come Bari', //'Bologna',
  'c': 'ci come Como',
  'd': 'di come Domodossola',
  'e': 'é come Empoli',
  'f': 'èffe come Firenze',
  'g': 'gi come Genova',
  'h': 'àcca come hotel',
  'i': 'i come Imola',
  'j': 'i lùnga come Jolly', // Jesolo
  'k': 'càppa come kursaal',
  'l': 'èlle come Livorno',
  'm': 'èmme come Milano',
  'n': 'ènne come Napoli',
  'o': 'ò come Otranto',
  'p': 'pi come Palermo', //'Padova',
  'q': 'cu come Quarto', //'Québec',
  'r': 'èrre come Roma',
  's': 'èsse come Savona', //'Salerno',
  't': 'ti come Torino', //'Taranto',
  'u': 'u come Udine',
  'v': 'vu come Venezia',//'vi',
  'w': 'dóppia vu come Washington', //'vi doppia', 'doppia vu', 'doppia vi',
  'x': 'ics come xilofono', //'xeres'] ],
  'y': 'ìpsilon come yogurt', //'York', 'yacht'] ],, //'i greca'], 
  'z': 'zèta come Zara',
}  

const DIACRITIC_MARK_SIMPLIFIED = {
  'á': 'á con accento acuto',
  'à': 'à con accento grave',
  'é': 'é con accento acuto',
  'è': 'è con accento grave',
  'í': 'í con accento acuto',
  'ì': 'ì con accento grave',
  'ó': 'ó con accento acuto',
  'ò': 'ò con accento grave',
  'ú': 'ú con accento acuto',
  'ù': 'ù con accento grave',
}

const DIGIT = {
  '1': 'uno',
  '2': 'due',
  '3': 'tre',
  '4': 'quattro',
  '5': 'cinque',
  '6': 'sei',
  '7': 'sette',
  '8': 'otto',
  '9': 'nove',
  '0': 'zero',
}  

const DIACRITIC_MARK_COMPLETE = {
  'á': 'a minuscola con accento acuto',
  'Á': 'A maiuscola con accento acuto',
  'à': 'a minuscola con accento grave',
  'À': 'A maiuscola con accento grave',
  'â': 'a minuscola con accento circonflesso',
  'Â': 'A maiuscola con accento circonflesso',
  'å': 'a minuscola con anello o occhiello',
  'Å': 'A maiuscola con anello o occhiello',
  'ã': 'a minuscola con tilde',
  'Ã': 'A maiuscola con tilde',
  'ä': 'a minuscola con dieresi',
  'Ä': 'A maiuscola con dieresi',
  'æ': 'ae minuscola con legatura fonetica',
  'Æ': 'AE maiuscola con legatura fonetica',
  'ç': 'c minuscola con cediglia',
  'Ç': 'C maiuscola con cediglia',
  'é': 'e minuscola con accento acuto',
  'É': 'E maiuscola con accento acuto',
  'è': 'e minuscola con accento grave',
  'È': 'E maiuscola con accento grave',
  'ê': 'e minuscola con accento circonflesso',
  'Ê': 'E maiuscola con accento circonflesso',
  'ë': 'e minuscola con dieresi ',
  'Ë': 'E maiuscola con dieresi ',
  'í': 'I minuscola con accento acuto',
  'Í': 'I maiuscola con accento acuto',
  'ì': 'i minuscola con accento grave',
  'Ì': 'I maiuscola con accento grave',
  'î': 'i minuscola con accento circonflesso',
  'Î': 'I maiuscola con accento circonflesso',
  'ï': 'i minuscola con diaeresis',
  'Ï': 'I maiuscola con diaeresis',
  'ñ': 'n minuscola con tilde',
  'Ñ': 'N maiuscola con tilde',
  'ó': 'o minuscola con accento acuto',
  'Ó': 'O maiuscola con accento acuto',
  'ò': 'o minuscola con accento grave',
  'Ò': 'O maiuscola con accento grave',
  'ô': 'o minuscola con accento circonflesso',
  'Ô': 'O maiuscola con accento circonflesso',
  'ø': 'o minuscola barrata',
  'Ø': 'O maiuscola barrata',
  'õ': 'o minuscola con tilde',
  'Õ': 'O maiuscola con tilde',
  'ö': 'o minuscola con dieresi',
  'Ö': 'O maiuscola con dieresi',
  'ú': 'u minuscola con accento acuto',
  'Ú': 'U maiuscola con accento acuto',
  'ù': 'u minuscola con accento grave',
  'Ù': 'U maiuscola con accento grave',
  'û': 'u minuscola con accento circonflesso',
  'Û': 'U maiuscola con accento circonflesso',
  'ü': 'u minuscola con dieresi',
  'Ü': 'U maiuscola con dieresi',
  'ß': 'simbolo beta',
  'ÿ': 'y minuscola con dieresi',
}  

const PUNTUACTIONS_SYMBOLS = {
  ' ': 'spazio',
  '\t': 'tabulazione',
  '.': 'punto',
  '·': 'punto centrale',
  ',': 'virgola',
  ';': 'punto e virgola',
  ':': 'due punti',
  '!': 'punto esclamativo',
  '?': 'punto interrogativo',

  '’': 'virgoletta destra inclinata',
  '‘': 'virgoletta sinistra inclinata',

  '"': 'virgolette', // 'virgolette doppie'],
  '\'': 'apostrofo', // 'virgolette singole'],
  '´': 'accento acuto', //  apostrofo senza lettera
  '`': 'accento grave', // 'apostro retroverso', apostropo inverso senza lettera

  '”': 'virgolette destre inclinate',
  '“': 'virgolette sinistre inclinate',

  '«': 'virgolette doppie aperte', // virgolette sinistre in stile europeo
  '»': 'virgolette doppie chiuse', // virgolette destre in stile europeo

  '(': 'parentesi tonda aperta',
  ')': 'parentesi tonda chiusa',

  '[': 'parentesi quadra aperta',
  ']': 'parentesi quadra chiusa',

  '{': 'parentesi graffa aperta',
  '}': 'parentesi graffa chiusa',

  '@': 'chiocciola',
  '*': 'simbolo asterisco',
  '#': 'simbolo cancelletto',
  '%': 'simbolo percento',

  '|': 'barra verticale',
  '/': 'barra',
  '\\': 'barra retroversa',

  '£': 'simbolo valuta lira',
  '$': 'simbolo valuta dollaro',
  '&': 'simbolo e commerciale',
  '^': 'simbolo cappelletto',
  '=': 'simbolo uguale',
  '-': 'trattino', // 'lineetta', 'meno'],
  '+': 'simbolo più',
  '>': 'simbolo maggiore',
  '<': 'simbolo minore',
  '~': 'tilde',

  '—': 'trattino lungo',
  '_': 'sottolineato', // 'sottolineatura', 'trattino basso'],
  '¢': 'simbolo di centesimo',
  '©': 'simbolo di copyright',
  '÷': 'simbolo di divisione',
  'µ': 'simbolo micron',
  '¶': 'delimitatore di paragrafo',
  '±': 'simbolo più o meno',
  '®': 'simbolo di marchio registrato',
  '§': 'delimitatore di sezione',
  '™': 'simbolo trademark',
  '¥': 'simbolo valuta Yen Giapponese',
  '¿': 'punto di domanda invertito',
  '¡': 'punto esclamativo invertito',
}


const LETTER_COMPLETE = {
  //
  // Letters
  //
  'a': 'a minuscola', //'Ancona'],
  'b': 'b minuscola', //'bi', //['Bari', 'Bologna']],
  'c': 'c minuscola', //'ci', //'Como'],
  'd': 'd minuscola', //'di', //'Domodossola'],
  'e': 'e minuscola', //'e', //'Empoli'],
  'f': 'f minuscola', //'effe', //'Firenze'],
  'g': 'g minuscola', //'gi', //'Genova'],
  'h': 'h minuscola', //'acca', //'hotel'],
  'i': 'i minuscola', //'i', //'Imola'],
  'j': 'j minuscola', //'i lunga', //'Imola'],
  'k': 'k minuscola', //'cappa', //'kursaal'],
  'l': 'l minuscola', //'elle', //'Livorno'],
  'm': 'm minuscola', //'emme', //'Milano'],
  'n': 'n minuscola', //'enne', //'Napoli'],
  'o': 'o minuscola', //'o', //'Otranto'],
  'p': 'p minuscola', //'pi', //['Palermo', 'Padova'] ],
  'q': 'q minuscola', //'cu', //['Quarto', 'Québec'] ],
  'r': 'r minuscola', //'erre', //'Roma'],
  's': 's minuscola', //'esse', //['Savona', 'Salerno'] ],
  't': 'ti minuscola', //'ti', //['Torino', 'Taranto'] ],
  'u': 'u minuscola', //'u', //'Udine' ],
  'v': 'v minuscola', //'vu', //'vi'], 'Venezia' ],
  'w': 'w minuscola', //'vu doppia', //'vi doppia', 'doppia vu', 'doppia vi'], 'Washington' ],
  'x': 'x minuscola', //'ics', //['xilofono', 'xeres'] ],
  'y': 'y minuscola', //'ipsilon', //'i greca'], ['yogurt', 'York', 'yacht'] ],
  'z': 'z minuscola', //'zeta', //'Zara'],

  'A': 'A maiuscola', //'Ancona'],
  'B': 'B maiuscola', //'bi', //['Bari', 'Bologna']],
  'C': 'C maiuscola', //'ci', //'Como'],
  'D': 'D maiuscola', //'di', //'Domodossola'],
  'E': 'E maiuscola', //'e', //'Empoli'],
  'F': 'F maiuscola', //'effe', //'Firenze'],
  'G': 'G maiuscola', //'gi', //'Genova'],
  'H': 'H maiuscola', //'acca', //'hotel'],
  'I': 'I maiuscola', //'i', //'Imola'],
  'J': 'J maiuscola', //'i lunga', //'Imola'],
  'K': 'K maiuscola', //'cappa', //'kursaal'],
  'L': 'L maiuscola', //'elle', //'Livorno'],
  'M': 'M maiuscola', //'emme', //'Milano'],
  'N': 'N maiuscola', //'enne', //'Napoli'],
  'O': 'O maiuscola', //'o', //'Otranto'],
  'P': 'P maiuscola', //'pi', //['Palermo', 'Padova'] ],
  'Q': 'Q maiuscola', //'cu', //['Quarto', 'Québec'] ],
  'R': 'R maiuscola', //'erre', //'Roma'],
  'S': 'S maiuscola', //'esse', //['Savona', 'Salerno'] ],
  'T': 'Ti maiuscola', //'ti', //['Torino', 'Taranto'] ],
  'U': 'U maiuscola', //'u', //'Udine' ],
  'V': 'V maiuscola', //'vu', //'vi'], 'Venezia' ],
  'W': 'W maiuscola', //'vu doppia', //'vi doppia', 'doppia vu', 'doppia vi'], 'Washington' ],
  'X': 'X maiuscola', //'ics', //['xilofono', 'xeres'] ],
  'Y': 'Y maiuscola', //'ipsilon', //'i greca'], ['yogurt', 'York', 'yacht'] ],
  'Z': 'Z maiuscola', //'zeta', //'Zara'],
}  

const CHARACTER_SIMPLIFIED = { 
  ...LETTER_SEMPLIFIED, 
  ...DIACRITIC_MARK_SIMPLIFIED,
  ...DIGIT,
  ...PUNTUACTIONS_SYMBOLS
} 


const CHARACTER_COMPLETE = {
  ...LETTER_COMPLETE,
  ...DIACRITIC_MARK_COMPLETE,
  ...DIGIT,
  ...PUNTUACTIONS_SYMBOLS
}  



function lookupDescription(char, simplifiedMode) {
  
  let description

  if (simplifiedMode) {
    description = CHARACTER_SIMPLIFIED[char]
    if (description)
      return description
  }

  description = CHARACTER_COMPLETE[char]
  if (simplifiedMode)
    return description
  else
    return char // null / char + ': carattere non riconosciuto'
}



/*
 * text to speech with spelling
 *
 * @public
 * @param {String} word
 * @param {Boolean} fromASR
 */
function spelling(word, simplified=true) {

  const charSet = simplified ? CHARACTER_SIMPLIFIED : CHARACTER_COMPLETE

  const arrayOfChars = word.toLowerCase().split('')

  return arrayOfChars
    .map( char => charSet[char] )
    .join(' ')
}


/*
 * for unit test
 */
function main() {

  let sentence = 'alfaBetO%DF'

  const sentenceArray = sentence.split('')

  console.log()
  console.log(sentence)
  console.log()

  for (const char of sentenceArray)
    console.log( lookupDescription(char, false) )

  console.log()

  for (const char of sentenceArray)
    console.log( lookupDescription(char, true) )

  console.log()

  sentence = '1006.760'
  console.log( sentence )
  console.log( spelling(sentence) )

  sentence = 'CSQU3054383'
  console.log( sentence )
  console.log( spelling(sentence) )

  sentence = 'JL1349-76'
  console.log( sentence )
  console.log( spelling(sentence) )

  sentence = 'RAIU 690011 4 25 U1'
  console.log( sentence )
  console.log( spelling(sentence) )

  console.log()
}

if (require.main === module)
  main()

module.exports = {
  CHARACTER_SIMPLIFIED,
  CHARACTER_COMPLETE
}


