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

const DEFAULT_BUTTON_HEIGHT = '40px';
const DEFAULT_PADDING = '0 4px';

export function getStyles(
  theme: ITheme = getTheme(),
  customClassNames?: IButtonClassNames
): IButtonClassNames {
  let baseButtonStyles: IButtonClassNames = getBaseButtonStyles(theme);
  let commandButtonStyles: IButtonClassNames = {
    root: css(
      {
        borderWidth: '0',
        backgroundColor: 'transparent',
        padding: DEFAULT_PADDING,
        height: DEFAULT_BUTTON_HEIGHT,
        color: theme.colors.neutralPrimary,

      } as React.CSSProperties
    ),

    flexContainer: css(
      {
        justifyContent: 'flex-start'
      }
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

    iconEnabled: css(
      {
        color: theme.colors.themePrimary
      }
    )
  };

  return mergeRules(baseButtonStyles, commandButtonStyles, customClassNames);
}
