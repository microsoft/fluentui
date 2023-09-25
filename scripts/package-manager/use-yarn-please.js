const path = require('path');
const { spawnSync } = require('child_process');

const npmPath = process.env.npm_execpath;
const COMMAND_PREFIX = `\x1B[36m>\x1B[39m \x1B[7m\x1B[1m\x1B[36m PACKAGE MANAGER CHECKER \x1B[39m\x1B[22m\x1B[27m`;

const Strings = {
  useYarnInstead: `
- 🚨 Looks like you are trying to run "npm install". This repository has migrated to use Yarn as its package manager.
- 📜 Please install the latest stable version of Yarn@1 following the instructions at https://classic.yarnpkg.com/en/docs/install or by running "npm install -g yarn@1
`,
  installYarn: `You currently do not have an installation of Yarn in your PATH. Please install the latest stable version of Yarn@1 following the instructions at https://classic.yarnpkg.com/en/docs/install or by running "npm install -g yarn@1".
`,
};

main();

function main() {
  console.log(COMMAND_PREFIX);
  console.log(`⌛️ checking existing package manager`);

  if (userInvokedNpmInstall()) {
    console.error(Strings.useYarnInstead);
    process.exit(1);
  }

  const yarnInfo = detectYarnInstallation();

  if (!yarnInfo.exists) {
    console.log(Strings.installYarn);
    process.exit(1);
  }

  console.log(`✅ package manager Yarn found v.${yarnInfo.version} \n`);
}

function userInvokedNpmInstall() {
  if (!npmPath) {
    return false;
  }

  return path.basename(npmPath).includes('npm');
}

function detectYarnInstallation() {
  const yarnResult = spawnSync('yarn', ['--version'], { shell: true }); // Need to execute this in a shell for Windows:  https://nodejs.org/api/child_process.html#spawning-bat-and-cmd-files-on-windows
  return { exists: yarnResult.status === 0, version: yarnResult.stdout };
}
