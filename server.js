// var http = require('http');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('Hello World\n');
// }).listen(1338, '0.0.0.0');
// console.log('Server running at http://alucic.com:1338/');

var http = require('http'),
    url  = require('url');

var count = 0;
console.log('Running');

http.createServer(function (req, res) {
  var path = url.parse(req.url);

  if (path.search) { 
    fetchMarketData(path.search, function (payload){
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Length': payload.length,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
      });
      res.write(payload);
      res.end();
    });
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json'
    });
    res.write('This URL does nothing interesting');
    res.end();
  }
}).listen(1338, '0.0.0.0');

function fetchMarketData(query, callback) {
  var payload = '';

  var options = {
    host: 'www.grownyc.org',
    port: 80,
    path: '/greenmarket.php' + query,
    method: 'POST',
  };

  var req = http.request(options, function(res) {
    res.setEncoding('utf8');

    res.on('data', function (chunk) {
      payload += chunk;
    });

    res.on('end', function(){
      console.log('Length:' + payload.length);
      payload = JSON.parse(payload).sites;
      callback(JSON.stringify(payload));
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
  req.end();
}