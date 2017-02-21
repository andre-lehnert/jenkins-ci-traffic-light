// ---------------- Operation --------------------------------------------------

var express = require('express'),
    // Server
    server = require('./../../../../app'),
    URL = server.serverUrl,
    // REST-API-Router
    api = require('./../service'),    
    // Express.js Application
    app = module.exports = express();

// ---------------- API --------------------------------------------------------

var RESOURCE = '/info';

// ---------------- Operations --------------------------------------------

var info = function (req, res, next) {

  var URL =  req.protocol + '://' + req.get('host') + req.originalUrl;

  var response =
  {
    'href': URL,
    'info': 'Hello'
  };
	
  req.response = response;
  next();
};

// ---------------- Routing ----------------------------------------------------

 /*
  * ## List all receivers
  */
 app.get('/', [info], function(req, res) {
  res.json(req.response);
 });