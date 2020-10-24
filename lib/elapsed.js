//https://nodejs.org/api/process.html#process_process_hrtime_time
const {sleep} = require('./sleep')

class Elapsed {

  /**
   * @returns {this}
   */
  constructor() {
    this.hrbegin = process.hrtime()
  }

  /**
   * @returns {Array}
   */
  begin() {
    this.hrbegin = process.hrtime()
  }

  /**
   * @returns {Array}
   */
  stop() {
    return process.hrtime(this.hrbegin)
  }

  /**
   * elapsed
   * in seconds plus milliseconds
   *
   * @returns {String}
   */
  elapsedInSecsPlusMsecs() {
    const hrend = this.stop()

    const sec = hrend[0]
    const msec = Math.round( hrend[1] / 1000000 ) //.toFixed(3)

    return `${sec}s ${msec}ms`
  }

  /**
   * elapsed
   * in milliseconds and approximation in seconds
   *
   * @returns {String}
   */
  elapsed() {
    const hrend = this.stop()

    const secsInMsecs = hrend[0] * 1000
    const msecs = Math.round( hrend[1] / 1000000 ) //.toFixed(3)

    // duration in milliseconds  
    const duration = secsInMsecs + msecs

    return `${Math.round(duration)}ms~${Math.round(duration/1000)}s`
  }

}



/**
 * for unit test
 * @private
 */
async function main() {
  const time = new Elapsed()

  await sleep(1042)

  //console.log(time.str())
  console.log( time.elapsed() )
}


/**
 * unit test
 */
if (require.main === module) main()

module.exports = Elapsed

