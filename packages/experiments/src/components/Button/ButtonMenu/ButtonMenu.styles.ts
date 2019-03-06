import { getGlobalClassNames } from '../../../Styling';
import { IButtonMenuComponent, IButtonMenuStylesReturnType } from './ButtonMenu.types';

const GlobalClassNames = {
  root: 'ms-ButtonMenu'
};

export const ButtonMenuStyles: IButtonMenuComponent['styles'] = (props, theme): IButtonMenuStylesReturnType => {
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [theme.fonts.medium, classNames.root]
  };
};
