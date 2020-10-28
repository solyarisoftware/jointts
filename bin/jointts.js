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
    convertAudioFormat(commands.slice(1), args)
    break

  default:
    console.log( usage() )
    break

}    


function usage() {
  return ( 
    '\n' +
    'Usage:\n\n' +
    `    ${programName} download gt - downlaod MP3 file using Goole Translate TTS\n` +
    '\n' +
    `    ${programName} help        - show this help\n` +
    '\n'
  )  
}  

