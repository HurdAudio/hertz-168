'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');
//const bcrypt = require('bcrypt');
const request = require('request');

require('dotenv').config();

const app = express();

const users = require('./routes/users.js');
const testbeds = require('./routes/testbeds.js');

const port = process.env.PORT || 3048;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/../', 'node_modules')));

app.use('/users', users);
app.use('/testbeds', testbeds);


app.get('/test', (req, res, next) => {
    res.send({user: 'forbidden'});
});


app.use('*', function (req, res, next) {
    res.sendFile('home.html', {
        root: path.join(__dirname, 'public')
    });
});

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(port, () => {
    console.log('Listening on port', port);
    console.log('postgreSQL is lit.');
});

module.exports = app;
