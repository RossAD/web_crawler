'use strict';

const db = require( '../db' );
const Queue = require( './queue' );
const queue = new Queue( require( './rabbit' ) );

module.exports = {

  addToQueue: ( req, res ) => {
    const uri = req.body.uri || req.body.url;
    db.create({ uri }).then( ( created ) => {
      return created.id;
    }).then( ( id ) => {
      return queue.sendJob( id, uri ).then( () => {
        res.status( 201 ).send( id );
      });
    })
    .catch( ( error ) => {
      if( error.name === 'ValidationError' ) {
        res.status( 400 ).send( "uri or url required in request body" );
      } else {
        res.status( 500 ).send( error.message );
      }
    });
  },

  getJobStatus: ( req, res ) => {
    const id = req.params.id;
    db.findOne({ _id: req.params.id }).then( ( found ) => {
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
      if( error.name === 'CastError' && error.kind === 'ObjectId' ) {
        res.status( 400 ).send( "Invalid ID" );
      } else {
        res.status( 500 ).send( error.message );
      }
    });
  },

};
