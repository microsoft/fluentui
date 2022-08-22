const fs = require('fs-extra');
const { getBrowsers } = require('../browsers');
const path = require('path');

const browsers = getBrowsers();
const testCases = ['mount', 'inject-styles', 'prop-update', 'add-node', 'remove-node'];

const browserData = {};
for (const browser of browsers) {
  browserData[browser] = {};
  for (const testCase of testCases) {
    const contents = fs.readFileSync(path.join(__dirname, 'results', `${browser}.${testCase}.results.json`), {
      encoding: 'utf8',
    });
    const json = JSON.parse(contents);

    browserData[browser][testCase] = json.benchmarks.map(test => {
      return {
        name: test.name,
        mean: test.mean,
        differences: test.differences,
        samples: test.samples,
      };
    });
  }
}

console.log(browserData);

const js = `
    export const data = ${JSON.stringify(browserData, null, 4)};
`;

fs.writeFileSync(path.join(__dirname, 'results', 'results.js'), js, { encoding: 'utf8' });
