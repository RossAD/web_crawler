'use strict';
const Promise = require( 'bluebird' );

const Queue = function ( context ) {
  this.context = context;
};

Queue.prototype.sendJob = function ( id, uri ) {
  const self = this;
  return new Promise( ( resolve, reject ) => {
    const push = self.context.socket( 'PUSH' );
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
