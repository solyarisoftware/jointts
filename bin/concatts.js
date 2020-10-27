#!/usr/bin/env node

const { getArgs } = require('../lib/getArgs')
const { downloadGoogleTransalteMP3 } = require('../lib/googleTranslateTTS')

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

  default:
    console.log( usage() )
    break

}    


function usage() {
  return ( 
    '\n' +
    'Usage:\n\n' +
    '    concatts download googletranslate  downlaod MP3 file using Goole Translate TTS\n' +
    '\n' +
    '    concatts help                      show this help\n' +
    '\n'
  )  
}  

