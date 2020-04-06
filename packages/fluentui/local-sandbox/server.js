const express = require('express');
const path = require('path');

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;
const root = path.resolve(__dirname, '.');

const app = express();
app.use(express.static(`${root}/dist`));

app.listen(port, host, serverStarted);

function serverStarted() {
  console.log(`Server started ${host}:${port}`);
  console.log('Press Ctrl+C to exit...\n');
}
