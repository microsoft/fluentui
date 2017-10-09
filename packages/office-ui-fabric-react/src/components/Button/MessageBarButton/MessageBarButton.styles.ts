import { IButtonStyles } from '../Button.Props';
import {
  ITheme,
  concatStyleSets
} from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import {
  getStyles as getBaseButtonStyles
} from '../BaseButton.styles';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: IButtonStyles,
  focusInset?: string,
  focusColor?: string
): IButtonStyles => {
  let baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);
  let messageBarButtonStyles: IButtonStyles = {
    root: {
      backgroundColor: theme.palette.neutralQuaternaryAlt,
      color: theme.palette.neutralPrimary
    },

    rootHovered: {
      backgroundColor: theme.palette.neutralTertiaryAlt,
      color: theme.palette.neutralDark
    },

    rootPressed: {
      backgroundColor: theme.palette.neutralTertiary,
      color: theme.palette.neutralDark
    }

  };

  return concatStyleSets(baseButtonStyles, messageBarButtonStyles, customStyles)!;
});