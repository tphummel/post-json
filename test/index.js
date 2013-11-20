var assert = require("assert");
var through = require("through");
var http = require("http");

var PostJson = require("../index");

describe("post-json tests", function(){
  it("should post json to server", function(done){

    var server = http.createServer(function (req, res) {
      assert.equal(req.method, "POST");
      req.pipe(through(function (buf) {
        
        // echo request back to response
        this.queue(String(buf));
      })).pipe(res);
    });

    server.listen(3001, function(){
      var postBody = {test: true};

      PostJson("http://localhost:3001", postBody, function(err, res) {
        
        assert(res.body == JSON.stringify(postBody), "post body from response should match posted")
        server.close()
        done(err);
      });
    });
  });
});