'use strict';

const app = require( './app' );
const http = require( 'http' ).Server( app );

app.set( 'port', process.env.WEB_PORT || 3000 );

// If this module was called by a require statement, we want to use it for testing and not actually start it up.
if( module.parent ) {
  module.exports = app;
} else {
  const server = http.listen( app.get( 'port' ), () => {
    console.log( 'Express server listening on ' + server.address().port );
  }); 
}
