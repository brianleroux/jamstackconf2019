module.exports = function error({err, req}) {
  return {
    statusCode: 500,
    headers: {
      'content-type': 'text/html'
    }, 
    body: `
      <h1>${err.message}</h1>
      <pre>${err.stack}</pre>
      <h2>request</h2>
      <pre>${JSON.stringify(req, null, 2)}</pre>
    `
  }
}
