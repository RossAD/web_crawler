'use strict';

const controller = require( './controller' );

module.exports = function( app, express ) {

  app.post( '/api/crawl', controller.addToQueue );
  app.get( '/api/job', controller.getJobStatus );

};
