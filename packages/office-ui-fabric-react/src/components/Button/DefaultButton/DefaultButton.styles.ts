import { IButtonStyles } from '../Button.Props';
import {
  ITheme,
  concatStyleSets,
  FontWeights
} from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import {
  getStyles as getBaseButtonStyles
} from '../BaseButton.styles';
import {
  getStyles as getSplitButtonStyles
} from '../SplitButton/SplitButton.styles';

const DEFAULT_BUTTON_HEIGHT = '32px';
const DEFAULT_BUTTON_MINWIDTH = '80px';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: IButtonStyles,
  focusInset?: string,
  focusColor?: string
): IButtonStyles => {
  let baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme, focusInset, focusColor);
  let splitButtonStyles: IButtonStyles = getSplitButtonStyles(theme);
  let defaultButtonStyles: IButtonStyles = {
    root: {
      minWidth: DEFAULT_BUTTON_MINWIDTH,
      height: DEFAULT_BUTTON_HEIGHT,
      backgroundColor: theme.palette.neutralLighter,
      color: theme.palette.neutralPrimary
    },

    rootHovered: {
      backgroundColor: theme.palette.neutralLight,
      color: theme.palette.black
    },

    rootPressed: {
      backgroundColor: theme.palette.neutralTertiaryAlt,
      color: theme.palette.neutralDark
    },

    rootExpanded: {
      backgroundColor: theme.palette.neutralTertiaryAlt,
      color: theme.palette.neutralDark
    },

    rootChecked: {
      backgroundColor: theme.palette.neutralTertiaryAlt,
      color: theme.palette.neutralDark
    },

    label: {
      fontWeight: FontWeights.semibold
    }
  };

  return concatStyleSets(baseButtonStyles, defaultButtonStyles, splitButtonStyles, customStyles)!;
});
