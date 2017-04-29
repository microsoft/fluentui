import { IButtonClassNames } from '../Button.Props';
import { ITheme, getTheme, css, CSSProperties } from '@uifabric/styling';
import {
  getStyles as getBaseButtonStyles,
  DEFAULT_BUTTON_MINWIDTH,
  DEFAULT_BUTTON_HEIGHT,
  DEFAULT_BUTTON_PADDING
} from '../BaseButton.styles';


export function getStyles(
  theme: ITheme = getTheme(),
  userClassNames: IButtonClassNames = {}
): IButtonClassNames {
  let defaultButtonStyles = getBaseButtonStyles(
    theme,
    '1px',
    theme.colors.white
  );

  return {
    ...defaultButtonStyles,
    ...userClassNames,

    base: 'ms-Button',
    variant: 'ms-Button--primary',

    root: css(
      defaultButtonStyles.root,
      theme.fonts.medium,
      {
        fontWeight: 'bold', // theme.fontWeights.semibold,

        backgroundColor: theme.colors.themePrimary,
        color: theme.colors.white,

        minWidth: DEFAULT_BUTTON_MINWIDTH,
        height: DEFAULT_BUTTON_HEIGHT,

      } as React.CSSProperties,
      userClassNames.root
    ),

    rootEnabled: css(
      defaultButtonStyles.rootEnabled,
      {
        ':hover': {
          backgroundColor: theme.colors.themeDark
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
