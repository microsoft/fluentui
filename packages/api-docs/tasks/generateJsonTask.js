// @ts-check
const fs = require('fs');
const path = require('path');

function generateJsonTask() {
  const configPath = path.join(process.cwd(), 'config/api-docs.js');
  if (fs.existsSync(configPath)) {
    const config = require(configPath);
    const generatePageJsonFiles = require('../lib/generatePageJsonFiles').generatePageJsonFiles;
    generatePageJsonFiles({ min: process.argv.includes('--production'), ...config });
  } else {
    console.log('Skipping page JSON generation because config not found');
  }
}

module.exports = generateJsonTask;
