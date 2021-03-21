# Listen examples

## Alphanumeric codes spelling

Here below some alphanumeric codes spelling examples, in Italian language.<br>
See [Text segmentation](doc/segmentation.md) doc.

### 🛠 Steps to run (WORK IN PROGRESS)

1. Edit your characters configuration file in your language, by example in Italian: 
   ```bash
   config/it/characters.json
   ```
   - Alphabet in json file is no case sensitive.
   - Long spelling: each letter is spelled with the phonetic word code [Alfabetico telefonico Italiano](https://it.wikipedia.org/wiki/Alfabeto_telefonico_italiano). 

2. Prepare a inter-char pause file using com/pause utility, e.g. 
   ```bash
   com/pause PAUSE.mp3 300
   ```
   The above script create an inter-char pause of ~350 msecs.
   Note that MP3 codec doesn't allow a perfect timing in milliseconds, adding ~50msecs. 

3. Build characters speech files 
   ```bash
   node lib/buildCharactersAudio.js
   ```

4. Run the run-time concatenation with command 
   ```bash
   node lib/charByChar
   ```

### 👂 Listen rendered audio files 

- 🎧 [`CSQU3054383`](CSQU3054383.mp3)
 
  The alphanumeric code (a shipping container code in a partial ISO6346 format) contains letters and digits.<br>
  Short spelling: each letter is spelled shortly. <br>
  No case sensitive.<br>
  To listen from CLI with command: 
  ```bash
  com/play examples/CSQU3054383.mp3
  ```

- 🎧 [`CSQU3054383`](CSQU3054383_long.mp3)

  The alphanumeric code (a shipping container code in a partial ISO6346 format) contains letters and digits.<br> 
  Long spelling.<br> 
  No case sensitive.<br>
  To listen from CLI with command: 
  ```bash
  com/play examples/CSQU3054383_long.mp3
  ```

- 🎧 [`RAIU 690011 4 25 U1`](RAIU%20690011%204%2025%20U1.mp3)
 
  The alphanumeric code (a shipping container code in a complete ISO6346 format) contains letters: 
  `a`  `A`  `B`  `b` etc., digits: `1` `2` etc., blanks: ` `.<br>
  Long spelling.<br>
  No case sensitive.<br>
  To listen from CLI with command: 
  ```bash
  com/play 'examples/RAIU 690011 4 25 U1.mp3'
  ```

- 🎧 [`JL1349-76 [45A/MU4]`](JL1349-76%20%5B45AslashMU4%5D.mp3)
 
  The alphanumeric code contains letters, digits, blanks and special symbols as: `-` `/` `[` `]`.<br>
  No case sensitive.<br>
  To listen from CLI with command: 
  ```bash
  com/play 'examples/JL1349-76 [45AslashMU4].mp3'
  ```

---

[top](#) | [home](../README.md)
