import { IButtonClassNames } from '../Button.Props';
import {
  CSSProperties,
  ITheme,
  css,
  getTheme
} from '@uifabric/styling';
import {
  getStyles as getBaseButtonStyles
} from '../BaseButton.styles';

const DEFAULT_BUTTON_HEIGHT = '32px';
const DEFAULT_PADDING = '0 4px';

export function getStyles(
  theme: ITheme = getTheme(),
  userClassNames: IButtonClassNames = {}
): IButtonClassNames {
  let defaultButtonStyles = getBaseButtonStyles(theme);

  return {
    ...defaultButtonStyles,
    ...userClassNames,

    base: 'ms-Button',
    variant: 'ms-Button--icon',

    root: css(
      defaultButtonStyles.root,
      theme.fonts.medium,
      {
        backgroundColor: 'transparent',
        color: theme.colors.neutralSecondary,
        padding: '0 4px',
        width: '32px',
        height: '32px'
      } as React.CSSProperties,
      userClassNames.root
    ),

    rootEnabled: css(
      defaultButtonStyles.rootEnabled,
      {
        ':hover': {
          color: theme.colors.themeDarker
        } as React.CSSProperties,
        ':active': {
          color: theme.colors.themePrimary
        } as React.CSSProperties
      },
      userClassNames.rootEnabled
    ),

    rootDisabled: css(
      defaultButtonStyles.rootDisabled,
      {
        backgroundColor: 'transparent',
        '@media screen and (-ms-high-contrast: active)': {
          color: theme.colors.yellowLight
        },
        '@media screen and (-ms-high-contrast: black-on-white)': {
          color: theme.colors.blueMid
        }
      },
      userClassNames.rootDisabled
    )

  };

}
