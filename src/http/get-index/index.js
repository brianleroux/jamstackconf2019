exports.handler = async function http(req) {
  let waterfall = req.queryStringParameters && req.queryStringParameters.hasOwnProperty('waterfall')
  return {
    headers: {
      'content-type': 'text/html; charset=utf8'
    },
    body: `<!doctype html>
<html>
<link rel=stylesheet href=/css/index.css>
<body>
<h1>ES modules demo</h1>
<div id=app></div>
</body>
<script src=/js/index.js${waterfall? '?waterfall' : ''} type=module></script>
</html>`
  }
}
