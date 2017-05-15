import { IButtonStyles } from '../Button.Props';
import {
  ITheme,
  mergeStyles,
  mergeStyleSets,
  getTheme
} from '../../../Styling';
import {
  getStyles as getBaseButtonStyles
} from '../BaseButton.styles';

const DEFAULT_BUTTON_HEIGHT = '32px';
const DEFAULT_PADDING = '0 4px';

export function getStyles(
  theme: ITheme = getTheme(),
  customStyles?: IButtonStyles
): IButtonStyles {
  let baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);
  let iconButtonStyles: IButtonStyles = {
    root: mergeStyles(
      {
        backgroundColor: 'transparent',
        padding: '0 4px',
        width: '32px',
        height: '32px'
      }
    ),

    rootEnabled: mergeStyles(
      {
        ':hover': {
          color: theme.palette.themeDarker
        },
        ':active': {
          color: theme.palette.themePrimary
        }
      }
    ),

    rootDisabled: mergeStyles(
      {
        color: theme.palette.neutralTertiary,
        backgroundColor: 'transparent',
        '@media screen and (-ms-high-contrast: active)': {
          color: theme.palette.yellowLight
        },
        '@media screen and (-ms-high-contrast: black-on-white)': {
          color: theme.palette.blueMid
        }
      }
    )
  };

  return mergeStyleSets(baseButtonStyles, iconButtonStyles, customStyles);
}
