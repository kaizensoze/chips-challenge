var http = require('http')
  , multipart = require('formidable')
  , sys = require('sys');

var Step = require('step');

var server = http.createServer(function(req, res) {
    if (req.url == '/upload' /*&& req.method.toLowerCase() == 'post'*/) {
        upload(req, res);
    }
});
server.listen(8000);            

function upload(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('upload.');
    res.end();
}

function show_404(req, res) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('404.');
    res.end();
}

