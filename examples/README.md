# Examples

## Spelling examples 

Here below some alphanumeric codes spelling examples, in Italian language.

- `CSQU3054383` [listen🔉](./CSQU3054383.mp3)

  Short spelling: each letter is spelled shortly. No case sensitive.
 
  Listen from CLI with command: `com/play examples/CSQU3054383.mp3`

- `CSQU3054383` [listen🔉](./CSQU3054383_long.mp3)
 
  Long spelling: each letter is spelled with the phonetic word code 
  [Alfabetico telefonico Italiano](https://it.wikipedia.org/wiki/Alfabeto_telefonico_italiano). 
  No case sensitive.

  Listen from CLI with command: `com/play examples/CSQU3054383_long.mp3`

- `JL1349-76 [45A/MU4]` [listen🔉](./'JL1349-76 [45AslashMU4].mp3')
 
  Long spelling: each letter is spelled with the phonetic word code 
  [Alfabetico telefonico Italiano](https://it.wikipedia.org/wiki/Alfabeto_telefonico_italiano). 
  No case sensitive.

  Listen from CLI with command: `com/play 'examples/JL1349-76 [45AslashMU4].mp3'`

- `RAIU 690011 4 25 U1.mp3` [listen🔉](./'RAIU 690011 4 25 U1.mp3')
 
  Long spelling: each letter is spelled with the phonetic word code 
  [Alfabetico telefonico Italiano](https://it.wikipedia.org/wiki/Alfabeto_telefonico_italiano). 
  No case sensitive.

  Listen from CLI with command: `com/play 'examples/RAIU 690011 4 25 U1.mp3'`


### Steps to run the examples (WORK IN PROGRESS)

- edit your characters configuration file in your language (e.g. in Italian: `config/it/characters.json`)
- prepare a inter-char pause file using com/pause utility (e.g. `com/pause PAUSE.mp3 300`)
- build characters speech files (`node lib/buildCharactersAudio.js`)
- run the run-time concatenation with command `node lib/charByChar`
