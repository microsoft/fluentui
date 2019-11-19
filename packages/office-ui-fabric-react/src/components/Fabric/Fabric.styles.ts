import { getGlobalClassNames } from '../../Styling';
import { IFabricStyleProps, IFabricStyles } from './Fabric.types';

const inheritFont = { fontFamily: 'inherit' };

const GlobalClassNames = {
  root: 'ms-Fabric',
  bodyThemed: 'ms-Fabric-bodyThemed'
};

export interface IFabricClassNames {
  root: string;
  bodyThemed: string;
}

export const getStyles = (props: IFabricStyleProps): IFabricStyles => {
  const { theme, className, isFocusVisible, applyTheme } = props;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);
  return {
    root: [
      classNames.root,
      isFocusVisible && 'is-focusVisible ms-Fabric--isFocusVisible',
      theme.fonts.medium,
      {
        color: theme.palette.neutralPrimary,
        selectors: {
          '& button': inheritFont,
          '& input': inheritFont,
          '& textarea': inheritFont
        }
      },
      // apply theme to only if applyTheme is true
      applyTheme && {
        color: theme.semanticColors.bodyText,
        backgroundColor: theme.semanticColors.bodyBackground
      },
      className
    ],
    bodyThemed: [
      {
        backgroundColor: theme.semanticColors.bodyBackground
      }
    ]
  };
};
