import { TsConfig } from '../../../types';

export const e2e = {
  tsconfig: {
    extends: '../tsconfig.json',
    compilerOptions: {
      isolatedModules: false,
      types: ['node', 'cypress', 'cypress-storybook/cypress', 'cypress-real-events'],
      lib: ['ES2019', 'dom'],
    },
    include: ['**/*.ts'],
  } as TsConfig,
};
