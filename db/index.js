'use strict';

const mongoose = require( 'mongoose' );
mongoose.Promise = global.Promise;

var Jobs = require( './jobsModel' );

module.exports = Jobs;
