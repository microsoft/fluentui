import { IButtonStyles } from '../Button.Props';
import {
  ITheme,
  mergeStyles,
  getTheme,
  mergeStyleSets
} from '../../../Styling';
import {
  getStyles as getBaseButtonStyles
} from '../BaseButton.styles';
import { memoize } from '../../../Utilities';

const DEFAULT_BUTTON_HEIGHT = '40px';
const DEFAULT_PADDING = '0 4px';

export const getStyles = memoize((
  theme: ITheme = getTheme(),
  customStyles?: IButtonStyles
): IButtonStyles => {
  let baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);
  let commandButtonStyles: IButtonStyles = {
    root: mergeStyles(
      {
        borderWidth: '0',
        padding: DEFAULT_PADDING,
        height: DEFAULT_BUTTON_HEIGHT,

      }
    ),

    flexContainer: mergeStyles(
      {
        justifyContent: 'flex-start'
      }
    ),

    rootEnabled: mergeStyles(
      {
        color: theme.palette.neutralPrimary,
        backgroundColor: 'transparent',

        ':hover': {
          color: theme.palette.themeDarker
        },
        ':active': {
          color: theme.palette.themePrimary
        }
      }
    ),

    rootDisabled: mergeStyles({
      color: theme.palette.neutralTertiary,
      backgroundColor: 'transparent'
    }),

    iconEnabled: mergeStyles(
      {
        color: theme.palette.themePrimary
      }
    ),

    menuIconEnabled: mergeStyles({
      color: theme.palette.neutralSecondary
    })
  };

  return mergeStyleSets(baseButtonStyles, commandButtonStyles, customStyles);
});
