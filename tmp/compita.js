/*
 * @fileOverview compita.js 
 * @license TBD
 * @author giorgio.robino@gmail.com 
 * @version 1.0.0 
 *
 */

const { sleep } = require('./sleep')
const { sendText } = require('./sendText')
const { textToSpeechOneSentence } = require('./textToSpeech')
const { serialize } = require('./serialize')
const { ttsFix } = require('./ttsFix')

//if ( (match = text.match( /^(?:compita|lettere|caratteri|scandisci|lettera per lettera|spelling)(?:\s+(.+))*/i )) ) 
const commandName = 'compita'
const commandSynonyms = 'lettere|caratteri|scandisci|lettera per lettera|spelling'
const commandMispellings = 'scandicci|con pita|con vita|a scandicci' // compiti|compito|computer
const commandAllVariants = commandName + '|' + commandSynonyms + '|' + commandMispellings
const COMPITA_REGEXP = new RegExp(`^(?:${commandAllVariants})(?:\\s+(.+))*`, 'i') 

const COMPITA_FROMBUTTON_REGEXP = /^(?:fromButtonCompita)(?:\s+(.+))*/i 

const CHARACTERSASR = {
  //
  // Letters
  //
  'a': 'a', //'Ancona'],
  'b': 'b', //'bi', //['Bari', 'Bologna']],
  'c': 'c', //'ci', //'Como'],
  'd': 'd', //'di', //'Domodossola'],
  'e': 'e', //'e', //'Empoli'],
  'f': 'f', //'effe', //'Firenze'],
  'g': 'g', //'gi', //'Genova'],
  'h': 'h', //'acca', //'hotel'],
  'i': 'i', //'i', //'Imola'],
  'j': 'j', //'i lunga', //'Imola'],
  'k': 'k', //'cappa', //'kursaal'],
  'l': 'l', //'elle', //'Livorno'],
  'm': 'm', //'emme', //'Milano'],
  'n': 'n', //'enne', //'Napoli'],
  'o': 'o', //'o', //'Otranto'],
  'p': 'p', //'pi', //['Palermo', 'Padova'] ],
  'q': 'q', //'cu', //['Quarto', 'Québec'] ],
  'r': 'r', //'erre', //'Roma'],
  's': 's', //'esse', //['Savona', 'Salerno'] ],
  't': 'tiì', //'ti', //['Torino', 'Taranto'] ],
  'u': 'u', //'u', //'Udine' ],
  'v': 'v', //'vu', //'vi'], 'Venezia' ],
  'w': 'w', //'vu doppia', //'vi doppia', 'doppia vu', 'doppia vi'], 'Washington' ],
  'x': 'x', //'ics', //['xilofono', 'xeres'] ],
  'y': 'y', //'ipsilon', //'i greca'], ['yogurt', 'York', 'yacht'] ],
  'z': 'z', //'zeta', //'Zara'],

  //
  // Diacritici
  // 
  'á': 'a con accento acuto',
  'à': 'a con accento grave',
  'é': 'e con accento acuto',
  'è': 'e con accento grave',
  'í': 'i con accento acuto',
  'ì': 'i con accento grave',
  'ó': 'o con accento acuto',
  'ò': 'o con accento grave',
  'ú': 'u con accento acuto',
  'ù': 'u con accento grave',
}

// 
// https://it.wikipedia.org/wiki/Alfabeto_telefonico_italiano 
// https://it.wikipedia.org/wiki/Alfabeto_fonetico_NATO
// https://corsidia.com/materia/web-design/caratterispecialihtml
// https://it.wikipedia.org/wiki/Compitazione
// 
const CHARACTERS = {
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

  //
  // digits
  //
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

  //
  // Diacritici
  // 
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
  
  //
  // puntuactions/symbols 
  //
  '\t': 'tabulazione',
  ' ': 'spazio',
  '.': 'punto',
  '·': 'punto centrale',
  ',': 'virgola',
  ';': 'punto e virgola',
  ':': 'due punti',
  '!': 'punto esclamativo',
  '?': 'punto interrogativo',

  '’': 'virgoletta destra inclinata',
  '‘': 'virgoletta sinistra inclinata',
  
  '"': 'virgolette', //'virgolette doppie'],
  '\'': 'apostrofo', //'virgolette singole'],
  //'`': 'apostro retroverso',
  '´': ' accento acuto o apostrofo senza lettera',
  '`': ' accento grave o apostropo inverso senza lettera',

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

  '@': 'chiocciola', //'chiocciolina'],
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
  '-': 'trattino', //'lineetta', 'meno'],
  '+': 'simbolo più',
  '>': 'simbolo maggiore',
  '<': 'simbolo minore',
  '~': 'tilde',

  '—': 'trattino lungo',
  '_': 'sottolineato', //'sottolineatura', 'trattino basso'],
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



function lookupDescription(char, fromASR) {
  let description

  if (fromASR) { 
    description = CHARACTERSASR[char]
    if (description) 
      return description
  }    
 
  description = CHARACTERS[char]
  if (description)
    return description
  else
    return char + ': carattere non riconosciuto'
}


/*
 * compita from button
 * simulate the audio is coming from incoming audio message
 *
 * @public
 * @param {String} id
 * @param {String} sentence
 */
function compitaFromButton(id, sentence) {
  return compita(id, sentence, true)
}  


/*
 * text to speech with spelling 
 *
 * @public
 * @param {String} id
 * @param {String} sentence
 * @param {Boolean} fromASR
 */
function compita(id, sentence, fromASR) {

  if (sentence === undefined)
    return compitaHelp(id)

  const NORMAL_SPEED = 1
  const SLOW_SPEED = 0.2

  const lowerCase = sentence.toLowerCase()
  const upperCase = sentence.toUpperCase()

  const sentenceArray = sentence.split('')
  
  // prepend explanation
  const singleWord = (sentence.split(/\s/).length === 1) ? true : false

  /*
  const introText = `La ${(singleWord)? 'parola': 'frase'}\n\n${sentence}\n\n` +
                    `è composta da ${sentence.length} caratteri\n\n` +
                    `${sentence.split('').join('\n')}\n\nLe lettere sono`
  */

  const introText = `${upperCase} ha ${sentence.length} lettere`

  sendText(id, introText)

  // 
  // TTS of characters sequence
  //
  let output = []

  for (const char of sentenceArray) {

   output.push( () => 
      textToSpeechOneSentence(
        id, 
        lookupDescription(char, fromASR),
        NORMAL_SPEED, 
        // caption
        //(fromASR) ? char.toUpperCase() : char 
        char
      ) 
   )

   output.push( () => sleep(300) ) 

  }  
    
  // normal velocity speech of original sentence
  output.push( () => sleep(1000) ) 
  output.push( () => sendText(id, `Ascolta l'intera ${(singleWord)?'parola':'frase'}`) ) 

  //output.push( () => sendText(id, 'pronunciata lentamente') ) 
  //output.push( () => textToSpeechOneSentence(id, ttsFix(lowerCase), SLOW_SPEED) ) 
  //output.push( () => sleep(300) ) 
  //output.push( () => sendText(id, 'pronunciata normalmente') ) 
  
  output.push( () => textToSpeechOneSentence(id, ttsFix(lowerCase), NORMAL_SPEED) ) 

  serialize(output) 

}

  
/*
 * for unit test
 */
async function main() {

  const sentence = 'alfaBetO%DF'

  const sentenceArray = sentence.split('')

  console.log(sentence)
  for (const char of sentenceArray) 
    console.log('\t', CHARACTERS[char])

}

if (require.main === module) 
  main()

// exports public function 
module.exports = { 
  compita, 
  compitaFromButton,
  COMPITA_REGEXP, 
  COMPITA_FROMBUTTON_REGEXP
}

