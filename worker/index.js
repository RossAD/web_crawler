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
context.on( 'ready', () => {
  var worker = context.socket('WORKER', {prefetch: 1});
  worker.setEncoding( 'utf8' );
  worker.connect( 'jobs', () => {
    console.log( 'listening' );
    worker.on( 'data', ( msg ) => {
      console.log( 'msg', msg );
      worker.ack();
    });
  });
});

