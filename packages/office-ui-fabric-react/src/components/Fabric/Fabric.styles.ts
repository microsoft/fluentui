import { getGlobalClassNames } from '../../Styling';
import { IFabricStyleProps, IFabricStyles } from './Fabric.types';

const inheritFont = { fontFamily: 'inherit' };

const GlobalClassNames = {
  root: 'ms-Fabric',
  rootThemed: 'ms-Fabric-root-themed',
  bodyThemed: 'ms-Fabric-body-themed'
};

export interface IFabricClassNames {
  root: string;
  rootThemed: string;
  bodyThemed: string;
}

export const getStyles = (props: IFabricStyleProps): IFabricStyles => {
  const { theme, className, isFocusVisible } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const root = {
    textColor: theme.semanticColors.bodyText,
    backgroundColor: theme.semanticColors.bodyBackground
  };

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
      className
    ],
    rootThemed: [
      classNames.root,
      isFocusVisible && 'is-focusVisible ms-Fabric--isFocusVisible',
      theme.fonts.medium,
      {
        color: root.textColor,
        backgroundColor: root.backgroundColor,
        selectors: {
          '& button': inheritFont,
          '& input': inheritFont,
          '& textarea': inheritFont
        }
      },
      className
    ],
    bodyThemed: [
      classNames.bodyThemed,
      {
        backgroundColor: theme.semanticColors.bodyBackground
      }
    ]
  };
};
