import { MDL2Theme } from './mdl2/MDL2Theme';
import { ICustomizations } from 'office-ui-fabric-react';
import { addVariants } from '@uifabric/variants';

const { components: scopedSettings, ...theme } = MDL2Theme;

export const MDL2Customizations: ICustomizations = {
  settings: {
    theme,
  },
  scopedSettings: { ...scopedSettings },
};

addVariants(MDL2Customizations.settings.theme);
