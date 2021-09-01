import * as path from 'path';
import * as glob from 'glob';

import { findGitRoot, getAllPackageInfo } from '../monorepo/index';

const gitRoot = findGitRoot();
const packages = Object.values(getAllPackageInfo()).filter(pkg => pkg.packageJson.version[0] === '9');

function run() {
  const packageNames = packages.map(pkg => path.basename(pkg.packageJson.name));
  const typesFiles = glob
    .sync(path.join(gitRoot, 'packages', `{${packageNames.join(',')}}/src/**/*.{ts,tsx}`))
    .filter(file => /\/components\/([A-Z]\w+)\/\1\.types\.tsx?$/.test(path.posix.normalize(file)));
  console.log(typesFiles.join('\n'));
}

run();
