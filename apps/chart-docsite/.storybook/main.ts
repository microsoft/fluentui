import type { StorybookConfig } from '@storybook/react-webpack5';

// eslint-disable-next-line @nx/enforce-module-boundaries
import rootConfig from '../../../.storybook/main';

const config = {
  ...rootConfig,
  build: {
    previewUrl: process.env.DEPLOY_PATH,
  },
  stories: [
    // docsite stories
    '../src/**/*.mdx',
    '../src/**/index.stories.@(js|jsx|ts|tsx)',
    // packages stories
    '../../../packages/charts/react-charts/stories/**/index.stories.@(js|jsx|ts|tsx)',
  ],
} satisfies StorybookConfig;

export default config;
