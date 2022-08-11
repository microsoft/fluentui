const fs = require('fs-extra');
const { getBrowsers } = require('../browsers');
const path = require('path');
const yargs = require('yargs');

const options = yargs
  .options({
    size: {
      alias: 's',
      describe: 'Number of components to use in the test',
      default: 100,
    },
    'add-nodes': {
      alias: 'a',
      describe: 'Number of components to add in the test',
    },
    'remove-nodes': {
      alias: 'r',
      describe: 'Number of components to remove in the test',
    },
  })
  .parse();

if (!options.addNodes) {
  options.addNodes = options.size;
}

if (!options.removeNodes) {
  options.removeNodes = options.size - 1;
}

const makeConfigJson = (browser, testCase, sampleSize = 25) => {
  const json = `
    {
        "$schema": "https://raw.githubusercontent.com/Polymer/tachometer/master/config.schema.json",
        "sampleSize": ${sampleSize},
        "timeout": 0,
        "benchmarks": [
          {
            "browser": {
              "name": "${browser}"
            },
            "measurement": [
              {
                "mode": "performance",
                "entryName": "stress"
              }
            ],
            "expand": [
              {
                "name": "v8 - ${testCase}",
                "url": "http://localhost:8080/v8/simple-stress/?test=${testCase}&numStartNodes=${options.size}&numAddNodes=${options.addNodes}&numRemoveNodes=${options.removeNodes}"
              },
              {
                "name": "v9 - ${testCase}",
                "url": "http://localhost:8080/v9/simple-stress/?test=${testCase}&numStartNodes=${options.size}&numAddNodes=${options.addNodes}&numRemoveNodes=${options.removeNodes}"
              },
              {
                "name": "wc - ${testCase}",
                "url": "http://localhost:8080/wc/simple-stress/?test=${testCase}&numStartNodes=${options.size}&numAddNodes=${options.addNodes}&numRemoveNodes=${options.removeNodes}"
              }
            ]
          }
        ]
      }
    `;

  return json;
};

const browsers = getBrowsers();
const testCases = ['mount', 'inject-styles', 'prop-update', 'add-node', 'remove-node'];

fs.mkdirpSync(path.join(__dirname, 'config'));
fs.mkdirpSync(path.join(__dirname, 'results'));

for (const browser of browsers) {
  for (const testCase of testCases) {
    const json = makeConfigJson(browser, testCase);
    fs.writeFileSync(path.join(__dirname, 'config', [browser, testCase, 'json'].join('.')), json, { encoding: 'utf8' });
  }
}
