const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const glob = require('glob');

const generateOnly = process.argv.indexOf('-g') > -1;

function run(cmd) {
  return execSync(cmd, { cwd: path.resolve(__dirname, '..') }).toString();
}

let modified = [];

if (!generateOnly) {
  // Check that no uncommitted changes exist
  let status = run('git status -s');
  if (status) {
    console.log('Repository needs to contain no changes for version generation to proceed.');
    process.exit();
  }

  // Do a dry-run on all packages
  run('rush publish -a');
  status = run('git status --porcelain=1');
  modified = status
    .split(/\n/g)
    .map(line => line && '"' + line.trim().split(/\s/)[1] + '"')
    .filter(item => item);
}

const packageJsons = glob.sync('+(packages|apps)/*/package.json');
packageJsons.forEach(packageJsonPath => {
  const versionFile = path.join(path.dirname(packageJsonPath), 'src/version.ts');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());
  let shouldGenerate = true;

  if (!fs.existsSync(path.dirname(versionFile)) || packageJsonPath.indexOf('set-version') > -1) {
    return;
  }

  if (fs.existsSync(versionFile) && process.argv.indexOf('-f') < 0) {
    const originVersionFileContent = fs.readFileSync(versionFile).toString();
    shouldGenerate = originVersionFileContent.indexOf(`${packageJson.name}@${packageJson.version}`) < 0;
  }

  if (shouldGenerate) {
    console.log(`generating ${versionFile}`);

    fs.writeFileSync(
      versionFile,
      `// ${packageJson.name}@${packageJson.version}
// Do not modify this file, the file is generated as part of publish. The checked in version is a placeholder only.
import { setVersion } from '@uifabric/set-version';
setVersion('${packageJson.name}', '${packageJson.version}');`
    );
  }
});

if (!generateOnly) {
  // Undo the dry-run changes, preserve the version file changes
  console.log(`reset ${modified.join(' ')}`);
  run(`git checkout ${modified.join(' ')}`);
}
