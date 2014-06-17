var http = require('http'),
    url  = require('url'),
    _    = require('underscore');

console.log('Server running...');

http.createServer(function (req, res) {

  var query = url.parse(req.url).search;

  if (query) {
    fetchMarketData(query, function (result) {
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Length': result.length,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
      });

      res.write(result);
      res.end();
    });
  } else {
    res.writeHead(404, {'Content-Type':'application/json'});
    res.write('{"error":"Wrong!"}');
    res.end();
  }

}).listen(1338, '0.0.0.0');

function fetchMarketData(query, callback) {
  var payload = '',
      result  = [];

  var options = {
    host: 'www.grownyc.org',
    port: 80,
    path: '/greenmarket.php' + query,
    method: 'GET'
  };

  var req = http.request(options, function(res) {
    res.setEncoding('utf8');

    res.on('data', function (chunk) {
      payload += chunk;
    });

    res.on('end', function() {
       _.each(JSON.parse(payload).sites, function(market) {
        result.push(_.omit(market,'infoBubbleHTML'));
      });

      callback(JSON.stringify(result));
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  req.end();
}