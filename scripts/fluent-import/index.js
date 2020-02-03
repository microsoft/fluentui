const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const findGitRoot = require('../monorepo/findGitRoot');
const { spawnSync } = require('child_process');

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fluent-import'));
console.log(`using temp dir: ${tmp}`);

function git(args, options) {
  args = args || [];
  options = { cwd: tmp, ...options };
  const results = spawnSync('git', args, options);
  if (results.error) {
    throw new Error(results.stderr.toString());
  }

  return results.stdout
    .toString()
    .split(/\n/)
    .filter(n => n);
}

function importFuiPackages(outputPath) {
  console.log('copying packages from /packages');
  for (let packageName of fs.readdirSync(path.join(tmp, 'packages'))) {
    const src = path.join(tmp, 'packages', packageName);
    const dest = path.join(outputPath, packageName);

    console.log(`copy ${src} --> ${dest}`);
    fs.copySync(src, dest, { overwrite: true, recursive: true });
  }
}

function importFuiTopLevelPackages(outputPath) {
  const topLevelPackages = ['docs', 'e2e', 'perf'];

  console.log('copying top level packages from /packages');
  for (let packageName of topLevelPackages) {
    const src = path.join(tmp, packageName);
    const dest = path.join(outputPath, packageName);

    console.log(`copy ${src} --> ${dest}`);
    fs.copySync(src, dest, { overwrite: true, recursive: true });
  }
}

function importFluent() {
  console.log('cloning FUI');
  git(['clone', '--depth=1', 'https://github.com/microsoft/fluent-ui-react.git', '.']);

  const root = findGitRoot();
  const outputPath = path.join(root, 'packages/fluentui');
  fs.mkdirpSync(outputPath);

  importFuiPackages(outputPath);
  importFuiTopLevelPackages(outputPath);

  console.log('removing tmp');
  fs.removeSync(tmp);
}

importFluent();
