import { createTheme } from '@fluentui/react';
import { addVariants } from '@fluentui/scheme-utilities';
import type { ICustomizations } from '@fluentui/react';

export const DefaultTheme = createTheme();
addVariants(DefaultTheme);

export const DefaultCustomizations: ICustomizations = {
  settings: {
    theme: DefaultTheme,
  },
  scopedSettings: {},
};
