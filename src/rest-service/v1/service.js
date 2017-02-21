// ---------------- Router for API v1 ------------------------------------------

// ---------------- VERSION ----------------------------------------------------

var version         = 1,
    name            = 'v'+version;

module.exports.version = version;
module.exports.name = name;

// -----------------------------------------------------------------------------

var express = require('express'),
    // Server
    server = require('./../../../app'),
    URL = server.serverUrl,
    // Express.js Application
    app = module.exports = express();

// ---------------- API --------------------------------------------------------

var RESOURCES =
{
    'info': '/info',
};

var API =
{
  'href': URL+'/api/'+name,
  'name': name,
  'resources': [
    URL+'/api/' + name + RESOURCES.info,
  ]
};

module.exports.api = API;

// ---------------- ROUTING ----------------------------------------------------

/*
 * ## shows API information
 */
app.get('/', function(req, res) {
    res.json(API);
});

var urlOperations = [];

/*
 * ## enable routing to resource middleware
 */
for (var k in RESOURCES) {
    app.use(
      RESOURCES[k],
      require('./resources' + RESOURCES[k])
    );
    urlOperations.push(RESOURCES[k]);
}