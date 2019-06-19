import { FluentTheme } from './mdl2/Mdl2Theme';
import { FluentStyles } from './mdl2/Mdl2Styles';
import { ICustomizations } from 'office-ui-fabric-react';
import { addVariants } from '@uifabric/variants';

export const Mdl2Customizations: ICustomizations = {
  settings: {
    theme: { ...FluentTheme }
  },
  scopedSettings: { ...FluentStyles }
};

addVariants(Mdl2Customizations.settings.theme);
