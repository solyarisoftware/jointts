# Multi-language

Speech generation is language-dependent. 
The speech translation of any text depends on a specific natural language of reference.

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
---

[top](#) | [home](../README.md)
