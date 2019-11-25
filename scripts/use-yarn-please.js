const path = require('path');
const { spawnSync } = require('child_process');
const npmPath = process.env.npm_execpath;

const Strings = {
  useYarnInstead: `Looks like you are trying to run "npm install". This repository has migrated to use Yarn as its package manager.
`,
  yarnDetected: `Great! Looks like you already have yarn installed!
`,
  installYarn: `You currently do not have an installation of Yarn in your PATH. Please install the latest stable version of Yarn following the instructions at https://yarnpkg.com/en/docs/install or by running "npm install -g yarn".
`,
  gettingStartedWithYarn: `To install UI Fabric monorepo dependencies and establish links between projects, simply run:

  yarn

You can then build the packages:

  yarn build

Or start a development inner loop against the UI Fabric demo:

  yarn builddemo && yarn start

To learn more about all the commands that this monorepo supports, see the wiki:

  https://github.com/OfficeDev/office-ui-fabric-react/wiki/Build-Commands
`
};

if (path.basename(npmPath) !== 'yarn.js') {
  console.error(Strings.useYarnInstead);

  if (!detectYarnInstallation()) {
    console.log(Strings.installYarn);
  } else {
    console.log(Strings.yarnDetected);
  }

  console.log(Strings.gettingStartedWithYarn);

  process.exit(1);
}

function detectYarnInstallation() {
  const yarnResult = spawnSync('yarn', ['--version']);
  return yarnResult.status === 0;
}
