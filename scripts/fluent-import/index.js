const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const findGitRoot = require('../monorepo/findGitRoot');
const { spawnSync } = require('child_process');
const glob = require('glob');

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

function importGithubMD(root) {
  const mdFiles = [
    '.github/CONTRIBUTING.md',
    '.github/setup-local-development.md',
    '.github/add-a-feature.md',
    '.github/document-a-feature.md',
    '.github/test-a-feature.md'
  ];
  for (let mdFile of mdFiles) {
    if (mdFile.endsWith('.md')) {
      const src = path.join(tmp, mdFile);
      const dest = path.join(root, mdFile);
      fs.copyFileSync(src, dest);
    }
  }
}

function rewriteImports(outputPath) {
  const files = glob.sync('**/*.+(js|ts|json)', { cwd: outputPath });

  for (let file of files) {
    const fullPath = path.join(outputPath, file);
    const content = fs.readFileSync(fullPath, 'utf-8');
    if (content.includes('@fluentui/internal-tooling')) {
      console.log(`patching up ${fullPath}`);
      fs.writeFileSync(fullPath, content.replace('@fluentui/internal-tooling', '@uifabric/build'));
    }
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
  importGithubMD(root);

  rewriteImports(outputPath);

  console.log('removing tmp');
  fs.removeSync(tmp);
}

importFluent();
