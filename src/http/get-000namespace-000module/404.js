module.exports = function notfound() {
  return {
    statusCode: 404, 
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({error: 'not found'})
  } 
}
