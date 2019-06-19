import { Mdl2Theme } from './mdl2/Mdl2Theme';
import { Mdl2Styles } from './mdl2/Mdl2Styles';
import { ICustomizations } from 'office-ui-fabric-react';
import { addVariants } from '@uifabric/variants';

export const Mdl2Customizations: ICustomizations = {
  settings: {
    theme: { ...Mdl2Theme }
  },
  scopedSettings: { ...Mdl2Styles }
};

addVariants(Mdl2Customizations.settings.theme);
