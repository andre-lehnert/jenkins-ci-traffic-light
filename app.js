// ---------------- URL --------------------------------------------------------
var config = require('./.config').configuration;

// define url and port to concat REST-URLs
var BASEURL     = config.BASEURL,
    PORT        = config.PORT,
    URL         = BASEURL+':'+PORT;

module.exports.serverUrl = URL;

// ---------------- App --------------------------------------------------------

var express = require('express'),
    path = require('path'),

    // REST-API v1
    v1 = require('./src/rest-service/v1/service').api

    // Express.js Application
    app = module.exports = express();

app.use(express.static(path.resolve(__dirname, 'src/frontend')));
app.set('_URL', URL);
app.set('_PORT', PORT);


// ---------------- Versions ---------------------------------------------------

/*
 * ## define the versions
 */
var VERSIONS =
{
  'href': URL+'/api',
  'versions': [
    v1
  ]
};

// ---------------- Routing ----------------------------------------------------

/*
 * ## ROOT
 */
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/src/frontend/index.html');
})

/*
 * ## route to display versions
 */
app.get('/api', function(req, res) {
    res.json(VERSIONS);
})

/*
 * ## versioned routes go in the src/{version}/rest-api directory
 * - import the routes
 */
for (var k in VERSIONS.versions) {
    app.use(
      '/api/' + VERSIONS.versions[k].name,
      require('./src/rest-service/' + VERSIONS.versions[k].name + '/service')
    );
}

// ---------------- Run Application --------------------------------------------

var server = app.listen(PORT, function () {
    console.log("Listening on port %s...", server.address().port);
});