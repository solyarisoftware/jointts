# Examples

## Spelling examples 

Here below some alphanumeric codes spelling examples, in Italian language.<br>
Short spelling: each letter is spelled shortly. No case sensitive.<br>
Long spelling: each letter is spelled with the phonetic word code 
[Alfabetico telefonico Italiano](https://it.wikipedia.org/wiki/Alfabeto_telefonico_italiano). 

- 🔉 [`CSQU3054383` short spelling](CSQU3054383.mp3)
 
  The code contains letters and digits.<br>
  Short spelling.<br>
  No case sensitive.<br>
  To listen from CLI with command: 
  ```bash
  com/play examples/CSQU3054383.mp3
  ```

- 🔉 [`CSQU3054383`](CSQU3054383_long.mp3)

  The code contains letters and digits.<br> 
  Long spelling.<br> 
  No case sensitive.<br>
  To listen from CLI with command: 
  ```bash
  com/play examples/CSQU3054383_long.mp3
  ```

- 🔉 [`RAIU 690011 4 25 U1`](RAIU%20690011%204%2025%20U1.mp3)
 
  The code contains letters, digits, blanks.<br>
  Long spelling.<br>
  No case sensitive.<br>
  To listen from CLI with command: 
  ```bash
  com/play 'examples/RAIU 690011 4 25 U1.mp3'
  ```

- 🔉 [`JL1349-76 [45A/MU4]`](JL1349-76%20%5B45AslashMU4%5D.mp3)
 
  The code contains letters, digits, blanks and special symbols as `-`, `/`, `[`, `]`.<br>
  No case sensitive.<br>
  To listen from CLI with command: 
  ```bash
  com/play 'examples/JL1349-76 [45AslashMU4].mp3'
  ```

### Steps to run the examples (WORK IN PROGRESS)

- edit your characters configuration file in your language (e.g. in Italian: `config/it/characters.json`)
- prepare a inter-char pause file using com/pause utility (e.g. `com/pause PAUSE.mp3 300`)
- build characters speech files (`node lib/buildCharactersAudio.js`)
- run the run-time concatenation with command `node lib/charByChar`

---

[top](#) | [home](../README.md)
