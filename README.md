# ConcaTTS

trivial concatenative on-premise text to speech 

## Concept

The concept is to have a simple on-premise concatenative TTS library, exposed as a nodejs package.

1. The target environment is any sort of embedded system, with scarse CPU resources, but a "real-time" responsive speech output.
   The requirement is to have input texts as:
  
  - List of ready done (static) phrases  
  ```
  Looks like her company has three containers set to sail for tonight.
  ```
  
  - Static phrases containing also entities to be resolved at run-time
    ```
    Container JL1349-76 has been cleared for pick-up.
    ```
  
    in the example the entity is `{container_number}`:
    ```
    Container {container_number} has been cleared for pick-up.
    ```
  
  - Phrases built concatenating words and or letters (that's the general case).


2. At first the system could output an audio file, uncompressed (.wav) or in a compressed format (.ogg). 



