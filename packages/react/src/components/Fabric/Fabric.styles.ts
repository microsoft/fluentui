import { getGlobalClassNames } from '../../Styling';
import type { IFabricStyleProps, IFabricStyles } from './Fabric.types';

const inheritFont = { fontFamily: 'inherit' };

const GlobalClassNames = {
  root: 'ms-Fabric',
  bodyThemed: 'ms-Fabric-bodyThemed',
};

export interface IFabricClassNames {
  root: string;
  bodyThemed: string;
}

export const getStyles = (props: IFabricStyleProps): IFabricStyles => {
  const { applyTheme, className, preventBlanketFontInheritance, theme } = props;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);
  return {
    root: [
      classNames.root,
      theme.fonts.medium,
      {
        color: theme.palette.neutralPrimary,
      },
      !preventBlanketFontInheritance && {
        '& button': inheritFont,
        '& input': inheritFont,
        '& textarea': inheritFont,
      },
      // apply theme to only if applyTheme is true
      applyTheme && {
        color: theme.semanticColors.bodyText,
        backgroundColor: theme.semanticColors.bodyBackground,
      },
      className,
    ],
    bodyThemed: [
      {
        backgroundColor: theme.semanticColors.bodyBackground,
      },
    ],
  };
};
