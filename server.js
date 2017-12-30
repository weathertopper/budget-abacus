'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');

// Constants
const PORT = 3000;
const HOST = '127.0.0.1';

// App
const app = express();
app.use(express.static('public'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/home.html'));
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);