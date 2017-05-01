import { IButtonClassNames } from '../Button.Props';
import {
  CSSProperties,
  ITheme,
  css,
  getTheme,
  mergeRules
} from '@uifabric/styling';
import {
  getStyles as getDefaultButtonStyles
} from '../DefaultButton/DefaultButton.styles';

export function getStyles(
  theme: ITheme = getTheme(),
  customClassNames?: IButtonClassNames,
): IButtonClassNames {
  let { colors } = theme;
  let defaultButtonStyles: IButtonClassNames = getDefaultButtonStyles(
    theme,
    customClassNames,
    '0px',
    theme.colors.white
  );
  let primaryButtonStyles: IButtonClassNames = {
    root: css(
      {
        backgroundColor: colors.themePrimary,
        color: colors.white,
      } as React.CSSProperties
    ),

    rootEnabled: css(
      {
        ':hover': {
          backgroundColor: colors.themeDark,
          color: colors.white
        } as React.CSSProperties,
        ':active': {
          backgroundColor: colors.themePrimary,
          color: colors.white
        } as React.CSSProperties
      }
    )
  };

  return mergeRules(defaultButtonStyles, primaryButtonStyles, customClassNames);
}
