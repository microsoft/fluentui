import type { StorybookConfig as StorybookBaseConfig } from '@storybook/react-webpack5';

export type StorybookConfig = StorybookBaseConfig &
  Required<Pick<StorybookBaseConfig, 'stories' | 'addons' | 'webpackFinal'>>;
