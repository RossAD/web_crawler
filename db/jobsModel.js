'use strict';

const mongoose = require( 'mongoose' );

const JobsSchema = new mongoose.Schema({
  uri: {
    type: String,
    required: true
  },
  html: String,
});

module.exports = mongoose.model( 'jobs', JobsSchema, 'jobs' );
