const { spawnSync } = require('child_process');
const path = require('path');

// git v2.9.0 supports a custom hooks directory. This means we just need to checkin the hooks scripts
spawnSync('git', ['config', 'core.hooksPath', '.githooks']);

if (!process.env.TF_BUILD && !process.env.UIFABRIC_NO_POSTINSTALL) {
  spawnSync(process.execPath, [path.join(__dirname, 'monorepo/buildTo.js'), '@uifabric/fabric-website-resources', '--min'], {
    stdio: 'inherit'
  });
}
