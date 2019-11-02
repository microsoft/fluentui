// @ts-check
const fs = require('fs');
const path = require('path');
const {
  just: { argv }
} = require('@uifabric/build');

function generateJsonTask() {
  const configPath = path.join(process.cwd(), 'config/api-docs.js');
  if (fs.existsSync(configPath)) {
    const config = require(configPath);
    const generatePageJsonFiles = require('../lib/generatePageJsonFiles').generatePageJsonFiles;
    generatePageJsonFiles({ min: !!argv().production, ...config });
  } else {
    console.log('Skipping page JSON generation because config not found');
  }
}

module.exports = generateJsonTask;
