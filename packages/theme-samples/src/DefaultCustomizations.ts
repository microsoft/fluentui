import { createTheme, ICustomizations } from 'office-ui-fabric-react';
import { addVariants } from './utilities';

export const DefaultCustomizations: ICustomizations = {
  settings: {
    theme: createTheme({})
  },
  scopedSettings: {}
};

addVariants(DefaultCustomizations.settings.theme);
