// @ts-check

const { parseArgs } = require('node:util');
const path = require('node:path');
const express = require('express');

main();

function main() {
  const argv = processArgs();

  const app = express();
  const port = argv.port;

  app.use(express.static(path.join(__dirname)));
  app.use('/lib', express.static(path.join(__dirname, '../lib')));

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

function processArgs() {
  const options = /** @type {const} */ ({
    port: {
      type: 'string',
      default: '6006',
    },
  });

  const { values } = parseArgs({ options, allowPositionals: false });

  return values;
}
