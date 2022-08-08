const fs = require('fs-extra');
const { getBrowsers } = require('../browsers');
const path = require('path');

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
                "url": "http://localhost:8080/v8/simple-stress/?test=${testCase}&numStartNodes=1000&numAddNodes=1000&numRemoveNodes=999"
              },
              {
                "name": "v9 - ${testCase}",
                "url": "http://localhost:8080/v9/simple-stress/?test=${testCase}&numStartNodes=1000&numAddNodes=1000&numRemoveNodes=999"
              },
              {
                "name": "wc - ${testCase}",
                "url": "http://localhost:8080/wc/simple-stress/?test=${testCase}&numStartNodes=1000&numAddNodes=1000&numRemoveNodes=999"
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
