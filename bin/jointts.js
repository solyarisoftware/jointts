#!/usr/bin/env node

const { getArgs } = require('../lib/getArgs')
const { downloadGoogleTransalteMP3 } = require('../lib/googleTranslateTTS')
const { convertAudioFormat } = require('../lib/convertAudioFormat')

const programNamePathItems = process.argv[1].split('/')
const programName = programNamePathItems[programNamePathItems.length-1]

// get command line args and commands
const { args, commands } = getArgs()

const command = commands[0] ? commands[0].toLowerCase() : undefined
const subCommand = commands[1] ? commands[1].toLowerCase() : undefined

switch ( command ) {

  case 'download':

    switch ( subCommand ) {

      case 'gt':
      case 'googletranslate':
        downloadGoogleTransalteMP3(commands.slice(2), args)
        break

      default:
        console.log( usage() )
        break

    }    
    break

  case 'convert':
    convertAudioFormat(commands.slice(1), args, programName + ' convert')
      .then( result => {

        if (result.exit == 0)
          console.log( result )
        else
          console.error( `command ${result.fullcmd} failed with exit code: ${result.exit}` )
      
      })
      .catch( data => console.log( `command failed with error. See: ${data}` ))
    break

  default:
    console.log( usage() )
    break

}    


function usage() {
  return ( 
    '\n' +
    'jointts, a brainless off-line concatenative text to speech.\n' +
    '(c) Giorgio Robino, 2020. giorgio.robino@gmail.com\n' +
    '\n' +
    'Usage:\n\n' +
    `    ${programName} download gt   download Google Translate TTS MP3 file\n` +
    '\n' +
    `    ${programName} convert       convert audio file codec\n` +
    '\n' +
    `    ${programName} help          show this help\n` +
    '\n'
  )  
}  

