/** @prettier */
// @ts-check
/// <reference types="node"/>

/*
  Creates a configuration JS file that exposes the build ID and base URL that the site should load.
 */

const fs = require('fs');
const path = require('path');

const args = process.argv;
const baseCDNUrlIndex = process.argv.indexOf('--baseCDNUrl');
const baseCDNUrl = baseCDNUrlIndex === -1 ? undefined : process.argv[baseCDNUrlIndex + 1];
if (!baseCDNUrl) {
  console.error('Must specify --baseCDNUrl argument');
  process.exit(1);
}

let date = new Date();

// Produces date string of the form yyyyMMdd, e.g. 20180701
let today = date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + date.getDate()).slice(-2);

let configsToGenerate = ['fabric-website-v5-prod', 'fabric-website-v5-df'];

let configData = {
  version: process.env.BUILD_BUILDNUMBER || '0',
  baseCDNUrl: baseCDNUrl,
  buildName: process.env.BUILD_DEFINITIONNAME || 'localbuild',
  createdDate: today
};

console.log('config data:');
console.log(configData);

configsToGenerate.forEach(fileName => {
  generateConfig(fileName, path.resolve(process.cwd(), 'flights'), configData);
});

function generateConfig(fileName, outDir, configData) {
  try {
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir);
    }

    let configInitializationCode = `var Flight=${JSON.stringify(configData, null)};`;

    fs.writeFile(path.join(outDir, `${fileName}.js`), configInitializationCode, err => {
      if (err) {
        console.error(`Error writing ${outDir}/${fileName}.js: `, err);
        process.exit(1);
      } else {
        console.log(`Wrote ${outDir}/${fileName}.js`);
      }
    });
  } catch (e) {
    console.error('Error creating output folder', e);
    process.exit(1);
  }
}
