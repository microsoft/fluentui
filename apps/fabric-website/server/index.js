const express = require('express');

function start(options) {
  let { expressInstance, portNum, doListen } = options;
  let app = expressInstance || express();

  // Configure routes
  _configureRoutes(app);

  if (doListen) {
    return app.listen(process.env.PORT || portNum, function() {
      console.log('Open browser to http://localhost:' + (process.env.PORT || portNum) + ' to view the site.');
    });
  }
}

// Configure routes
function _configureRoutes(app) {
  app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname + '/..' });
  });

  // TODO: add back media handling
  // app.get('/media/*', handleMedia);
}

module.exports = {
  start: start
};
