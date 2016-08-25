var express = require('express'),
    app = express(),
    engines = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Importing data into db


MongoClient.connect('mongodb://localhost:27017/browsers', function(err, db) {


    assert.equal(null, err);
    // Importing data into db
    db.collection('browsers').insertMany(
      [
        {
          "name":"Chrome",
          "link": "http://chrome.google.com",
          "usage":71.9
        },
        {
          "name":"Firefox",
          "link": "http://firefox.com",
          "usage":17.1
        },
        {
          "name":"IE",
          "link": "https://www.microsoft.com/en-ca/windows/microsoft-edge",
          "usage":5.2
        },
        {
          "name":"Safari",
          "link": "http://www.apple.com/ca/safari/",
          "usage":3.2
        },
        {
          "name":"Opera",
          "link":"http://www.opera.com/download",
          "usage":1.1
        }
      ]
    );
    console.log("Successfully connected to MongoDB.");

    app.get('/', function(req, res){

        db.collection('browsers').find({}).toArray(function(err, docs) {
            res.render('index', { 'browsers': docs } );
        });

    });

    app.use(function(req, res){
        res.sendStatus(404);
    });

    var server = app.listen(3000, function() {
        var port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });

});
