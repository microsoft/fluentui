import { createTheme, ICustomizations } from '@fluentui/react';
import { addVariants } from '@fluentui/scheme-utilities';

export const DefaultTheme = createTheme();
addVariants(DefaultTheme);

export const DefaultCustomizations: ICustomizations = {
  settings: {
    theme: DefaultTheme,
  },
  scopedSettings: {},
};
