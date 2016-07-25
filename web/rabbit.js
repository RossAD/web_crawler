'use strict';
const RABBIT = process.env.RABBITHOST || 'localhost';

const context = require( 'rabbit.js' ).createContext( 'amqp://' + RABBIT );

context.on( 'error', ( error ) => {
  console.error( error.message );
  // TODO: if the error is that the server is down, try connecting again.
});

context.on( 'ready', () => {
  console.log( 'Queue ready' );
})

module.exports = context;
