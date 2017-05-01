import { IButtonClassNames } from '../Button.Props';
import {
  CSSProperties,
  ITheme,
  css,
  mergeRules,
  getTheme
} from '@uifabric/styling';
import {
  getStyles as getBaseButtonStyles
} from '../BaseButton.styles';

const DEFAULT_BUTTON_HEIGHT = '32px';
const DEFAULT_PADDING = '0 4px';

export function getStyles(
  theme: ITheme = getTheme(),
  customClassNames?: IButtonClassNames
): IButtonClassNames {
  let baseButtonStyles: IButtonClassNames = getBaseButtonStyles(theme);
  let iconButtonStyles: IButtonClassNames = {
    root: css(
      {
        backgroundColor: 'transparent',
        color: theme.colors.neutralSecondary,
        padding: '0 4px',
        width: '32px',
        height: '32px'
      } as React.CSSProperties
    ),

    rootEnabled: css(
      {
        ':hover': {
          color: theme.colors.themeDarker
        } as React.CSSProperties,
        ':active': {
          color: theme.colors.themePrimary
        } as React.CSSProperties
      }
    ),

    rootDisabled: css(
      {
        backgroundColor: 'transparent',
        '@media screen and (-ms-high-contrast: active)': {
          color: theme.colors.yellowLight
        },
        '@media screen and (-ms-high-contrast: black-on-white)': {
          color: theme.colors.blueMid
        }
      }
    )
  };

  return mergeRules(baseButtonStyles, iconButtonStyles, customClassNames);
}
