const { spawnSync } = require('child_process');
const path = require('path');

if (!process.env.TF_BUILD && !process.env.UIFABRIC_NO_POSTINSTALL) {
  spawnSync(process.execPath, [path.join(__dirname, 'monorepo/buildTo.js'), '@uifabric/fabric-website-resources', '--min'], {
    stdio: 'inherit'
  });
}
