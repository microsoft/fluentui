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

const DEFAULT_BUTTON_HEIGHT = '40px';
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
    variant: 'ms-Button--command',

    root: css(
      defaultButtonStyles.root,
      theme.fonts.medium,
      {
        borderWidth: '0',
        backgroundColor: 'transparent',
        padding: DEFAULT_PADDING,
        height: DEFAULT_BUTTON_HEIGHT,
        color: theme.colors.neutralPrimary,

      } as React.CSSProperties,
      userClassNames.root
    ),

    flexContainer: css(
      defaultButtonStyles.flexContainer,
      {
        justifyContent: 'flex-start'
      },
      userClassNames.flexContainer
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

    iconEnabled: css(
      defaultButtonStyles.iconEnabled,
      {
        color: theme.colors.themePrimary
      },
      userClassNames.iconEnabled
    )

  };

}
