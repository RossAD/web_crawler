'use strict';
/* Connect to database */
var mongoose = require( 'mongoose' );

const DB = process.env.DBHOST || 'localhost' 
  + '/'
  + process.env.DBNAME || 'web_crawler';

mongoose.connect( 'mongodb://' + DB );

/* Connect to queuing service */
const RABBIT = process.env.RABBITHOST || 'localhost';

const context = require( 'rabbit.js' ).createContext( 'amqp://' + RABBIT );
// Handle queue errors
context.on( 'error', ( error ) => {
  console.error( error.message );
  // TODO: If error is that the server is down, try reconnecting
});
context.on( 'ready', () => {
  var worker = context.socket('WORKER', {prefetch: 1});
  worker.setEncoding( 'utf8' );
  worker.connect( 'jobs', () => {
    console.log( 'Listening for messages' );
    worker.on( 'data', ( msg ) => {
      console.log("Received %s", msg );
      // TODO: Scrape some stuff.
      // TODO: Put it in the database.
      worker.ack();
    });
  });
});

