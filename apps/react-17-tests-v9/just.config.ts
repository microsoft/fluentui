import { preset, task, typeCheckWithConfigOverride } from '@fluentui/scripts-tasks';

preset();

task('type-check', () =>
  typeCheckWithConfigOverride(config => {
    return {
      ...config,
      compilerOptions: {
        ...config.compilerOptions,
        typeRoots: ['./node_modules/@types'],
        paths: {
          react: ['./node_modules/@types/react/index.d.ts'],
          'react-dom': ['./node_modules/@types/react-dom/index.d.ts'],
        },
      },
    };
  }),
);
