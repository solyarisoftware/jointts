# Change log

All notable changes to this project will be documented in this file. 

## Version 0.9.0

Major new feature: 
- spelling (charByChar) function

modified files:
- README.md
- config/it/characters.json
- lib/audioFilenameFromText.js
- lib/buildCharactersAudio.js
- lib/sanitizeFilename.js

new files: 
- doc/config.md
- lib/buildConfigJson.js
- lib/charByChar.js
- lib/characters.js

## Version 0.8.0

modified files:
- bin/jointts.js
- lib/convertAudioFormat.js
- lib/googleTranslateLanguages.js
- lib/googleTranslateTTS.js

new files: 
- TODO.md
- lib/buildCharactersAudio.js
- lib/characterSet.js
- lib/info.js

## Version 0.7.0

- added subcommand `jointts convert`
  - modified bin/jointts.js
  - modified lib/convertAudioFormat.js
  - new      index.js

## Version 0.6.7
- added disclaimer section in README.md
- documentation rework, creating multiple files in doc/

## Version 0.5.0
- better explanation in README.md
- lib/characterSetIt.js contains Italian language character spelling
- lib/buildConfigJsonIt.js build Italian language grammar config/it/config.json
- lib/audioFilenameFromText.js updated

## Version 0.4.0
- new
  - config/it/
  - lib/characterSetIt.js
- modified 
  - config/characters.json
  - lib/audioFilenameFromText.js
  - lib/concatAudioFiles.js
  - lib/fileHelpers.js

## Version 0.3.3
- added command line utility `jointts download googletranslate`
- command line utility `jointts`
- ISO langauge codes are validate through googleTranslateLanguages.js

## Version 0.1.0
- [oncatAudioFiles.js](lib/concatAudioFiles.js): concat files with same codec, using ffmpeg.
- [convertAudioFormats.js](lib/convertAudioFormats.js): convert audio files codecs/formats, using ffmpeg.
- helpers bash scripts (using ffmpeg): `script/duration`, `script/play`.
- [googleTranslateTTS.js](lib/googleTranslateTTS.js): downloads audio base files, using [Google Translate Speech library](https://github.com/zlargon/google-tts).

## Version 0.0.7
- lib/googleTranslateTTS download teh TTS MP3 file from googleTranslate 
- lib/convertcodec       change codec to WAV/OPUS format, from input audio files

## Version 0.0.1 - initial commit 
- edited README.md
