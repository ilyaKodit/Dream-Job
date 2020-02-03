
const express = require('express');
const http = require('http');
const path = require('path');
require('dotenv').config();
const app = require('./app');

const publicPath = path.join(__dirname, '..', 'build');
app.use(express.static(publicPath))
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
