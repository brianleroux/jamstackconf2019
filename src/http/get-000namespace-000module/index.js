let exists = require('fs').existsSync
let join = require('path').join

let ok = require('./200')
let created = require('./201')
let found = require('./302')
let notfound = require('./404')
let fatal = require('./500')

/**
 * static assets pipeline
 *
 * get /:namespace/:module
 *
 * @param {string} req.pathParameters.namespace - expecting 'js' or 'cache'
 * @param {string} req.pathParameters.module - any filename
 * @param {string} req.queryStringParameters.waterfall - not required, forces waterfall download
 */
exports.handler = async function http(req) {

  let ns = req.pathParameters.namespace
  let file = req.pathParameters.module
  let src = join(process.cwd(), 'node_modules', '@architect', 'views', ns, file)

  let testing = req.queryStringParameters && req.queryStringParameters.hasOwnProperty('waterfall')
  let known = exists(src)
  let cache = ns === 'cache' && known
  let entry = ns === 'js' && known
  let css = ns === 'css' && known

  try {
    // allow for waterfall override
    if (testing || css)
      return ok(src)

    // returns cache files
    if (cache)
      return created(src)

    // bundle entry file and redirect to cache file
    if (entry)
      return found(file)

    // if all else fails
    return notfound() 
  }
  catch (err) {
    return fatal({err, req})
  }
}
