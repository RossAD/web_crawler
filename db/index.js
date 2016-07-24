'use strict';

const mongoose = require( 'mongoose' );
mongoose.Promise = require( 'bluebird' );

const DB = ( process.env.DBHOST || 'localhost' ) 
  + '/'
  +  ( process.env.DBNAME || 'web_crawler' );

mongoose.connect( 'mongodb://' + DB );

var Jobs = require( './jobsModel' )( mongoose );

module.exports = Jobs;
