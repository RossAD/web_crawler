'use strict';
var Promise = require( 'bluebird' );

var Queue = function( context ) {
  this.context = context;
};

Queue.prototype.sendJob = function ( id, uri ) {
  var self = this;
  return new Promise( function( resolve, reject ) {
    var push = self.context.socket( 'PUSH' );
    push.on( 'error', () => { reject( 'Could not push job', id ) } );
    push.connect( 'jobs', () => {
      push.write( JSON.stringify( { id, uri } ), 'utf8' );
      console.log( "Sent job ", id, "with", uri, "to queue." );
      push.close();
      resolve( true );
    });
  });
}

module.exports = Queue;
