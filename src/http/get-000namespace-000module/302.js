const rollup = require('rollup')
const crypto = require('crypto')
const join = require('path').join
const write = require('fs').writeFileSync
const exists = require('fs').existsSync

module.exports = async function bundler(file) {

  let base = join(process.cwd(), 'node_modules', '@architect', 'views')
  let src = join(base, 'js', file) 

  // generate the bundle
  let bundle = await rollup.rollup({input: src})
  let bundled = await bundle.generate({format: 'esm'})
  let js = bundled.output[0].code
  
  // get the sha
  let hash = crypto.createHash('sha1')
  hash.update(Buffer.from(js))
  let sha = hash.digest('hex').substr(0, 7)
  let fingerprint = file.replace('.js', `-${sha}.js`) 
  let dest = join(base, 'cache', fingerprint) 
  
  // write the file to the cache
  if (!exists(dest))
    write(dest, js)

  // redirect to it
  return {
    statusCode: 302,
    headers: {
      location: `/cache/${fingerprint}`
    }
  }
}
