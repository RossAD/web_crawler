'use strict';

const express = require( 'express' );
const app = express();

require( './middleware' )( app, express );
require( './routes' )( app, express );

module.exports = app;
