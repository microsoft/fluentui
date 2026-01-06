import type { StorybookConfig as StorybookBaseConfig } from '@storybook/react-webpack5';

export type StorybookConfig = Omit<StorybookBaseConfig, 'stories' | 'addons' | 'webpackFinal'> & {
  stories: NonNullable<Exclude<StorybookBaseConfig['stories'], Function>>;
  addons: NonNullable<Exclude<StorybookBaseConfig['addons'], Function>>;
  webpackFinal: NonNullable<StorybookBaseConfig['webpackFinal']>;
};
