import { createTheme, ICustomizations } from 'office-ui-fabric-react';
import { addVariants } from '@uifabric/variants';

export const DefaultTheme = createTheme();
addVariants(DefaultTheme);

export const DefaultCustomizations: ICustomizations = {
  settings: {
    theme: DefaultTheme,
  },
  scopedSettings: {},
};
