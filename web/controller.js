'use strict';

var db = require( '../db' );
// var queue = require( './queue' );

module.exports = {

  addToQueue: function( req, res ) {
    const uri = req.body.uri || req.body.url;
    
    // if invalid URL, reply with 400
    // otherwise,
      db.create({ uri }).then( ( created ) => {
        return created._id;
      }).then( ( id ) => {
        // queue.sendJob( id, url ).then( () => {
          res.status( 201 ).send( id );
        // })
        // .catch( ( error ) => {
        //   console.error( error );
        //   res.status(500).send( error.message );
        // });
      })
      .catch( ( error ) => {
        console.error( error );
        res.status(500).send( error.message );
      });
  },

  getJobStatus: function( req, res ) {
    const id = req.param('id');
    // Check if ID in database
      // If yes
        // If the HTML has already been scraped,
          // Reply with HTML
        // Otherwise,
          // Reply with "Still scraping <url>"
      // Otherwise, reply with 404
  },

};
