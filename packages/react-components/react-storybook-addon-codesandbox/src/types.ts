import type { StoryContext as StoryContextOrigin, Parameters } from '@storybook/addons';

export interface ParametersConfig {
  optionalDependencies?: Record<string, string>;
  requiredDependencies?: Record<string, string>;
  provider: 'codesandbox-cloud' | 'codesandbox-browser' | 'stackblitz-cloud';
  bundler: 'vite' | 'cra';
}

export interface ParametersExtension {
  exportToSandbox?: ParametersConfig;
}

export interface StoryContext extends StoryContextOrigin {
  parameters: Parameters & ParametersExtension;
}
