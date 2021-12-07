import { stripIndents } from '@nrwl/devkit';
import { TsConfig } from '../../../types';

export const storybook = {
  main: stripIndents`
    const rootMain = require('../../../.storybook/main');

    module.exports = /** @type {Omit<import('../../../.storybook/main'), 'typescript'|'babel'>} */ ({
      ...rootMain,
      stories: [...rootMain.stories, '../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx)'],
      addons: [...rootMain.addons],
      webpackFinal: (config, options) => {
        const localConfig = { ...rootMain.webpackFinal(config, options) };

        // add your own webpack tweaks if needed

        return localConfig;
      },
    });
  `,
  preview: stripIndents`
    import * as rootPreview from '../../../.storybook/preview';

    /** @type {typeof rootPreview.decorators} */
    export const decorators = [...rootPreview.decorators];

    /** @type {typeof rootPreview.parameters} */
    export const parameters = { ...rootPreview.parameters };
  `,
  tsconfig: {
    extends: '../tsconfig.json',
    compilerOptions: {
      outDir: '',
      allowJs: true,
      checkJs: true,
    },
    include: ['../src/**/*.stories.ts', '../src/**/*.stories.tsx', '*.js'],
  } as TsConfig,
};
