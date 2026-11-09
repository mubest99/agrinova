const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

const root = __dirname
const port = Number(process.env.PORT || 3000)
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
}

const server = http.createServer((request, response) => {
  const requestedPath = decodeURIComponent(request.url.split('?')[0])
  const relativePath = requestedPath === '/' ? '/index.html' : requestedPath
  const filePath = path.resolve(root, `.${relativePath}`)

  if (!filePath.startsWith(root + path.sep)) {
    response.writeHead(403)
    response.end('Forbidden')
    return
  }

  fs.readFile(filePath, (error, contents) => {
    if (error) {
      response.writeHead(error.code === 'ENOENT' ? 404 : 500)
      response.end(error.code === 'ENOENT' ? 'Not found' : 'Server error')
      return
    }

    response.writeHead(200, {
      'Content-Type': mimeTypes[path.extname(filePath)] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    })
    response.end(contents)
  })
})

server.listen(port, '0.0.0.0', () => {
  console.log(`AgriNova preview listening on ${port}`)
})
