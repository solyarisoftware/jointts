# `jointts` command line program 

```bash
$ jointts

jointts, brainless off-line concatenative text to speech
v. 0.9.0, (C) Giorgio Robino <giorgio.robino@gmail.com>

Usage:

    jointts download gt   download Google Translate TTS MP3 file
    jointts languages     list of ISO-639-1 language codes (in Google Translate)
    jointts convert       convert audio file codec
```

## `jointts download gt` 

```bash
$ jointts download gt

jointts, brainless off-line concatenative text to speech
v. 0.9.0, (C) Giorgio Robino <giorgio.robino@gmail.com>

Usage:

    jointts download gt   download Google Translate TTS MP3 file
    jointts languages     list of ISO-639-1 language codes (in Google Translate)
    jointts convert       convert audio file codec


$ exit

[No write since last change]
$ jointts download gt

jointts, brainless off-line concatenative text to speech
v. 0.9.0, (C) Giorgio Robino <giorgio.robino@gmail.com>

usage:

    jointts download gt <sentence to elaborate> \
         --language=<languagecode> \
        [--directory=<path/to/audio/home/directory>] \
        [--speed=<speed>]

    where:
        <language> : language ISO code (it/en/etc.)
                     see https://cloud.google.com/speech-to-text/docs/languages
        <directory>: path to audio files home directory. Default: your/path/audio
        <speed>    : 1 = normal (default), 0.24 = slow, 0 = very slow

examples:

    jointts download gt mi chiamo Giorgio --language=it
    jointts download gt mi chiamo Giorgio Robino e sono nato a Genova, in Italia. --language=it-IT --speed=0.2
    jointts download gt "my name is Giorgio Robino and I'm born in Genoa, Italy." --language=en
    jointts download gt "my name is Giorgio Robino" --language=en --directory=/home/giorgio/myproject/audio

```

## `jointts languages` 

```bash
$ jointts languages

jointts, brainless off-line concatenative text to speech
v. 0.9.0, (C) Giorgio Robino <giorgio.robino@gmail.com>

CODE       LANGUAGE
ISO-639-1  NAME
---------  -------------------
       af  Afrikaans
       sq  Albanian
       am  Amharic
       ar  Arabic
       hy  Armenian
       az  Azerbaijani
       eu  Basque
       be  Belarusian
       bn  Bengali
       .. ...
```


## `jointts convert` 

```bash
$ jointts convert

jointts, brainless off-line concatenative text to speech
v. 0.9.0, (C) Giorgio Robino <giorgio.robino@gmail.com>

usage:

    jointts convert <filename> \
         --format=<allowedSuffix> \

    where:
         <AllowedSuffix> : pcm | wav | opus | ogg | webm

example:

    jointts convert /home/myproject/audio/mi_chiamo_Giorgio.mp3 --format=pcm
    -> /home/myproject/audio/mi_chiamo_Giorgio.mp3.pcm
```

---

[top](#) | [home](../README.md)
