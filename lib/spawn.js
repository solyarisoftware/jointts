
const { spawn } = require('child_process')
const Elapsed = require('./elapsed')

const DEBUG = false


/**
 * spawn a process 
 *
 * @param {String} command
 * @param {String[]} args - command arguments
 *
 * @typedef SpawnedProcess
 * @property {number} exit - exit code
 * @property {String} cmd - full command 
 * @property {String} execution - execution elapsed time
 *
 * @returns {Promise<SpawnedProcess>} status of spawned process
 *
 * @see https://stackoverflow.com/questions/14332721/node-js-spawn-child-process-and-get-terminal-output-live
 */
function spawnAsync (command, args) {

  const fullcmd = `${command} ${args.join(' ')}`
  let stdout = ''
  let stderr = ''

  if(DEBUG)
    console.log('spawnAsync>command>', fullcmd)
  
  return new Promise((resolve, reject) => {
    
    const elapsedTime = new Elapsed()

    const child = spawn(command, args)

    child.stdout.setEncoding('utf8')
    child.stderr.setEncoding('utf8')

    child.stdout.on('data', (data) => {
      stdout += data.toString()
      
      if(DEBUG)
        console.log(`spawnAsync>stdout> ${command}: ${data}`)
    })

    child.stderr.on('data', (data) => {
      stderr += data.toString()
      
      if(DEBUG)
        console.log(`spawnAsync>stderr> ${command}: ${data}`)
    })

    child.on('error', (error) => {
        console.error(`spawnAsync> error ${error}`)
        reject(error)
    })

    /*
    child.on('exit', (code, signal) => {
      if (code !== 0) {
        console.error(`spawnAsync>exit> code ${code} and signal ${signal}`)
        reject(code, signal)
      }  
    }) 
    */

    child.on('close', (code) => {
      if (stderr !== '') {
        console.error(`spawnAsync>stderr> ${command}: ${stderr} exit code: ${code}`)
        reject(stderr)
      }  
      else
        resolve({ 
          exit: code, 
          fullcmd, 
          stdout,
          //stderr,
          execution: elapsedTime.elapsed()
        })
    })
  })
}


/*
 * for unit test
 * @private
 */
async function main() {

  if ( process.argv.length < 3 ) {
    console.log()
    console.log('usage  : node spawn <bash command with optional arguments>')
    console.log('example: node spawn ls -l')
    console.log()
    process.exit(1)
  }

  const fullCommand = process.argv.slice(2).join(' ')

  const [command, ...args] = fullCommand.split(' ')

  spawnAsync(command, args)
    .then( result => {

      //if (result.code === 0)
        console.log( result /*.stdout*/ ) // print the attribute stdout of resolve object
      //else
      //  console.error( `command ${result.fullcmd} failed with exit code: ${result.code}` )
    
    })
    .catch( data => console.log( `command failed. See: ${data}` ))
}

if (require.main === module) 
  main()


module.exports = { spawnAsync } 

