# Characters configuration (DRAFT) 

Why and how to build configuration files for characters spelling.

## Characters pronunciation 

With the goal of doing word spelling, 
for each natural language, you need to associate each letter (character) with a spelling pronunciation. 

For example consider the original input text:
```
CSQU3054383
```
you want to spell the word as sequence of single characters (separated by brief pauses).
```
C S Q U 3 0 5 4 3 8 3
```
A basic TTS for English language could be the pronunciation of each character spelling:
```
sii es kiu iu three zero five four three eight three
```
Better, you probably want to spell each character using the pseudo-phonetic spelling, that's related to the: 

- each specific language 
- a specific [spelling alphabet](https://en.wikipedia.org/wiki/Spelling_alphabet).

By example, using the [NATO phonetic alphabet](https://en.wikipedia.org/wiki/NATO_phonetic_alphabet), 
the code will be spelled like:
```
Charli for sii 
Sierra for es
Quebec for kiu
Uniform for iu
three
zero
five
four
three
eight
three
```

## Characters pronunciation configuration files

For each language, 
you want to associate a character part of a that language character set, 
to an audio file that contains the spelling.
By example:

```
{
      "a": {
          "speech": "alfa for a",
          "file": "a.mp3"
      },
      "b": {
          "speech": "bravo for b",
          "file": "b.mp3"
      },
      "c": {
          "speech": "charlie for c",
          "file": "c.mp3"
      },
}
```

jointts use JSON configuration files, containing for each language: 
- all the letters of the alphabet, 
- digits,
- special (punctuation) characters

Currently jointts foresee Italian and English languages and related characters configuration:
- `config/it/characters.json`
- `config/en/characters.json`


# Build characters speech files

When a character configuration file is prepared for your target language, 
you have to create corresponding speech audio files. 

You can use Google Translate Speech TTS to build character spelling audio files, 
by example for Italian and English, with commands: 

```bash
node lib/buildCharactersAudio.js --language=it
node lib/buildCharactersAudio.js --language=en
```
---

[top](#) | [home](../README.md)
