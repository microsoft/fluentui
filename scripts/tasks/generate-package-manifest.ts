import * as path from 'path';
import * as fs from 'fs';
import { getAllPackageInfo, findGitRoot } from '../monorepo/index';

export function generatePackageManifestTask() {
  const allPackageInfo = getAllPackageInfo();
  const root = findGitRoot();
  fs.writeFileSync(path.join(root, 'package-manifest.json'), JSON.stringify(allPackageInfo, null, 2));
}
