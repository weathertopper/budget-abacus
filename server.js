'use strict';

const express = require('express');
const body_parser = require('body-parser');
const path = require('path');
const fs = require('fs');
const json_access = require('./server/json-access.js');

// Constants
const PORT = 3000;
const HOST = '127.0.0.1';

// App
const app = express();
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Home page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/home.html'));
});

// All other 'endpoints' used
app.get('/:json_file_name', function(req, res) {
    const json_file_name = req.params.json_file_name;
    let json_to_send = json_access.getJSON(json_file_name);
    res.send(json_to_send);
});

app.post('/:json_file_name', function(req, res) {
    const json_file_name = req.params.json_file_name;
    const new_json = req.body;
    json_access.setJSON(json_file_name, new_json);
    res.send({'done':true});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);