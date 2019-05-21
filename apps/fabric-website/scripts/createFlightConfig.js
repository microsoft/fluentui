/*
  Creates a configuration JS file that exposes the build ID and base URL that the site should load.
 */

const fs = require('fs');
const path = require('path');
const { argv, logger } = require('@uifabric/build').just;

/**
 * A Task Function for Fabric Website that Generates a Manifest for Non-UHF "Internal" Site
 */
module.exports.createInternalFlightConfigTask = function() {
  return function() {
    let date = new Date();

    // Produces date string of the form yyyyMMdd, e.g. 20180701
    let today = date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + date.getDate()).slice(-2);

    let configsToGenerate = ['fabric-website-internal-prod-config', 'fabric-website-internal-df-config'];

    let configData = {
      version: process.env.BUILD_BUILDNUMBER || '0',
      baseCDNUrl: argv().baseCDNUrl,
      buildName: process.env.BUILD_DEFINITIONNAME || 'localbuild',
      createdDate: today
    };

    logger.info('config data:');
    logger.info(configData);

    configsToGenerate.forEach(fileName => {
      generateConfig(fileName, path.resolve(process.cwd(), 'flights'), configData);
    });
  };
};

/**
 * A Task Function for Fabric Website that Generates a Manifest for UHF Public Site
 */
module.exports.createPublicFlightConfigTask = function() {
  return function() {
    let date = new Date();

    // Produces date string of the form yyyyMMdd, e.g. 20180701
    let today = date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + date.getDate()).slice(-2);

    let configsToGenerate = ['fabric-website-prod', 'fabric-website-df'];

    let configData = {
      version: process.env.BUILD_BUILDNUMBER || '0',
      baseCDNUrl: argv().baseCDNUrl,
      buildName: process.env.BUILD_DEFINITIONNAME || 'localbuild',
      createdDate: today
    };

    logger.info('config data:');
    logger.info(configData);

    configsToGenerate.forEach(fileName => {
      generateConfig(fileName, path.resolve(process.cwd(), 'flights'), configData);
    });
  };
};

function generateConfig(fileName, outDir, configData) {
  try {
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir);
    }

    let configInitializationCode = `var Flight=${JSON.stringify(configData, null)};`;

    fs.writeFile(path.join(outDir, `${fileName}.js`), configInitializationCode, err => {
      if (err) {
        logger.error(`Error writing ${outDir}/${fileName}.js: `, err);
        return;
      } else {
        logger.info(`Wrote ${outDir}/${fileName}.js`);
      }
    });
  } catch (e) {
    logger.error('Error creating output folder', e);
  }
}

// let sampleConfig = {
//   "version": "fabric-website-internal_20180720.6",
//   "baseCDNUrl": "https://odspuxe.blob.core.windows.net/uifabric/fabric-website-internal_20180730.1",
//   "buildName": "fabric-website-internal-prod-release",
//   "createdDate": "20180701"
// };

// Run this to test pointing to a particular build
// set BUILD_ID=fabric-website-internal_20180720.6&& set FILE_NAME=fabric-website-internal-df-release&& set BASE_CDN_URL=https://odspuxe.blob.core.windows.net/uifabric/fabric-website-internal_20180730.1&& set BUILD_NAME=fabric-website-internal-prod-release&& node createFlightConfig.js
// npm run create-flight-config -- buildNumber=fabric-website-internal_20180720.6 baseCDNUrl=https://odspuxe.blob.core.windows.net/uifabric/fabric-website-internal_20180730.1 buildName=fabric-website-internal-prod-release
