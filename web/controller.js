'use strict';

var db = require( '../db' );
var Queue = require( './queue' );
var queue = new Queue( require( './rabbit' ) );

module.exports = {

  addToQueue: function( req, res ) {
    const uri = req.body.uri || req.body.url;
    // TODO: Validate URI. If invalid URI, reply with 400
    // otherwise,
      db.create({ uri }).then( ( created ) => {
        return created._id;
      }).then( ( id ) => {
        return queue.sendJob( id, uri ).then( () => {
          res.status( 201 ).send( id );
        });
      })
      .catch( ( error ) => {
        console.error( error );
        res.status( 500 ).send( error.message );
      });
  },

  getJobStatus: function( req, res ) {
    const id = req.params.id;
    db.findOne( req.params.id ).then( ( found ) => {
      console.log( found );
      if( found ) {
        if( found.html ) {
          res.status( 200 ).send( found.html );
        } else {
          res.status( 200 ).send( "Still scraping " + found.uri + "." );
        }
      } else {
        res.status( 404 ).send( "Job ID not found." );
      }
    })
    .catch( ( error ) => {
      console.error( error );
      res.status( 500 ).send( error.message );
    });
  },

};
