# JoinTTS

Brainless concatenative text to speech.

JoinTTS is a simple off-line (on-premise) concatenative TTS nodejs API.

> `jointts` is the formal name of this project, 
> but you can call it simply `joint`,
> that's also the command line program alias.
> Ah! There’s a funny double meaning in the name.🙄

## Introduction

The goal is to have a super simple (and performing) concatenative TTS
that joins prerecorded audio files. 
The system is suitable for applications with a small grammar 
(a limited set of sentences/words) for a semi-static speech generation.

The speech is produced by concatenating prepared audio files sources, 
for letters, words, template literals, entire phrases. 
All audio files "chunks" needed are prepared "in advance",
to be available afterward, at run-time, for a fast concatenative audio generation. 

Text-to-speech output will be audio files 
or in-memory binary blobs (nodejs buffers) 
in a specific audio codec as PCM or OPUS.

Audio recordings could be realized in two ways:
- by real human voices (voice actors) recordings.
  This is specially useful by example in language education apps, 
  for special purposes, as syllables pronunciation.
- by a synthetic voice ( by example using Google Translate TTS)
 
  > Note that using a cloud-based TTS to generate audio chunks 
  > is more a test system to workaround the availability of real human voice recording.
  > Please read [disclaimer](#discalimer) section for details.

Speech generation is language-dependent. 
JoinTTS can be configured to manage many natural languages.
See documentation: [Multi-language](doc/multilanguage.md).

Input texts could be managed as characters, words, phrases.

- Static phrases
- Character-by-character spelling
- Template literals
- Words concatenation 

Documentation: [Text segmentation](doc/segmentation.md).

The target environment is any sort of embedded system 
(local/on-premise/off-line/no-cloud), with poor CPU resources, 
but the need of a "real-time" responsive speech output.


## How it works?

### Step 1 - Build language model configurations 

Following configuration files (TODO), 
all audio files required must be produced, 
with a direct recording or a downloaded from any third party source.

```
          +-------------------+
          |                   |
          |    joinTTS CLI    |
          |                   |
          +---------+---------+
                    |
          +---------v---------+
          |                   |
          | language grammar  |
          | config generator  |
          |                   |
          +---------+---------+
                    |
                    v
            config/it/*.json
            config/en/*.json
            config/de/*.json
                    |
                    v
```


### Step 2 - Build speech audio files

Audio source files could be made in 2 different ways:

- Voice-recordings

  For a personalized voice experience, 
  a voice actor can record all required audio files. 
  TODO 

- Synthetic voices files

  Audio files are generated by any cloud-based TTS and downloaded as files. 
  A synthetic voice file can be made using any cloud-based TTS 
  as Amazon Polly, Google Cloud Platform Text-to-Speech, etc.

  joinTTS use free of charge [Google Translate Speech library](https://github.com/zlargon/google-tts).
  Using `joint` command line utility, audio files can be generated from texts:

  ```bash
  $ jointts download gt
  ```
```
                                 +------------------+
                                 |                  |
                                 |    joinTTS CLI   |
                                 |                  |
                                 +---------+--------+
            config/it/*.json               |
            config/en/*.json               |
            config/de/*.json               |
                    | |          +---------v--------+
                    | +---------->                  |
                    |            |    audio files   |
                    |            |    production    |
                    |            |                  |
                    |            +--------+---------+
                    |                     |
                    |                     v
                    |              audio/it/a.mp3
                    |              audio/it/b.mp3
                    |              audio/it/c.mp3
                    |              ...
                    |                     |
                    v                     v
```
 
### Step 3 - run-time usage

At run-time the main program call joints run-time engine 
that generates on the fly audio speech files, 
concatenating available audio chunks.

```
           config/it/*.json                 
           config/en/*.json                 
           config/de/*.json                 
                   |               audio/it/a.mp3
                   |               audio/it/b.mp3
                   |               audio/it/c.mp3
                   |               ...
                   |                     |
         +---------v---------------------v----------+
         |                                          |
text --> |            joinTTS run-time API          | --> audio file
         |                                          | --> audio buffer
         +------------------------------------------+
         |                  ffmpeg                  |
         +------------------------------------------+
```

See functions documentation: 

- function calls [API](doc/API.md)
- command line program usage [`jointts`](doc/CLI.md)


## Installation

1. Install ffmpeg

  [ffmpeg](https://ffmpeg.org/) is used acid backend engine for all audio files conversions, 
  audio play, audio concatenations.

  ```bash
  sudo apt install ffmpeg 
  ```
  Optionally, to use OPUS codecs:

  ```bash
  sudo apt install libopus0 opus-tools
  ```

2. Install this package

  The package contains command line program `jointts`, 
  so you must install the npm package as global:

  Download this github repo:

  ```bash
  $ git clone https://github.com/solyarisoftware/jointts
  $ cd jointts && npm link
  ``` 

  Or use npm package manager repo

  ```bash
  $ npm install -g jointts
  ```


## Disclaimer

JointTTS run-time usage is intended to basically run on a private environment. 
You are in charge to manage privacy, permissions, licenses, of all your files.

If you use cloud-based TTS platforms (as Amazon Polly, Google TTS, etc.) 
to download synthetic voice files in the preparation step,
it’s your responsibility to not break any license or copyright.

In the same way, if you use voice recordings of other people, 
please assure to have permissions to do it.


## Status

WORK-IN-PROGRESS / NOT READY.

So far, the project is a proof-of-concept, 
in pre-alfa stage, with 60% of features implemented.
Smart high-level usage has to be defined. 


## License 

[MIT](LICENSE.md) (c) Giorgio Robino

---

[top](#)
