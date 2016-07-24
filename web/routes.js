'use strict';

const controller = require( './controller' );

module.exports = function( app, express ) {

  app.post( '/api/scrape', controller.addToQueue );
  app.get( '/api/job', controller.getJobStatus );

};
