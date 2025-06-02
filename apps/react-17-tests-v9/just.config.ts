import { join } from 'node:path';
import { preset, task, typeCheckWithConfigOverride } from '@fluentui/scripts-tasks';

import { getNodeModulesPath } from './config/utils';

preset();

const usedNodeModulesPath = getNodeModulesPath();

task('type-check', () =>
  typeCheckWithConfigOverride(config => {
    return {
      ...config,
      compilerOptions: {
        ...config.compilerOptions,
        typeRoots: [join(usedNodeModulesPath, './@types')],
        paths: {
          react: [join(usedNodeModulesPath, './@types/react/index.d.ts')],
          'react-dom': [join(usedNodeModulesPath, './@types/react-dom/index.d.ts')],
        },
      },
    };
  }),
);
