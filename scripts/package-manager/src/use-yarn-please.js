const { spawnSync } = require('node:child_process');
const { basename } = require('node:path');

const npmPath = process.env.npm_execpath;
const COMMAND_PREFIX = `\x1B[36m>\x1B[39m \x1B[7m\x1B[1m\x1B[36m PACKAGE MANAGER CHECKER \x1B[39m\x1B[22m\x1B[27m`;

const Strings = {
  useYarnInstead: `
- This repository uses Yarn as its package manager.
- Please install the latest version of Yarn@4 by enabling corepack: "corepack enable" or by running "npm install -g yarn"
- More information: https://yarnpkg.com/getting-started/install
`,
  installYarn: `You currently do not have an installation of Yarn in your PATH. Please install the latest version of Yarn@4 by enabling corepack: "corepack enable" or by running "npm install -g yarn".
More information: https://yarnpkg.com/getting-started/install
`,
};

function checkPackageManager() {
  console.log(COMMAND_PREFIX);
  console.log(`Checking existing package manager`);

  if (userInvokedNpmInstall()) {
    console.error(Strings.useYarnInstead);
    process.exit(1);
  }

  const yarnInfo = detectYarnInstallation();

  if (!yarnInfo.exists) {
    console.log(Strings.installYarn);
    process.exit(1);
  }

  console.log(`Package manager found - yarn v${yarnInfo.version} \n`);
}

function userInvokedNpmInstall() {
  if (!npmPath) {
    return false;
  }

  return basename(npmPath).includes('npm');
}

function detectYarnInstallation() {
  const yarnResult = spawnSync('yarn', ['--version'], { shell: true }); // Need to execute this in a shell for Windows:  https://nodejs.org/api/child_process.html#spawning-bat-and-cmd-files-on-windows
  return { exists: yarnResult.status === 0, version: yarnResult.stdout };
}

exports.checkPackageManager = checkPackageManager;
