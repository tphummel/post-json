var hq;

hq = require('hyperquest');

module.exports = function(url, data, cb) {
  var body, buffer, opts, ws;

  body = JSON.stringify(data);

  opts = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  ws = hq.post(url, opts);
  ws.end(body);

  buffer = '';
  ws.on('data', function(chunk) {
    return buffer += chunk;
  });

  ws.on('error', function(err) {
    return cb(err);
  });

  return ws.on('end', function() {
    var res;
    res = ws.response;
    res.body = buffer;
    return cb(null, res);
  });
};
