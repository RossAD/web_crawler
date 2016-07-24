'use strict';

const mongoose = require( 'mongoose' );

const JobsSchema = new mongoose.Schema({
  uri: {
    type: String,
    required: true
  },
  html: String,
});

module.exports = function( database ) {
  return database.model( 'jobs', JobsSchema, 'jobs' );
}