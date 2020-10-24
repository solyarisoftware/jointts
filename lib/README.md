# Notes

## OS packages to be installed

```
$ sudo apt-get install libopus0 opus-tools ffmpeg
```

## googleTranslateTTS.js

```
$ node lib/googleTranslateTTS

usage:

    node googleTranslateTTS <sentence to elaborate> --lang=<languagecode> [--speed=<speed>]

    where:
    <language>: it/en/etc.
    <speed>: 1 = normal (default), 0.24 = slow, 0 = very slow

examples:

    node lib/googleTranslateTTS mi chiamo Giorgio --language=it
    node googleTranslateTTS mi chiamo Giorgio Robino e sono nato a Genova, in Italia. --language=it-IT --speed=0.2
    node googleTranslateTTS "my name is Giorgio Robino and I'm born in Genoa, Italy." --language=en
```

```
$ node lib/googleTranslateTTS mi chiamo Giorgio --language=it

sentence       : mi chiamo Giorgio
language       : it
speed          : normal
url            : https://translate.google.com/translate_tts?ie=UTF-8&q=mi%20chiamo%20Giorgio&tl=it&...
file name      : /home/giorgio/concatts/audio/mi_chiamo_giorgio.mp3
elapsed time   : 78ms~0s
```

### Warning 

```
$ npm install google-tts-api
npm notice created a lockfile as package-lock.json. You should commit this file.
+ google-tts-api@0.0.4
added 8 packages from 7 contributors and audited 8 packages in 1.69s
found 1 low severity vulnerability
  run `npm audit fix` to fix them, or `npm audit` for details
$ npm audit

                       === npm audit security report ===

┌──────────────────────────────────────────────────────────────────────────────┐
│                                Manual Review                                 │
│            Some vulnerabilities require your attention to resolve            │
│                                                                              │
│         Visit https://go.npm.me/audit-guide for additional guidance          │
└──────────────────────────────────────────────────────────────────────────────┘
┌───────────────┬──────────────────────────────────────────────────────────────┐
│ Low           │ Denial of Service                                            │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Package       │ node-fetch                                                   │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Patched in    │ >=2.6.1 <3.0.0-beta.1|| >= 3.0.0-beta.9                      │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Dependency of │ google-tts-api                                               │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Path          │ google-tts-api > isomorphic-fetch > node-fetch               │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ More info     │ https://npmjs.com/advisories/1556                            │
└───────────────┴──────────────────────────────────────────────────────────────┘
found 1 low severity vulnerability in 8 scanned packages
  1 vulnerability requires manual review. See the full report for details.
$ npm audit fix
up to date in 0.188s
fixed 0 of 1 vulnerability in 8 scanned packages
  1 vulnerability required manual review and could not be updated

```

Opened issue: https://github.com/zlargon/google-tts/issues/31

## convertcodec.js

```
$ node lib/convertcodec.js

toOpus audio/mi_chiamo_giorgio.mp3
{
  exit: 0,
  fullcmd: 'ffmpeg -loglevel panic -i audio/mi_chiamo_giorgio.mp3 -c:a libopus -ar 16000 -compression_level 10 -frame_duration 60 -vbr on -application voip audio/mi_chiamo_giorgio.mp3.opus -y',
  stdout: '',
  execution: '134ms~0s'
}

toWav audio/mi_chiamo_giorgio.mp3
{
  exit: 0,
  fullcmd: 'ffmpeg -loglevel panic -i audio/mi_chiamo_giorgio.mp3.opus -ac 1 -acodec pcm_s16le -ar 16000 audio/mi_chiamo_giorgio.mp3.opus.wav -y',
  stdout: '',
  execution: '103ms~0s'
}
```

---
