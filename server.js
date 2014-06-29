var http    = require('http'),
    url     = require('url'),
    _       = require('underscore'),
    status  = require('./server/status');

// move to hepler module
function getBoroughId(borough) {
  return Boroughs = [
    "Manhattan",
    "Brooklyn",
    "Queens",
    "Bronx",
    "Staten Island"
  ].indexOf(borough);
}

// returns borough id and link to borough data
function getClosestBorough(res, location) {
  // TODO: Validate location
  // location should fit ?lat=xx&lng=yy
  if (!location) {
    // return status 404 and error message
    return status[404](res, 'Missing location params!');
  }

  var result        = [],
      payload       = '',
      nytimesApiKey ='&api-key=26ab66631018765b78c293231291dfd9:14:52216455';

  var nytReq = http.get('http://api.nytimes.com/svc/politics/v2/districts.json' + location + nytimesApiKey, 
    function(ntyRes) {
      ntyRes.setEncoding('utf8');

      ntyRes.on('data', function (chunk) {
        payload += chunk;
      });

      ntyRes.on('end', function() {
        try {
          _.each(JSON.parse(payload).results, function(r) {
            var data = {};
            if ('Borough' === r.level) {
              data.id = getBoroughId(r.district);

              if (data.id === -1) {
                return status[500](res);
              }

              data.link = '?borough=' + data.id;
              result.push(data);
            }
           });
        } catch(err) {
          return status[500](res, {error: err});
        }

        data = JSON.stringify(result);

        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        });

        res.end(data);
      });
    }
  ).on('error', function(err) {
    console.log('Error fetching data: ' + err.message);
    status[500](res, { error: err });
  }).end();
}

// returns market data as JSON
function getMarketData(res, query) {

  // TODO: Validate query
  // var params = query.replace(/[\?=\d]+/g, '').split('&');
  // console.log(params);
  query = query || '?borough=1';

  var payload = '',
      result  = [];

  http.get('http://www.grownyc.org/greenmarket.php' + query,
    function(growRes) {
      growRes.setEncoding('utf8');

      growRes.on('data', function (chunk) {
        payload += chunk;
      });

      growRes.on('end', function() {
        try {
           _.each(JSON.parse(payload).sites, function(market) {
            result.push(_.omit(market,'infoBubbleHTML'));
          });
        } catch (err) {
          return status[500](res, { error: err });
        }

        data = JSON.stringify(result);

        // if we get just [] back, something is wrong with request
        // in future when we validateQuery() we shuld return 500 instead of 400
        if (data.length < 3) {
          return status[400](res);
        }

        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        });

        res.end(data);
      });
    }
  ).on('error', function(err) {
    console.log('Error fetching data: ' + err.message);
    status[500](res, { error: err });
  }).end();
}

http.createServer(function (req, res) {
  var uri = url.parse(req.url);

  if (req.method !== 'GET') {
    return status[405](res);
  }

  switch (uri.pathname) {
    case '/location':
      getClosestBorough(res, uri.search);
      break;
    case '/markets':
      getMarketData(res, uri.search);
      break;
    default:
      return status[404](res, '404 bro!');
  }
})
.listen(3000);

console.log('Server running at http://localhost:3000/');