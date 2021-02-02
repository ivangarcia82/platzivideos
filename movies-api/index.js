const express = require('express');
const app = express();
var cors = require('cors')


const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js');

const {logErrors, errorHandler, wrapErrors} = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');
// body parser
app.use(express.json());

//cors
app.use(cors())


//routes
moviesApi(app);

//Error 404
app.use(notFoundHandler);

// error middlewares
app.use(logErrors);
app.use(wrapErrors)
app.use(errorHandler)



app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
  // acceso al usuario de base de datosconsole.log(config.dbUser) 
});