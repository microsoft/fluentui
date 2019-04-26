'use strict';

const express = require('express');
const server = require('./server');
const app = express();

const serverOptions = {
  expressInstance: app,
  portNum: process.env.PORT || 3000,
  doListen: true
};

server.start(serverOptions);
