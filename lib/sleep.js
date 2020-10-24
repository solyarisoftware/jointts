/*
 * sleep for a number of milliseconds
 *
 * @param {Integer} ms milliseconds to sleep
 * @return Promise
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = { sleep }

