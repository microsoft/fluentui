import { IButtonStyles } from '../Button.Props';
import { ISplitButtonStyles } from '../SplitButton/SplitButton.Props';
import {
  ITheme,
  mergeStyleSets,
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
const DEFAULT_PADDING = '0 16px';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: IButtonStyles,
  focusInset?: string,
  focusColor?: string
): IButtonStyles => {
  let baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme, focusInset, focusColor);
  let splitButtonStyles: ISplitButtonStyles = getSplitButtonStyles(theme);
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
      backgroundColor: theme.palette.themePrimary,
      color: theme.palette.white
    },

    rootChecked: {
      backgroundColor: theme.palette.themePrimary,
      color: theme.palette.white
    },

    label: {
      fontWeight: FontWeights.semibold
    }
  };

  return mergeStyleSets(baseButtonStyles, defaultButtonStyles, splitButtonStyles, customStyles);
});
