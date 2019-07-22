const path = require('path');
const fs = require('fs');
const getAllPackageInfo = require('../monorepo/getAllPackageInfo');
const findGitRoot = require('../monorepo/findGitRoot');

module.exports = function generatePackageManifestTask() {
  const allPackageInfo = getAllPackageInfo();
  const root = findGitRoot();
  fs.writeFileSync(path.join(root, 'package-manifest.json'), JSON.stringify(allPackageInfo, null, 2));
};
