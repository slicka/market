// not found
exports['404'] = function (res, msg, next) {
  res.statusCode = 404;
  if (typeof next === "function") {
    next();
  }
  else {
    if (res.writable) {
      res.setHeader('content-type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(setResponse(404, msg || 'Endpoint not found!'));
    }
  }
};

// bad request
exports['400'] = function (res, msg) {
  res.statusCode = 400;
  res.setHeader('content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(setResponse(400, msg || 'Bad request!'));
};

// disallowed method
exports['405'] = function (res, msg) {
  res.statusCode = 405;
  res.setHeader('allow', 'GET');
  res.setHeader('content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(setResponse(405, msg || 'Method not allowed!'));
};

// flagrant error
exports['500'] = function (res, opts) {
  res.statusCode = 500;
  res.setHeader('content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (typeof opts === 'string') {
    res.end(setResponse(500, opts));
  } else {
    res.end(opts.error.stack || opts.error.toString() || "No specified error");
  }
};

function setResponse(status, message) {
  var result = {
    'status': status,
    'error': {
      'message': message
    }
  }

  return JSON.stringify(result);
}
