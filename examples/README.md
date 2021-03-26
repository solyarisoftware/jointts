# Listen examples

## Alphanumeric codes spelling

Here below some alphanumeric codes spelling examples, in Italian language.<br>
See [Text segmentation](doc/segmentation.md) doc.

### 🛠 Steps to run examples (WORK IN PROGRESS)

1. Edit your characters configuration file in your language, by example in Italian, in English: 
   ```bash
   config/it/characters.json
   config/en/characters.json
   ```
   - Alphabet in json file is no case sensitive.
   - Long spelling: each letter is spelled with the phonetic word code [Alfabetico telefonico Italiano](https://it.wikipedia.org/wiki/Alfabeto_telefonico_italiano). 

2. Prepare a inter-char pause file using com/pause utility, e.g. 
   ```bash
   com/pause PAUSE.mp3 300
   ```
   The above script create the file `audio/PAUSE.mp3` as an inter-char pause of ~350 msecs.
   Note that MP3 codec doesn't allow a perfect timing in milliseconds, adding ~50msecs. 

3. Build characters speech files 
   ```bash
   node lib/buildCharactersAudio.js --language=it
   node lib/buildCharactersAudio.js --language=en
   ```

4. Run the run-time concatenation to produce the TTS spelling for a desired word/sentence,
by examples:

   ```bash
   node lib/charByChar --language=it --text=CSQU3054383
   node lib/charByChar --language=en --text=CSQU3054383

   node lib/charbychar --text='RAIU 690011 4 25 U1' --language=it 
   node lib/charbychar --text='RAIU 690011 4 25 U1' --language=en 
   
   node lib/charbychar --text='JL1349-76 [45A/MU4]' --language=it
   node lib/charbychar --text='JL1349-76 [45A/MU4]' --language=en
   ```

### 👂 Listen rendered audio files 

- 🎧 🇮🇹 [`CSQU3054383`](it/CSQU3054383.mp3)
 
  - Italian language
  - The alphanumeric code (a shipping container code in a partial ISO6346 format) contains letters and digits
  - Short spelling: each letter is spelled shortly
  - No case sensitive
  - To listen from CLI with command:
    ```bash
    com/play examples/CSQU3054383.mp3
    ```

- 🎧 🇮🇹 [`CSQU3054383`](it/CSQU3054383_long.mp3)

  - Italian language
  - The alphanumeric code (a shipping container code in a partial ISO6346 format) contains letters and digits
  - Long spelling
  - No case sensitive
  - To listen from CLI with command: 
    ```bash
    com/play examples/it/CSQU3054383_long.mp3
    ```

- 🎧 🇬🇧 [`CSQU3054383`](en/CSQU3054383.mp3)

  - English language
  - The alphanumeric code (a shipping container code in a partial ISO6346 format) contains letters and digits
  - Long spelling
  - No case sensitive
  - To listen from CLI with command: 
    ```bash
    com/play examples/en/CSQU3054383.mp3
    ```

- 🎧 🇮🇹 [`RAIU 690011 4 25 U1`](it/RAIU%20690011%204%2025%20U1.mp3)
 
  - Italian language
  - The alphanumeric code (a shipping container code in a complete ISO6346 format) contains letters: 
  `a`  `A`  `B`  `b` etc., digits: `1` `2` etc., blanks: ` `
  - Long spelling
  - No case sensitive
  - To listen from CLI with command: 
    ```bash
    com/play 'examples/it/RAIU 690011 4 25 U1.mp3'
    ```

- 🎧 🇬🇧 [`RAIU 690011 4 25 U1`](en/RAIU_690011_4_25_U1.mp3)
 
  - English language
  - The alphanumeric code (a shipping container code in a complete ISO6346 format) contains letters: 
  `a`  `A`  `B`  `b` etc., digits: `1` `2` etc., blanks: ` `
  - Long spelling
  - No case sensitive
  - To listen from CLI with command: 
    ```bash
    com/play 'examples/en/RAIU_690011_4_25_U1.mp3'
    ```

- 🎧 🇮🇹 [`JL1349-76 [45A/MU4]`](it/JL1349-76%20%5B45AslashMU4%5D.mp3)
 
  - Italian language
  - The alphanumeric code contains letters, digits, blanks and special symbols as: `-` `/` `[` `]`
  - No case sensitive
  - To listen from CLI with command: 
    ```bash
    com/play 'examples/it/JL1349-76 [45AslashMU4].mp3'
    ```

- 🎧 🇬🇧 [`JL1349-76 [45A/MU4]`](en/JL1349-76_%5B45A_slash_MU4%5D.mp3)
 
  - English language
  - The alphanumeric code contains letters, digits, blanks and special symbols as: `-` `/` `[` `]`
  - No case sensitive
  - To listen from CLI with command: 
    ```bash
    com/play 'examples/en/JL1349-76_[45AslashMU4].mp3'
    ```

---

[top](#) | [home](../README.md)
