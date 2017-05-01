import { IButtonClassNames } from '../Button.Props';
import { ITheme, getTheme, css, CSSProperties } from '@uifabric/styling';
import {
  getStyles as getDefaultButtonStyles
} from '../DefaultButton/DefaultButton.styles';


export function getStyles(
  theme: ITheme = getTheme(),
  userClassNames: IButtonClassNames = {},
): IButtonClassNames {
  let { colors } = theme;
  let defaultButtonStyles = getDefaultButtonStyles(
    theme,
    userClassNames,
    '0px',
    theme.colors.white
  );

  return {
    ...defaultButtonStyles,
    ...userClassNames,

    base: 'ms-Button',
    variant: 'ms-Button--primary',

    root: css(
      defaultButtonStyles.root,
      {
        backgroundColor: colors.themePrimary,
        color: colors.white,
      } as React.CSSProperties,
      userClassNames.root
    ),

    rootEnabled: css(
      defaultButtonStyles.rootEnabled,
      {
        ':hover': {
          backgroundColor: colors.themeDark,
          color: colors.white
        } as React.CSSProperties,
        ':active': {
          backgroundColor: colors.themePrimary,
          color: colors.white
        } as React.CSSProperties
      },
      userClassNames.rootEnabled
    )
  };
}
