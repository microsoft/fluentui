const fs = require('fs-extra');
const path = require('path');

const topLevelDep = path.join(__dirname, '../packages/prettier-rules/node_modules/.just');

if (fs.pathExistsSync(topLevelDep)) {
  fs.removeSync(topLevelDep);
}
