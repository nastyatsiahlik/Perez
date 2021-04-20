'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/weekweather']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/api/v1/weekweather?date=2021-03-03');
  }
  if (swaggerExpress.runner.swagger.paths['/highlight']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/api/v1/hightlight?date=2021-03-03');
  }
});
