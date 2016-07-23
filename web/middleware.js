'use strict';

const morgan = require( 'morgan' );
const bodyParser = require( 'body-parser' );

module.exports = function ( app, express ) {
  app.use( morgan( 'dev' ) );
  app.use( bodyParser.urlencoded( {extended: true} ) );
};
