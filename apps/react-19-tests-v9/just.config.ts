import { join } from 'node:path';
import { preset, task, typeCheckWithConfigOverride } from '@fluentui/scripts-tasks';

// use commonjs for interop and to silence tsc
const { getNodeModulesPath } = require('./config/utils');

preset();

const { usedNodeModulesPath } = getNodeModulesPath();

task('type-check', () =>
  typeCheckWithConfigOverride(config => {
    return {
      ...config,
      compilerOptions: {
        ...config.compilerOptions,
        typeRoots: [join(usedNodeModulesPath, './@types')],
        paths: {
          'react/jsx-runtime': [join(usedNodeModulesPath, './@types/react/jsx-runtime.d.ts')],
          react: [join(usedNodeModulesPath, './@types/react/index.d.ts')],
          'react-dom': [join(usedNodeModulesPath, './@types/react-dom/index.d.ts')],
        },
      },
    };
  }),
);
