'use strict';

const RABBIT = process.env.RABBITHOST || 'localhost';

var context = require( 'rabbit.js' ).createContext( 'amqp://' + RABBIT );

context.on( 'error', ( error ) => {
  console.error( error.message );
});

context.on( 'ready', () => {
  var push = context.socket('PUSH')
  push.connect( 'jobs', () => {
    console.log( 'ready' );
    push.write( 'test', 'utf8' );
    console.log( 'sent test' );
  });
});
