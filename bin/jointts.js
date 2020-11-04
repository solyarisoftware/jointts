#!/usr/bin/env node

const { info } = require('../lib/info')
const { getArgs } = require('../lib/getArgs')
const { downloadGoogleTransalteMP3 } = require('../lib/googleTranslateTTS')
const { printLanguages } = require('../lib/googleTranslateLanguages')
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
        console.log( info() )
        downloadGoogleTransalteMP3(commands.slice(2), args, `${programName} ${command} ${subCommand}`)
        break

      default:
        console.log( info() )
        console.log( usage() )
        break

    }    
    break

  case 'isocodes':
  case 'languages':
    console.log( info() )
    printLanguages()
    break

  case 'convert':
    console.log( info() )
    convertAudioFormat(commands.slice(1), args, `${programName} ${command}`)
      .then( result => {

        if (result.exit == 0)
          console.log( result )
        else
          console.error( `command ${result.fullcmd} failed with exit code: ${result.exit}` )
      
      })
      .catch( data => console.log( `command failed with error. See: ${data}` ))
    break

  default:
    console.log( info() )
    console.log( usage() )
    break

}    


function usage() {
  return ( 
    'Usage:\n\n' +
    `    ${programName} download gt   download Google Translate TTS MP3 file\n` +
    `    ${programName} languages     list of ISO-639-1 language codes (in Google Translate)\n` +
    `    ${programName} convert       convert audio file codec\n` +
    '\n'
  )  
}  

