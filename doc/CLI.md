# `jointts` command line program 

```
$ jointts

Usage:

    jointts download gt - downlaod MP3 file using Goole Translate TTS

    jointts help        - show this help

```


```
$ jointts

Usage:

    jointts download gt - downlaod MP3 file using Goole Translate TTS

    jointts help        - show this help


$ exit

[No write since last change]
$ jointts download gt

usage:

    node googleTranslateTTS <sentence to elaborate> \
         --language=<languagecode> \
        [--directory=<path/to/audio/home/directory>] \
        [--speed=<speed>]

    where:
        <language> : language ISO code (it/en/etc.)
                     see https://cloud.google.com/speech-to-text/docs/languages
        <directory>: path to audio files home directory. Default: your/path/audio
        <speed>    : 1 = normal (default), 0.24 = slow, 0 = very slow

examples:

    node lib/googleTranslateTTS mi chiamo Giorgio --language=it
    node lib/googleTranslateTTS mi chiamo Giorgio Robino e sono nato a Genova, in Italia. --language=it-IT --speed=0.2
    node lib/googleTranslateTTS "my name is Giorgio Robino and I'm born in Genoa, Italy." --language=en
    node lib/googleTranslateTTS "my name is Giorgio Robino" --language=en --directory=/home/giorgio/myproject/audio

```

---

[top](#) | [home](../README.md)
