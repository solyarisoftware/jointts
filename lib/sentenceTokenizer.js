/**
 * Split multi sentence text in an array of sentences.
 * Each sentence have a max number of chars
 * @public
 * @param {String}    text
 * @param {Integer}   limit maximum number of characters for each sentence 
 * @return {String[]} array of strings 
 *
 * @see https://stackoverflow.com/questions/5454235/shorten-string-without-cutting-words-in-javascript
*/
function sentenceTokenizer(text, limit) {

  const sentences = sentenceTokenizerRaw(text)
  const shortenedSentences = []  
  sentences.forEach( sentence => shortenedSentences.push( breakSentence(sentence,limit) ) )  

  return shortenedSentences.flat(Infinity)
}


/**
 * Split multi sentence text in an array of sentences.
 * Each sentence length could be arbitrary long.
 *
 * @param {String}    text
 * @return {String[]} array of strings 
 *
 * @see https://stackoverflow.com/questions/18914629/split-string-into-sentences-in-javascript
 * @see https://github.com/zlargon/google-tts/blob/master/example/long-english-characters.js
 */
function sentenceTokenizerRaw(text) {
  // Opinable/TODO
  // sentence stop chars: . , ; ? ! \n
  //const arrayOfSentences = text.replace(/([\n.,;:?!])\s*(?=[\S])/g, '$1\r').split('\r')
  //const arrayOfSentences = text.replace(/([()\[\]{}".,;:?!])\s*(?=[\S])/g, '$1\r').split('\r')
  const arrayOfSentences = text.replace(/([\n.;:?!"])\s*(?=[\S])/g, '$1\r').split('\r')
  return arrayOfSentences
}


/**
 * Split a sentence in a numer of subsentence of specified max length
 *
 * @param {String}    sentence
 * @param {Integer}   limit    maximum number of characters to extract
 *
 * @return {String[]} array of strings 
 *
 * @see https://stackoverflow.com/questions/5454235/shorten-string-without-cutting-words-in-javascript
*/
function breakSentence(sentence, limit) {
  const queue = sentence.split(' ')
  const sentences = []

  while (queue.length) {
    const word = queue.shift()

    if (word.length >= limit) {
      sentences.push(word)
    }
    else {
      let words = word

      for(;;) { 
        if (!queue.length ||
            words.length > limit ||
            words.length + queue[0].length + 1 > limit) {
        break
        }

        words += ' ' + queue.shift()
      }

    sentences.push(words)
    }
  }

 return sentences
}

// https://stackoverflow.com/a/36247412/1786393
//const leftPad = (s, c, n) =>{ s = s.toString(); c = c.toString(); return s.length > n ? s : c.repeat(n - s.length) + s; }


const NULL_REGEXP = /(?!)/ // regexp always fails 

/**
 * split a sentence in multiple phrases, if the sentence contains ',' or '.'
 * split a sentence in multiple words, separated by blanks
 *
 * @example
 *   wordOrPhraseTokenier('uno due') // return ['uno', 'due']
 *   wordOrPhraseTokenier('uno, due , tre e quattro ') // return ['uno', 'due', 'tre e quattro']
 *
 * @param {String} anyCaseSentence
 * @return {String[]}
 *
 */
const wordOrPhraseTokenier = (anyCaseSentence) => {
  
  const PHRASES_SEPARATOR = /[,.]/ 
  const WORD_SEPARATOR = ' '
  //const PUNTUACTION_REGEXP = /[|'"£%&/\\()=§*+°#@\[\]{}\]-_><\^]/g
  const PUNTUACTION_REGEXP = /[|"£%&/\\()=§*+°#@\[\]{}\]-_><\^]/g
  const SEPARATORS_REGEXP = /[?!;:]/g

  // sentence preprocessing
  const sentence = anyCaseSentence

    // convert to lower case to avoid Google TTS anomalies
    .toLowerCase()

    // convert 'virgola' and 'punto' (from ASR) to corresponding chars 
    .replace(/virgola/g, ',')
    .replace(/punto/g, '.')

    .replace(SEPARATORS_REGEXP, '.')

    // italian keyboard puntuaction chars are converted to blank char
    .replace(PUNTUACTION_REGEXP, ' ')

    // convert duplicate tabs or blanks in a single blank
    .replace(/\s+/g,' ')

  //const tokens = sentence.indexOf(PHRASES_SEPARATOR) > -1 ? 
  const tokens = sentence.match(PHRASES_SEPARATOR) ? 
    sentence.split(PHRASES_SEPARATOR) : 
    sentence.split(WORD_SEPARATOR)
  
  return tokens
    // remove blanks at the begin and the end 
    .map(token => token.trim())
    // remove void phrases
    .filter(token => token.length > 0)
}  


const simplePhraseTokenier = (anyCaseSentence) => {
  
  const PHRASES_SEPARATOR = /[.]/ 
  const WORD_SEPARATOR = ' '

  // sentence preprocessing
  const sentence = anyCaseSentence

    // convert 'virgola' and 'punto' (from ASR) to corresponding chars 
    .replace(/punto/g, '.')

    // convert duplicate tabs or blanks in a single blank
    .replace(/\s+/g,' ')

  //const tokens = sentence.indexOf(PHRASES_SEPARATOR) > -1 ? 
  const tokens = sentence.split(PHRASES_SEPARATOR)
  
  return tokens
    // remove blanks at the begin and the end 
    .map(token => token.trim())
    // remove void phrases
    .filter(token => token.length > 0)
}  

function unitTest() {
  //const yourString = 'Buongiorno Maestra! io mi chiamo Layla, sono egiziana.' //replace with your string.
  //const yourString = "Lo Sportello APRE Liguria è lieto di invitarla al workshop sul "TRATTAMENTO DEGLI ASPETTI ETICI NEI PROGETTI DI RICERCA E INNOVAZIONE IN H2020" organizzato in collaborazione con APRE e che si terrà il giorno 15 Aprile p.v. ore 14.00 presso la Sala Conferenze del Di.M.I. (Viale Benedetto XV, 6). 
  
  const maxLength = 140 
  console.log('max sentence length is: ', maxLength)
  console.log()
  console.log()

  //const longString = 'Il workshop intende fornire gli strumenti per il trattamento degli aspetti etici nella presentazione della proposta (con particolare riferimento alla compilazione del questionario etico obbligatorio) e durante la gestione del progetto.'
  //console.log( breakSentence(longString, maxLength) )

  console.log('Demo text: ')
  console.log()

  const string = `Per tutte le attività finanziate dall'Unione Europea, gli aspetti etici sono parte integrante della ricerca dall'inizio alla fine e la conformità etica è considerata fondamentale per garantire l'eccellenza della ricerca
    
    Pertanto, fin dall'elaborazione dell'idea progettuale, è necessario effettuare una valutazione etica approfondita non solo per "rispettare il quadro giuridico", ma anche per migliorare la qualità della proposta, aumentandone così le possibilità di successo
    
La condotta di ricerca etica implica l'applicazione dei principi etici e della legislazione fondamentali alla ricerca scientifica in tutti i "possibili ambiti" di ricerca. Il workshop intende fornire gli strumenti per il trattamento degli aspetti etici nella presentazione della proposta (con particolare riferimento alla compilazione del questionario etico obbligatorio) e durante la gestione del progetto. Sarà inoltre previsto un focus specifico sulle misure di conformità per previste dal Protocollo di Nagoya relativo kall'accesso alle risorse genetiche (EU Access and Benefit Sharing Regulation).`

  console.log(string)
  console.log()
  console.log('Split in sentences: ' )
  console.log()

  sentenceTokenizer(string, maxLength)
    //.forEach( sentence => console.log(`${leftPad(sentence.length, ' ', 3)} ${sentence}`)) 
   .forEach( sentence => console.log(`${(''+sentence.length).padStart(3, ' ')} ${sentence}`)) 


  console.log( breakSentence(string, 80) )
  console.log()

  console.log()
  console.log('---------------------------')
  console.log('wordOrPhraseTokenier tests')
  console.log('---------------------------')
  console.log()

  let sentence

  sentence = 'UNO due'
  console.log( sentence, wordOrPhraseTokenier(sentence) )

  sentence = 'mela.'
  console.log( sentence, wordOrPhraseTokenier(sentence) )
  
  sentence = 'PERA, la MEla, la mela è VERDE'
  console.log( sentence, wordOrPhraseTokenier(sentence) )
  
  sentence = 'mela. la mela, la mela è verde'
  console.log( sentence, wordOrPhraseTokenier(sentence) )
  
  sentence = 'mela punto la mela virgola la mela è verde punto'
  console.log( sentence, wordOrPhraseTokenier(sentence) )
  
  sentence = 'la cameriera è carina!'
  console.log( sentence, wordOrPhraseTokenier(sentence) )
  
  sentence = 'la banana è gialla?'
  console.log( sentence, wordOrPhraseTokenier(sentence) )
  
  sentence = 'la merenda@: è davvero    buona  ?!'
  console.log( sentence, wordOrPhraseTokenier(sentence) )
  
  sentence = 'chi l\'ha visto? Io non l\'ho visto!'
  console.log( sentence, wordOrPhraseTokenier(sentence) )
  
  sentence = 'Chi è stato?. Io non l\'ho mica fatto!.Va bene.'
  console.log( sentence, simplePhraseTokenier(sentence) )
}


if (require.main === module) 
  unitTest()

module.exports = {
  breakSentence,
  sentenceTokenizer, 
  wordOrPhraseTokenier,
  simplePhraseTokenier
} 

