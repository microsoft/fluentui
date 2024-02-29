const project = (() => {
  try {
    const { configureProjects } = require('react-native-test-app');
    return configureProjects({
      android: {
        sourceDir: 'android',
      },
      ios: {
        sourceDir: 'ios',
      },
      windows: {
        sourceDir: 'windows',
        solutionFile: 'windows/xplat.sln',
      },
    });
  } catch (_) {
    return undefined;
  }
})();

module.exports = {
  ...(project ? { project } : undefined),
  commands: [
    {
      name: 'xplat-run-windows',
      description: 'Builds your app and starts it on a connected Windows desktop, emulator or device',
      options: [
        {
          name: '--sln [string]',
          description: "Override the app solution file determined by 'react-native config', e.g. windows/myApp.sln",
          default: 'windows/xplat.sln',
        },
      ],
      func: (_argv, _config, args) => {
        const { spawnSync } = require('node:child_process');
        const fs = require('node:fs');

        const options = { stdio: 'inherit' };
        const npx = (...args) => {
          const { error, exitCode } = spawnSync('npx.cmd', args, options);
          if (exitCode !== 0) {
            throw error ?? new Error(`Failed to run 'npx ${args.join(' ')}'`);
          }
        };

        if (!fs.existsSync(args.sln)) {
          npx('install-windows-test-app');
        }

        npx('react-native', 'run-windows', '--sln', args.sln);
      },
    },
  ],
};
