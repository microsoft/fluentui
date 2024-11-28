import type { StorybookConfig } from '@storybook/react-webpack5';

// eslint-disable-next-line @nx/enforce-module-boundaries
import rootConfig from '../../../.storybook/main';

const config: StorybookConfig = {
  ...rootConfig,
  stories: [
    // docsite stories
    '../src/**/*.mdx',
    '../src/**/index.stories.@(js|jsx|ts|tsx)',
    // packages stories
    '../../../packages/charts/*/stories/**/index.stories.@(js|jsx|ts|tsx)',
  ],
};

export default config;
