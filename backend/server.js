
// const express = require('express');
const http = require('http');
// const path = require('path');
require('dotenv').config();
const app = require('./app');

const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
