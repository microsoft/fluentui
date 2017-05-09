import { IButtonStyles } from '../Button.Props';
import {
  ITheme,
  mergeStyles,
  getTheme,
  mergeStyleSets
} from '@uifabric/styling';
import {
  memoize
} from '@uifabric/utilities';
import {
  getStyles as getBaseButtonStyles
} from '../BaseButton.styles';

const DEFAULT_BUTTON_HEIGHT = '32px';
const DEFAULT_BUTTON_MINWIDTH = '80px';
const DEFAULT_PADDING = '0 16px';

export const getStyles = memoize((
  theme: ITheme = getTheme(),
  customStyles?: IButtonStyles,
  focusInset: string = '0',
  focusColor: string = theme.palette.neutralSecondary,
): IButtonStyles => {
  let baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme, focusInset, focusColor);
  let defaultButtonStyles: IButtonStyles = {
    root: mergeStyles(
      {
        minWidth: DEFAULT_BUTTON_MINWIDTH,
        height: DEFAULT_BUTTON_HEIGHT,

      }
    ),

    label: mergeStyles({
      fontWeight: 'bold' // theme.fontWeights.semibold,
    }),

    rootEnabled: mergeStyles(
      {
        backgroundColor: theme.palette.neutralLighter,
        color: theme.palette.neutralPrimary,

        ':hover': {
          backgroundColor: theme.palette.neutralLight,
          color: theme.palette.black
        },
        ':active': {
          backgroundColor: theme.palette.themePrimary,
          color: theme.palette.white
        }
      }
    )
  };

  return mergeStyleSets(baseButtonStyles, defaultButtonStyles, customStyles);
});
