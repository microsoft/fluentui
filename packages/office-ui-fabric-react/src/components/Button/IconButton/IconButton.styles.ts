import { IButtonStyles } from '../Button.types';
import {
  ITheme,
  concatStyleSets
} from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import {
  getStyles as getBaseButtonStyles
} from '../BaseButton.styles';
import {
  getStyles as getSplitButtonStyles
} from '../SplitButton/SplitButton.styles';
import { primaryStyles } from '../ButtonThemes';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: IButtonStyles,
  primary: boolean = false
): IButtonStyles => {
  const baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);
  const splitButtonStyles: IButtonStyles = getSplitButtonStyles(theme);
  const { palette, semanticColors } = theme;
  const iconButtonStyles: IButtonStyles = {
    root: {
      padding: '0 4px',
      width: '32px',
      height: '32px',
      backgroundColor: 'transparent'
    },

    rootHovered: {
      color: palette.themeDarker,
      backgroundColor: semanticColors.buttonBackground,
    },

    rootPressed: {
      color: palette.themePrimary,
      backgroundColor: semanticColors.buttonBackgroundHovered,
    },

    rootExpanded: {
      color: palette.themePrimary
    },

    rootChecked: {
      backgroundColor: semanticColors.buttonBackgroundChecked,
    },

    rootCheckedHovered: {
      backgroundColor: semanticColors.buttonBackgroundHovered,
    },

    rootDisabled: {
      color: semanticColors.disabledText,
    }
  };

  return concatStyleSets(
    baseButtonStyles,
    iconButtonStyles,
    primary ? primaryStyles(theme) : undefined,
    splitButtonStyles,
    customStyles
  )!;
});
