'use strict';

const mongoose = require( 'mongoose' );
mongoose.Promise = require( 'bluebird' );

var Jobs = require( './jobsModel' );

module.exports = Jobs;
