const fs = require('fs')

/**
 * returns a 200 response with agressive no-cache
 */
module.exports = function found(src) {
  return {
    statusCode: 200,
    headers: {
      'content-type': src.includes('js')? 'text/javascript': 'text/css',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    }, 
    body: fs.readFileSync(src).toString()
  }
}
