# ConcaTTS

trivial concatenative on-premise text to speech 

## Concept

The concept is to have a simple on-premise concatenative TTS library, exposed as a nodejs package.

The speech is produced by concatenating audio files sources for letters, words, entire phrases. 
Sources could be:

- prerecorded audio files, result of a voice actor recordings.
- downloaded audio files, generated by any cloud-based TTS. 

## Requirements

1. The target environment is any sort of embedded system, with scarse CPU resources, but a "real-time" responsive speech output.
   The requirement is to have input texts as:

  - List of ready done (static) phrases  
    
    Example:
    ```
    Looks like her company has three containers set to sail for tonight.
    ```

  - List of ready done letters/symbols for spoken spelling of unknown words or aplhanumeric codes:
    
    Examples (alphanumeric codes):
    ```
    RAIU 690011 4 25 U1
    CSQU3054383
    ```
    BTW, above codes are container codes with format ISO6346 (see: https://github.com/solyarisoftware/iso6346).
    In this case the required spoken spelling is the concatenation of letter-by-letter speech:
    
    text: `CSQU3054383`, text to speech: `C S Q U 3 0 5 4 3 8 3`

 
  - Static phrases containing also entities to be resolved at run-time
    
    Example:
    ```
    Container JL1349-76 has been cleared for pick-up.
    ```
    in the example the entity is a container code as a `{alphanumeric_code}`:
    ```
    Container {alphanumeric_code} has been cleared for pick-up.
    ```
  
  - Phrases built concatenating words and or letters (that's the general case).


2. Output as: 
  - an audio file, uncompressed (.wav) or in a compressed format (.ogg)
  - a memory buffer in a specified format
  
  
