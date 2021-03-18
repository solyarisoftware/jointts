# Text segmentation

Input texts could be "segmented" (and configured) in different parts: characters, words, phrases.

- Static phrases
- Template literals
- Word-by-word concatenation 
- Character-by-character spelling

## Static phrases
 
It's the simplest scenario: you have a list of static, immutable, ready done, phrases. By example:
```
Looks like her company has three containers set to sail for tonight.
```
The above sentence corresponds to:

- an audio (speech) file with some naming convention 

  by example: `your/path/speech/en/looks_like_her_company_has_three_containers_set_to_sail_for_tonight.ogg` 

- or with a obscure name/UUID (maybe made with [nanonid](https://github.com/ai/nanoidu))
 
  by example: `your/path/speech/en/V1StGXR8_Z5jdHi6B-myT.ogg`.

```javascript
const {ttsfile} = require('jointts')
const fileName = ttsfile('Looks like her company has three containers set to sail for tonight', 'en')
// -> 'your/path/speech/en/looks_like_her_company_has_three_containers_set_to_sail_for_tonight.ogg'
```

## Template literals

Template literals are string literals allowing embedded expressions. 
They are static phrases containing also variable parts (entities) to be resolved at run-time. 
By example:
```
Container JL1349-76 has been cleared for pick-up.
```

in the sentence up here, the entity `JL1349-76` is a domain specific code 
(a shipping container code), to be spelled as a `{alphanumericCode}`. 
At the configuration level, a template literal could have a syntax like: 
```
Container {alphanumericCode} has been cleared for pick-up.
```

That "template literal" be a concatenation of 3 strings component parts:
- `Container `, a static string
- `{alphanumericCode}`, an alphanumeric code to be spelled char-by-char
- ` has been cleared for pick-up.`, a static string

At run-time, the TTS translation function must recognize the template literal,
concatenating the sequences.

A possible API could be somthing like:

```javascript
const {ttsfile} = require('jointts')
const fileName = ttsfile(
  'Container {alphanumericCode} has been cleared for pick-up.', 
  'en', 
  { alphanumericCode: 'JL1349-76' } 
)
// -> 'Container JL1349-76 has been cleared for pick-up..ogg'
```

## Words concatenation 

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


## Character-by-character spelling

joinTTS foresee a ready done letters/symbols set of audio files, 
for spoken spelling of single chars, acronyms, numbers, or alphanumeric codes, 
unknown words (not included in custom grammar):

Examples (alphanumeric codes):
```
RAIU 690011 4 25 U1
CSQU3054383
1006.760
```

> BTW, the two initial lines are container codes with ISO6346 format 
> (see my npm package [iso6347](https://github.com/solyarisoftware/iso6346)).

In the case of an alphanumeric sequence of chars, 
the required spoken spelling is the concatenation of letter-by-letter speech.
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

or simply:
```
Charli
Sierra
Quebec
Uniform
three
zero
five
four
three
eight
three
```



---

[top](#) | [home](../README.md)
