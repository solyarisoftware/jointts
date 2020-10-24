
/*
 * resolves Promises sequentially.
 * 
 * @example
 *   const urls = ['/url1', '/url2', '/url3']
 *   const funcs = urls.map(url => () => $.ajax(url))
 *
 *   serialize(funcs)
 *     .then(console.log)
 *     .catch(console.error)
 *
 * @see https://hackernoon.com/functional-javascript-resolving-promises-sequentially-7aac18c4431e 
 * @see https://stackoverflow.com/questions/24586110/resolve-promises-one-after-another-i-e-in-sequence
 */
const serialize = funcs =>
  funcs.reduce((promise, func) =>
    promise.then(result => func().then(Array.prototype.concat.bind(result))),
    Promise.resolve([]))


module.exports = { serialize }

