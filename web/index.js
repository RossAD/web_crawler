'use strict';

const app = require( './app' );
const http = require( 'http' ).Server( app );

app.set( 'port', process.env.WEB_PORT || 3000 );

const server = http.listen( app.get( 'port' ), function() {
  console.log( 'Express server listening on ' + server.address().port );
});
