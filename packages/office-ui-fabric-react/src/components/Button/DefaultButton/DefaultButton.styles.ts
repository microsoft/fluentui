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
const DEFAULT_BUTTON_MINWIDTH = '80px';
const DEFAULT_PADDING = '0 16px';

export function getStyles(
  theme: ITheme = getTheme(),
  userClassNames: IButtonClassNames = {},
  focusInset: string = '0',
  focusColor: string = theme.colors.neutralSecondary,
): IButtonClassNames {
  let defaultButtonStyles = getBaseButtonStyles(theme, focusInset, focusColor);

  return {
    ...defaultButtonStyles,
    ...userClassNames,

    base: 'ms-Button',
    variant: 'ms-Button--default',

    root: css(
      defaultButtonStyles.root,
      theme.fonts.medium,
      {
        fontWeight: 'bold', // theme.fontWeights.semibold,

        backgroundColor: theme.colors.neutralLighter,
        color: theme.colors.neutralPrimary,

        minWidth: DEFAULT_BUTTON_MINWIDTH,
        height: DEFAULT_BUTTON_HEIGHT,

      } as React.CSSProperties,
      userClassNames.root
    ),

    rootEnabled: css(
      defaultButtonStyles.rootEnabled,
      {
        ':hover': {
          backgroundColor: theme.colors.neutralLight,
          color: theme.colors.black
        } as React.CSSProperties,
        ':active': {
          backgroundColor: theme.colors.themePrimary,
          color: theme.colors.white
        } as React.CSSProperties
      },
      userClassNames.rootEnabled
    )

  };
}
