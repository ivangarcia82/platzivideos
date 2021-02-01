const express = require('express');
const MoviesService = require('../services/movies');




function moviesApi(app){
    const router = express.Router();
    app.use("/api/movies", router);

    const moviesService = new MoviesService();

    router.get('/', async function(req, res, next){
        const {tags} = req.query;
        try {
            const movies = await moviesService.getMovies({tags})

            res.status(200).json({
                data: movies,
                message: 'movies listed'
            })
        } catch (err) {
            next(err)
        }
    });

    //parametros en la url - query es signo de pregunta nombre de query
    router.get('/:movieId', async function(req, res, next){
        const {movieId} = req.params
        try {
            const movie = await moviesService.getMovie({movieId});

            res.status(200).json({
                data: movie,
                message: 'movies retrieve'
            })
        } catch (err) {
            next(err)
        }
    });

    router.post('/', async function(req, res, next){
        const {body: movie} = req;
        try {
            const createMovieId = await moviesService.createMovie({movie})

            res.status(201).json({
                data: createMovieId,
                message: 'movies created'
            })
        } catch (err) {
            next(err)
        }
    });

    router.put('/:movieId', async function(req, res, next){
        const {movieId} = req.params
        const {body: movie} = req;

        try {
            const updatedMovieId = await moviesService.updateMovie({movieId, movie})

            res.status(200).json({
                data: updatedMovieId,
                message: 'movies updated'
            })
        } catch (err) {
            next(err)
        }
    });

    router.patch('/:movieId', async function (req,res,next){
        const {movieId} = req.params;
        const {body: movie} = req;
        try {
            const updatedMoviePartiallyId = await moviesService.updateMoviePartially({movieId, movie})

            res.status(200).json({
                data: updatedMoviePartiallyId,
                message: 'movies partially updated'
            })
        } catch (err) {
            next(err)
        }



    })

    router.delete('/:movieId', async function(req, res, next){
        const {movieId} = req.params

        try {
            const deletedMovieId = await moviesService.deleteMovie({movieId})

            res.status(200).json({
                data: deletedMovieId,
                message: 'movies deleted'
            })
        } catch (err) {
            next(err)
        }
    });
}

module.exports = moviesApi;