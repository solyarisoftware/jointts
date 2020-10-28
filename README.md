# JoinTTS

Trivial concatenative on-premise text to speech.

## Concept

JoinTTS is a simple on-premise concatenative TTS nodejs API.

The goal is to have a super simple (and performing) TTS concatenating prerecorded audio files. 
This system is suitable for applications with a small grammar 
(a limited set of sentences/words) for a semi-static natural language generation.

The speech is produced by concatenating prepared audio files sources, 
for letters, words, template literals, entire phrases. 

The strategy is to prepare "off-line" all audio files need, 
to be available at run-time for fast concatenative audio generation. 

Output will be both audio files or in-memory binary blobs (buffers) 
in a specific audio coding format 
(by example using [OPUS](https://en.wikipedia.org/wiki/Opus_(audio_format)) codec).

Two typical applicative scenarios:

- The target environment is any sort of embedded system (local/on-premise/offline/no-cloud!), 
  with poor CPU resources, but the need of a "real-time" responsive speech output.

- Text to speech not realized by a synthetic voice, 
  but instead by real human voices (voice actors) recordings.
  This is specially useful by example in language education apps, for special purposes, 
  as syllables pronunciation.


## Multi-language

Speech generation is language-dependent. The speech translation of any text depends on a specific natural language of reference.

By example `123.45` is pronounced 

- in Italian: `uno due tre punto quattro cinque` (or: `centoventitré punto quarantacinque`)
- in English: `one two three point four five`

We use [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) codes
to organize texts to be processed. 

Maybe with a function call:

```javascript
const {ttsfile} = require('jointts')

// generate the speech for a text in Italian language
ttsfile('123.45', 'it')
// -> '/some/path/it/uno_due_tre_punto_quattro_cinque.ogg'

// the English language equivalent:
ttsfile('123.45', 'en')
// -> '/some/path/en/one_two_three_point_four_five.ogg'
```

Files are organized with a directory for each language:

```
├── some/path/audio
│   ├── it
│   │   ├── uno_due_tre_punto_quattro_cinque.ogg
│   │   ├── uno_due_tre_punto_quattro_sei.ogg
│   │   └─── ti_amo.ogg
│   ├── en
│   │   ├── one_two_three_point_four_five.ogg
│   │   ├── one_two_three_point_four_six.ogg
│   │   └─── i_love_you.ogg
│   ├── de
│   │   ├── ...ogg
│   │   ├── ...ogg

```

## Input text types

Input texts could be configured as characters, words, phrases:

- Static phrases
- Character-by-character spelling
- Template literals
- Words concatenation 

### Static phrases
 
It's the simplest scenario: you have a list of static, ready done, phrases. By example:
```
Looks like her company has three containers set to sail for tonight.
```
The above sentence corresponds to

- an audio (speech) file with some naming convention 

  by example: `your/path/speech/en/looks_like_her_company_has_three_containers_set_to_sail_for_tonight.ogg` 

- or with a obscure name/UUID 
 
  by example: `your/path/speech/en/123456.ogg`.

```javascript
const {ttsfile} = require('jointts')
const fileName = ttsfile('Looks like her company has three containers set to sail for tonight', 'en')
// -> 'your/path/speech/en/looks_like_her_company_has_three_containers_set_to_sail_for_tonight.ogg'
```

### Character-by-character spelling

We need a ready done letters/symbols audio files, for spoken spelling of 
single chars, acronyms, numbers, or alphanumeric codes, unknown words (not included in custom grammar):

Examples (alphanumeric codes):
```
RAIU 690011 4 25 U1
CSQU3054383
1006.760
```

> BTW, the two initial lines are container codes with format ISO6346 (see: https://github.com/solyarisoftware/iso6346).

In the case of an alphanumeric sequence of chars, the required spoken spelling is the concatenation of letter-by-letter speech.
The original input text:
```
CSQU3054383
```

is spelled as sequence of single characters (separated by brief pauses): 
```
C S Q U 3 0 5 4 3 8 3
```

Where the spelling of each character corresponds to the pseudo-phonetic spelling audio, depending on 

- the language 
- the specific [spelling alphabet](https://en.wikipedia.org/wiki/Spelling_alphabet).

A basic TTS for English language could be
```
sii es kiu iu three zero five four three eight three
```

Whereas, using the NATO phonetic alphabet:
```
sii for Charli
es for Sierra
kiu for Quebec
iu for Uniform
three
zero
five
four
three
eight
three
```

### Template literals

Template literals are string literals allowing embedded expressions. 
They are static phrases containing also entities to be resolved at run-time. By example:
```
Container JL1349-76 has been cleared for pick-up.
```

in the sentence up here, the entity `JL1349-76` is a domain specific code 
(a shipping container code), to be spelled as a `{alphanumeric_code}`. 
At the configuration level, a template literal could have a syntax like: 
```
Container {alphanumeric_code} has been cleared for pick-up.
```

That "template literal" be a concatenation of 3 strings component parts:
- `Container`, a static string
- ` {alphanumeric_code} `, an alphanumeric code to be spelled char-by-char
- `has been cleared for pick-up.`, a static string

At run-time, the TTS translation function must recognize the template literal,
concatenating the sequences.

### Words concatenation 

Phrases are built concatenating words and or letters
(that is the general case of concatenative text-to-speech).
Apparently it's a "worst case" because 
the system has to preset all the words of the grammar.
In the example: 
```
Container JL1349-76 has been cleared for pick-up.
```

The sentence could split in blank separated word tokens:
```
Container
JL1349-76
has
been
cleared
for
pick-up.
```

The downside of this approach is that having a file for each word, 
implies a run time concatenation, with possible unnatural sounding play,
due to the static file sequencing.


## Step 1: off-line data preparation: speech files data base

Following a configuration file(s), all audio files required must be produced, with a recording or a download.
Audio source files could be made in two different ways:

- Human-made: prerecorded audio files, result of a voice actor recordings

- Synthetic voices files, generated by any cloud-based TTS and downloaded as files. 
   - E.g. free of charge, using Google Translate Speech library: https://github.com/zlargon/google-tts 
   - using any cloud-based TTS as Amazon Polly, Google Cloud Platform Text-to-Speech, etc.


## Step 2: run-time environment

### API functions


#### `setup`

```javascript
/**
 * setup 
 *
 * @param {string}  language  language code ('en-us', 'it', )
 * @param {String}  codec     audio coding format (wav/ogg/etc.)
 * @return {String} spelling  character-by-character spelling mode (''/'nato'/etc.)
 */
```

Usage:
```javascript
const {setup} = require('jointts')
setup('it', 'ogg', 'nato')
```

#### `ttsfile`    
The returned object is an audio file, lossless (e.g. `wav`) 
or in a compressed lossy compression format 
(e.g. [`ogg`](https://en.wikipedia.org/wiki/Opus_(audio_format)))
 
```javascript
/**
 * ttsfile 
 *
 * @param {String} text       sentence to be spoken
 * @param {string} language   language_code ('en-us', 'it', )
 * @param {String} codec      audio coding format (wav/ogg/etc.)
 * @return {String} filename  name of audio file
 */
```

Usage:
```javascript
const {ttsfile} = require('jointts')
const fileName = ttsfile('Container JL1349-76 has been cleared for pick-up.', 'en', 'ogg')
```

#### `ttsbuf`    
The returned object is a memory buffer in the above specified format.
 
```javascript
/**
 * ttsbuf 
 *
 * @param {String} text       sentence to be spoken
 * @param {string} language   language_code ('en-us', 'it', )
 * @param {String} codec      audio coding format (wav/ogg/etc.)
 * @return {buffer}  
 */
```

Usage:
```javascript
const {ttsbuf} = require('jointts')
const buffer = ttsbuf('Il container JL1349-76 è pronto per il ritiro.', 'it', 'ogg')
```

### Run-time concatenation backend

- File-level concatenation

  The quick&dirty approach is to use `ffmpeg` or `sox`, 
  as a background process that create dynamic concatenations.
 
  See:

  - audio files concatenation using `ffmpeg`:
    - https://trac.ffmpeg.org/wiki/Concatenate
    - https://superuser.com/questions/587511/concatenate-multiple-wav-files-using-single-command-without-extra-file/1307384#1307384

  - audio files concatenation using `sox`:
    - https://superuser.com/questions/571463/how-do-i-append-a-bunch-of-wav-files-while-retaining-not-zero-padded-numeric
    - https://superuser.com/questions/64164/linux-command-to-concatenate-audio-files-and-output-them-to-ogg
    - https://stackoverflow.com/questions/10721089/combine-two-audio-files-with-a-command-line-tool
    - https://askubuntu.com/questions/20507/concatenating-several-mp3-files-into-one-mp3
    - http://sox.sourceforge.net/Docs/Documentation
    - http://sox.sourceforge.net/sox.html#EFFECTS

- In-memory concatenation of audio buffers: 

  that's the correct / fastest solution: working in-memory.
  It require having audio chunks as `PCM`, see:
    - https://github.com/benmangold/audio-concatenation
    - https://github.com/streamich/memfs


## Installation

The target OS is Linux.

- `ffmpeg`: for audio files conversions, audio play, audio concatenations
  ```
  sudo apt install ffmpeg 
  ```
  Optionally, to use OPUS codecs:
  ```
  sudo apt install libopus0 opus-tools
  ```
  Optionally, to a nice command line tool to get info about  audio files:
  ```
  sudo apt install mediainfo
  ```

- The package contains command line interface program `jointts`, 
  so you must install the npm package as global:

  - use npm package manager repo

    ```
    $ npm install -g jointts
    ```

  - or download this github repo:

    ```
    $ git clone https://github.com/solyarisoftware/jointts
    $ cd jointts && npm link
    ``` 


## Status

WORK-IN-PROGRESS / NOT READY.

So far, the project is just a proposal of intents, 
with a bunch (25%) of features implemented. High-level interface: to be defined. 

## License 

[MIT](LICENSE.md) (c) Giorgio Robino

