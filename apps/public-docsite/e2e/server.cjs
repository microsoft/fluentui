// @ts-check
'use strict';

const { existsSync } = require('node:fs');
const path = require('node:path');
const { parseArgs } = require('node:util');
const express = require('express');

const { values } = parseArgs({ options: { port: { type: 'string' } } });
const port = Number(values.port);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('Pass a valid --port for the built docsite server.');
}

const root = path.resolve(__dirname, '../dist');
if (!existsSync(path.join(root, 'index.html'))) {
  throw new Error('Built docsite is missing. Run yarn nx run public-docsite:bundle first.');
}

const app = express();
app.use(express.static(root));
app.listen(port, '127.0.0.1', () => {
  console.log(`Built docsite listening at http://127.0.0.1:${port}`);
});
