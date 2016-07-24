'use strict';

const app = require( './app' );
const http = require( 'http' ).Server( app );
const mongoose = require( 'mongoose' );

const DB = process.env.DBHOST || 'localhost' 
  + '/'
  + process.env.DBNAME || 'web_crawler';

mongoose.connect( 'mongodb://' + DB );

app.set( 'port', process.env.WEB_PORT || 3000 );

const server = http.listen( app.get( 'port' ), function() {
  console.log( 'Express server listening on ' + server.address().port );
});
