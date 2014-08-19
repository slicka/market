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
  // location should fit ?latlng=yy,xx
  if (!location) {
    // return status 404 and error message
    return status[404](res, 'Missing location params!');
  }

  var result  = {},
      payload = '';

  // http.get('http://maps.googleapis.com/maps/api/geocode/json' + decodeURIComponent('?latlng=40.7171966,-73.9492171'), // Brooklyn
  // http.get('http://maps.googleapis.com/maps/api/geocode/json' + decodeURIComponent('?latlng=40.5763,-74.1448'),  // Staten Island
  http.get('http://maps.googleapis.com/maps/api/geocode/json' + decodeURIComponent(location),
    function(geoResponse) {
      geoResponse.setEncoding('utf8');

      geoResponse.on('data', function (chunk) {
        payload += chunk;
      });

      geoResponse.on('end', function() {
        var data      = JSON.parse(payload),
            response  = {},
            boroughId = -1;

        try {
          if (data.status === 'OK') {
            _.each(data.results[0].address_components, function(piece) {
              if (piece.types[0] === 'sublocality') {
                boroughId = getBoroughId(piece.short_name);

                response = {
                  'id': boroughId,
                  'path': '?borough=' + boroughId
                };

                result.result = response;
                result.status = 200;
              }
            });
          } else {
            return status[404](res, 'Bad request, no results to show!')
          }
        } catch(err) {
          return status[500](res, {error: err});
        }

        // response for poor Croatians
        if (boroughId === -1) {
          return status[500](res, 'Location not supported!');
        }

        data = JSON.stringify(result);

        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
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
    function(marketResponse) {
      marketResponse.setEncoding('utf8');

      marketResponse.on('data', function (chunk) {
        payload += chunk;
      });

      marketResponse.on('end', function() {
        try {
           _.each(JSON.parse(payload).sites, function(market) {
            result.push(_.omit(market,['infoBubbleHTML','product_days','farmer_days', 'url']));
          });
        } catch (err) {
          return status[500](res, { error: err });
        }

        data = JSON.stringify(result);

        // if we get just [] back, something is wrong with request
        // in future when we validateQuery() we shuld return 500 instead of 400
        // TODO: shold not return 400 for valid request that return no data
        // ex: http://www.grownyc.org/greenmarket.php?products=2&borough=1&daysopen=3
        if (data.length < 3) {
          return status[400](res);
        }

        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Content-Length': Buffer.byteLength(data)
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