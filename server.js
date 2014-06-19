var http = require('http'),
    url  = require('url'),
    fs   = require('fs'),
     _   = require('underscore');
 
// serving static files
function getStaticFile(filePath, res){

  fs.exists(filePath, function(exists){

    if(exists){
      fs.readFile(filePath, function(err, contents){
        if(!err){
          res.end(contents);
        } else {
          console.log(err);
        };
      });
    } else {
      //serve-up 404 page
      fs.readFile(__dirname + '/app/404.html', function(err, contents){
        if(!err){
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.end(contents);
        } else {
          console.log(err);
        }
      });
    }
  });
}

// returns JSON data
function getMarketData(query, res) {

  //TODO: Validate query
  query = query || '?borough=1';

  var payload = '',
      result  = [];

  var options = {
        host: 'www.grownyc.org',
        port: 80,
        path: '/greenmarket.php' + query,
        method: 'GET'
      };

  var headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
      };

  // rename datares to something better?
  var req = http.request(options, function(datares) {
    datares.setEncoding('utf8');

    datares.on('data', function (chunk) {
      payload += chunk;
    });

    datares.on('end', function() {
       _.each(JSON.parse(payload).sites, function(market) {
        result.push(_.omit(market,'infoBubbleHTML'));
      });

      data = JSON.stringify(result);
      headers['Content-Length'] = data.length;

      // if we get just [] back, something is wrong with request
      // in future when we validateQuery() we shuld return 500 instead of 400, something is wrong on our end
      data.length < 3 ? res.writeHead(400, headers) : res.writeHead(200, headers);
      
      res.write(data);
      res.end();
    });
  });

  req.on('error', function(e) {
    console.log('Error fetching data: ' + e.message);
  });

  req.end();
}

// handle HTTP requests
function requestHandler(req, res) {
  var uri         = url.parse(req.url),
      fileName    = uri.pathname.substring(1) || 'index.html',
      localFolder = __dirname + '/app/';

  switch(uri.pathname) {
    case '/api':
      getMarketData(uri.search, res);
      break;
    default:
      getStaticFile((localFolder + fileName), res);
      break;
  }
}

http.createServer(requestHandler)
.listen(3000);

console.log('Server running at http://localhost:3000/');