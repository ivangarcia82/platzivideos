const proxyquire = require('proxyquire');
const { MongoLibMock, getAllStub } = require('../utils/mocks/monngoLib')
const { moviesMock } = require('../utils/mocks/movies');
const assert = require('assert');



describe("services - movies", function(){
    const MoviesService = proxyquire('../services/movies',{
        '../lib/mongo': MongoLibMock
    });
    const moviesService = new MoviesService();
    describe("When getMovies method is called", async function(){
        it('should call the getall MongoLib method', async function(){
            await moviesService.getMovies({});
            assert.strictEqual(getAllStub.called, true);
        })

        it("should return an array of movies", async function(){
            const result = await moviesService.getMovies({});
            const expected = moviesMock;
            assert.deepEqual(result, expected);

        })

    })
})