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
    name: 'Textfield',
    url: '#/examples/textfield'
  }
];

components.forEach(component => {
  getSarifReport(component.url).then(report => {
    mkdirp.sync(path.join(__dirname, '../dist/reports/'));
    fs.writeFileSync(path.join(__dirname, `../dist/reports/${component.name}.sarif`), JSON.stringify(report), { encoding: 'utf8' });
  });
});
