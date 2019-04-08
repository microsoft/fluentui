// @ts-check

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const { getSarifReport } = require('../lib/getSarifReport');

const components = [
  {
    name: 'Button',
    url: '#/examples/button'
  },
  {
    name: 'TextField',
    url: '#/examples/textfield'
  }
];

components.forEach(async component => {
  try {
    const report = await getSarifReport(component.url);
    mkdirp.sync(path.resolve(__dirname, '../dist/reports/'));
    fs.writeFileSync(path.resolve(__dirname, `../dist/reports/${component.name}.sarif`), JSON.stringify(report), { encoding: 'utf8' });
  } catch (e) {
    console.error(`Error while generating SARIF report for ${component.name}: ${e}`);
  }
});
