import { IButtonClassNames } from '../Button.Props';
import {
  CSSProperties,
  ITheme,
  css,
  getTheme,
  mergeRules
} from '@uifabric/styling';
import {
  getStyles as getBaseButtonStyles
} from '../BaseButton.styles';

const DEFAULT_BUTTON_HEIGHT = '32px';
const DEFAULT_BUTTON_MINWIDTH = '80px';
const DEFAULT_PADDING = '0 16px';

export function getStyles(
  theme: ITheme = getTheme(),
  customClassNames: IButtonClassNames = {},
  focusInset: string = '0',
  focusColor: string = theme.colors.neutralSecondary,
): IButtonClassNames {
  let baseButtonStyles = getBaseButtonStyles(theme, focusInset, focusColor);

  let defaultButtonStyles = {
    base: 'ms-Button',
    variant: 'ms-Button--default',

    root: css(
      {
        fontWeight: 'bold', // theme.fontWeights.semibold,

        backgroundColor: theme.colors.neutralLighter,
        color: theme.colors.neutralPrimary,

        minWidth: DEFAULT_BUTTON_MINWIDTH,
        height: DEFAULT_BUTTON_HEIGHT,

      } as React.CSSProperties
    ),

    rootEnabled: css(
      {
        ':hover': {
          backgroundColor: theme.colors.neutralLight,
          color: theme.colors.black
        } as React.CSSProperties,
        ':active': {
          backgroundColor: theme.colors.themePrimary,
          color: theme.colors.white
        } as React.CSSProperties
      }
    )
  };

  return mergeRules(baseButtonStyles, defaultButtonStyles, customClassNames);
}
