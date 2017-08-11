/*jslint node: true */
'use strict';

const express = require('express');
const path = require('path');

// Constants
const PORT = 8080;

// App
const app = express();
app.use(express.static('dist'));
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
