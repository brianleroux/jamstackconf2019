const fs = require('fs')

/**
 * returns a 201 and caches 1 day
 */
module.exports = function found(src) {
  return {
    statusCode: 201,
    headers: {
      'content-type': src.includes('js')? 'text/javascript': 'text/css',
      'cache-control': 'max-age=86400'
    }, 
    body: fs.readFileSync(src).toString()
  }
}
