// Type definitions extension for @storybook/addons 6.0.18
// Project: https://github.com/storybookjs/storybook/tree/next/lib/addons
// Definitions by: Martin Hochel
// Definitions: N/A
// TypeScript Version: 3.1

import { Parameters } from '@storybook/addons';

declare module '@storybook/addons' {
  // PUBLIC API - extended definitions
  export interface Parameters extends ParametersExtended {}

  // =====
  interface ParametersExtended {
    controls?: ControlsParameters & DisableControl;
  }

  interface ControlsParameters {
    sort?: 'alpha' | 'requiredFirst' | 'none';
    expanded?: boolean;
    presetColors?: Array<string | { color: string; title?: string }>;
    hideNoControlsWarning?: boolean;
  }

  type DisableControl = { disable?: boolean };
}
