# API functions (DRAFT)

## `setup`

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

### `ttsfile`    
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

## `ttsbuf`    
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

## Run-time concatenation backend

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

---

[top](#) | [home](../README.md)
