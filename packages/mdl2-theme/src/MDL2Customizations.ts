import { MDL2Theme } from './mdl2/MDL2Theme';
import { MDL2Styles } from './mdl2/MDL2Styles';
import { ICustomizations } from 'office-ui-fabric-react';
import { addVariants } from '@uifabric/variants';

export const MDL2Customizations: ICustomizations = {
  settings: {
    theme: { ...MDL2Theme }
  },
  scopedSettings: { ...MDL2Styles }
};

addVariants(MDL2Customizations.settings.theme);
