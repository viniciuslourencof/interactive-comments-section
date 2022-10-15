

const cors = require('cors');
const express = require('express');
const app = express();
const router = express.Router();
//Rotas
const index = require('./Routes/index');
const commentsRoute = require('./Routes/CommentsRoute');

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use('/', index);
app.use('/comments', commentsRoute);
module.exports = app;



