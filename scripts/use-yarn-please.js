const path = require('path');
const { spawnSync } = require('child_process');
const npmPath = process.env.npm_execpath;

const Strings = {
  useYarnInstead: `Looks like you are trying to run "npm install", this repository has migrated to use Yarn as its package manager for installations.`,
  installYarn: `You current do not have an installation of Yarn in your PATH. Be sure to install the latest stable version of Yarn here:

Download an installer here: https://yarnpkg.com/en/docs/install

Windows users can run the installer here:

  https://yarnpkg.com/latest.msi

Mac users can run a one-liner for the install:

  curl -o- -L https://yarnpkg.com/install.sh | bash

`,
  gettingStartedWithYarn: `
To install UI Fabric monorepo dependencies and establish links between projects, simply run:

  yarn

You can then build the packages

  yarn build

Or start developing innerloop against the UI Fabric demo with this command

  yarn start

To read more about all the commands that this mono-repo supports, go to this link:

  https://github.com/OfficeDev/office-ui-fabric-react/wiki/Build-Commands

`
};

if (path.basename(npmPath) !== 'yarn.js') {
  console.error(Strings.useYarnInstead);

  if (!detectYarnInstallation()) {
    console.log(Strings.installYarn);
  }

  console.log(Strings.gettingStartedWithYarn);

  process.exit(1);
}

function detectYarnInstallation() {
  const yarnResult = spawnSync('yarn', ['--version']);
  return yarnResult.status === 0;
}
