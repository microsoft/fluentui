import { concatStyleSets, HighContrastSelector } from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import { getStyles as getBaseButtonStyles } from '../BaseButton.styles';
import { getStyles as getSplitButtonStyles } from '../SplitButton/SplitButton.styles';
import type { IButtonStyles } from '../Button.types';
import type { ITheme } from '../../../Styling';

export const getStyles = memoizeFunction((theme: ITheme, customStyles?: IButtonStyles): IButtonStyles => {
  const baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);
  const splitButtonStyles: IButtonStyles = getSplitButtonStyles(theme);
  const { palette, semanticColors } = theme;
  const iconButtonStyles: IButtonStyles = {
    root: {
      padding: '0 4px',
      width: '32px',
      height: '32px',
      backgroundColor: 'transparent',
      border: 'none',
      color: semanticColors.link,
    },

    rootHovered: {
      color: palette.themeDarkAlt,
      backgroundColor: palette.neutralLighter,
      [HighContrastSelector]: {
        borderColor: 'Highlight',
        color: 'Highlight',
      },
    },

    rootHasMenu: {
      width: 'auto',
    },

    rootPressed: {
      color: palette.themeDark,
      backgroundColor: palette.neutralLight,
    },

    rootExpanded: {
      color: palette.themeDark,
      backgroundColor: palette.neutralLight,
    },

    rootChecked: {
      color: palette.themeDark,
      backgroundColor: palette.neutralLight,
    },

    rootCheckedHovered: {
      color: palette.themeDark,
      backgroundColor: palette.neutralQuaternaryAlt,
    },

    rootDisabled: {
      color: palette.neutralTertiaryAlt,
    },
  };

  return concatStyleSets(baseButtonStyles, iconButtonStyles, splitButtonStyles, customStyles)!;
});
