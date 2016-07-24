'use strict';
const RABBIT = process.env.RABBITHOST || 'localhost';

var context = require( 'rabbit.js' ).createContext( 'amqp://' + RABBIT );

context.on( 'error', ( error ) => {
  console.error( error.message );
});

context.on( 'ready', () => {
  console.log( 'Queue ready' );
})

module.exports = context;
