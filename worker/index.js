'use strict';
const http = require( 'http' );
const Promise = require( 'bluebird' );
/* Connect to database */
const db = require( '../db' );

/* Connect to queuing service */
const RABBIT = process.env.RABBITHOST || 'localhost';

const context = require( 'rabbit.js' ).createContext( 'amqp://' + RABBIT );
// Handle queue errors
context.on( 'error', ( error ) => {
  console.error( error.message );
  // TODO: If error is that the server is down, try reconnecting
});

const scrapeSite = function( site ) {
  return new Promise( function( resolve, reject ) {
    http.get( site, ( response ) => {
      let body = '';
      if ( response.statusCode !== 200 ) resolve( "Site not available." );
      response.on( 'data', ( chunk ) => {
        body += chunk;
      });
      response.on( 'end', () => {
        resolve( body );
      });
      response.on( 'error', ( error ) => {
        reject( error );
      });
    }).on( 'error', ( error ) => {
      console.error( "Failed to resolve DNS", error.message );
    });
  });
};

const addToDatabase = function( id, html ) {
  return db.findOneAndUpdate( id, { html } );
}

// Listen for jobs
context.on( 'ready', () => {
  var worker = context.socket( 'WORKER', {prefetch: 1});
  worker.setEncoding( 'utf8' );
  worker.connect( 'jobs', () => {
    console.log( 'Listening for messages' );
    worker.on( 'data', ( msg ) => {
      console.log( 'Received %s', msg );
      var id, uri;
      ({ id, uri } = JSON.parse(msg));
      scrapeSite( uri ).then( ( html ) => {
        return addToDatabase( id, html );
      }).then( () => {
        console.log( id + ": " + uri + " scraped and added to database." )
        worker.ack();
      }).catch( ( error ) => {
        console.error( error.message );
        worker.ack();
      })
    });
  });
});

