# post-json

wrapper for posting json with hyperquest

[![Build Status](https://travis-ci.org/tphummel/post-json.png)](https://travis-ci.org/tphummel/post-json)  
[![NPM](https://nodei.co/npm/post-json.png?downloads=true)](https://nodei.co/npm/post-json/)

## install

    npm install post-json

## test
    
    ./bin/test

## example
    
    var postJson = require("post-json");

    var url = "http://my-post-url.net/path";
    var body = {my: "test", data: "fun"};
    
    postJson(url, body, function (err, result) {
      // do stuff
    });
