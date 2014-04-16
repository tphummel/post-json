var assert = require("assert");
var through = require("through");
var http = require("http");

var PostJson = require("../index");

var port = 3002
  , url  = 'http://localhost:'+ port;

function createServer(resp, cb) {
  var server = http.createServer(function (req, res) {
    if(req.method !== "POST" || resp == null){
      res.statusCode = 404;
      res.end();
    } else {
      req.pipe(through(function (buf) {
        // echo request back to response
        this.queue(String(buf));
      })).pipe(res);
    }
  });
  server.listen(port, function() { cb(server); });
}

describe("post-json tests", function(){
  it("should post json to server", function(done){
    var body = { test: true };
    createServer(body, function(server) {
      PostJson(url, body, function(err, res) {
        assert(res.body == JSON.stringify(body), "post body from response should match posted");
        server.close();
        done(err);
      });
    });
  });

  it("should treat bad resp codes as errors", function(done) {
    var expected = 'Bad statusCode in response: 404';
    createServer(null, function(server) {
      PostJson(url, null, function(err, res) {
        assert(err instanceof Error, "returns error");
        assert.equal(err.message, expected, "returns status error message");
        server.close();
        done();
      });
    });
  });

});
