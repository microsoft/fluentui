const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const { getSarifReport } = require('../lib/getSarifReport');

getSarifReport('#/examples/button').then(report => {
  mkdirp.sync(path.join(__dirname, '../dist/reports/'));
  fs.writeFileSync(path.join(__dirname, '../dist/reports/Button.sarif'), JSON.stringify(report), { encoding: 'utf8' });
});
