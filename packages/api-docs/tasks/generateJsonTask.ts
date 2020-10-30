import * as fs from 'fs';
import * as path from 'path';

export function generateJsonTask() {
  const configPath = path.join(process.cwd(), 'config/api-docs.js');
  if (fs.existsSync(configPath)) {
    const config = require(configPath);
    const generatePageJsonFiles = require('../lib/generatePageJsonFiles').generatePageJsonFiles;
    generatePageJsonFiles({ min: process.argv.includes('--production'), ...config });
  } else {
    console.log('Skipping page JSON generation because config not found');
  }
}
