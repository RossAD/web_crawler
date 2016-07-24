const expect = require( 'chai' ).expect;
const request = require( 'supertest' );

const db = require( '../db' );
const server = require( '../web' );
const Queue = require( '../web/queue' );
const worker = require( '../worker' );

describe( 'web server', () => {
  describe( '/api/scrape', () => {
    it( 'should respond with an ID upon a valid request', ( done ) => {
      request( server )
      .post( '/api/scrape' )
      .send( { uri: 'www.example.com' } )
      .expect( 201, done );
    });

    it( 'should accept url as well as uri', ( done ) => {
      request( server )
      .post( '/api/scrape' )
      .send( { url: 'www.example.com' } )
      .expect( 201, done );
    });

    it( 'should respond with 400 with a bad body', ( done ) => {
      request( server )
      .post( '/api/scrape' )
      .send( "bugga" )
      .expect( 400, done );
    })
  });

  describe( '/api/jobs/:id', () => {
    it( 'should respond with a uri if the job has not been processed yet', ( done ) => {
      db.create( { uri: 'www.example.com' } ).then( ( created ) => {
        return created.id;
      }).then( ( id ) => {
        request( server )
        .get( '/api/job/' + id )
        .expect( 'Still scraping www.example.com.', done )
      })
    });

    it( 'should respond with a 404 if the job ID does not exist', ( done ) => {
      request( server )
      .get( '/api/job/5794792a8328b3233937a684' )
      .expect( 404, done );
    });

    it( 'should respond with a 400 if an invalid ID is given', ( done ) => {
      request( server )
      .get( '/api/job/yellow' )
      .expect( 400, done );
    });

  });
});

describe( 'worker', () => {
  describe( 'scraping', () => {
    it( 'can scrape http://www.example.com', ( done ) => {
      worker.scrapeSite( 'http://www.example.com' ).then( ( html ) => {
        expect( html ).to.exist;
        done();
      })
    })

    it( 'can scrape www.example.com', ( done ) => {
      worker.scrapeSite( 'www.example.com' ).then( ( html ) => {
        expect( html ).to.exist;
        done();
      })
    })

    it( 'cannot scrape o.m.g', ( done ) => {
      worker.scrapeSite( 'o.m.g' ).catch( ( error ) => {
        expect( error.message ).to.exist;
        done();
      });
    })
  });

  describe( 'database', () => {
    it( 'can add HTML to a database entry', ( done ) => {
      db.create( { uri: 'http://a.te.st'} ).then( ( created ) => {
        return created.id;
      }).then( ( id ) => {
        return worker.addToDatabase( db, id, 'This is a test.' );
      }).then( ( added ) => {
        return added.id;
      }).then( ( id ) => {
        return db.findOne({ _id: id });
      }).then( ( found ) => {
        expect( found.html ).to.exist;
        done();
      });
    });
  });
});
