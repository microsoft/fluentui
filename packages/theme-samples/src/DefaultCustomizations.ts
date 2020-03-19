import { createTheme, ICustomizations } from 'office-ui-fabric-react';
import { addVariants } from '@uifabric/variants';

export const DefaultCustomizations: ICustomizations = {
  settings: {
    theme: createTheme({}),
  },
  scopedSettings: {},
};

addVariants(DefaultCustomizations.settings.theme);
