# post-json

## install

    npm install post-json

## run tests
    
    ./bin/test

## usage
    
    var postJson = require("post-json")

    var url = "http://my-post-url.net/path"
    var body = {my: "test", data: "fun"}
    
    postJson url, body, function (err, result) {
      // do stuff
    }