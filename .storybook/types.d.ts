import type { StorybookConfig as StorybookBaseConfig } from '@storybook/core-common';

export type { StorybookBaseConfig };
export type StorybookExtraConfig = {
  babel?: (options: Record<string, unknown>) => Promise<Record<string, unknown>>;
  previewHead?: (head: string) => string;
};

export type StorybookConfig = StorybookBaseConfig &
  Required<Pick<StorybookBaseConfig, 'stories' | 'addons' | 'webpackFinal'>> &
  StorybookExtraConfig;
