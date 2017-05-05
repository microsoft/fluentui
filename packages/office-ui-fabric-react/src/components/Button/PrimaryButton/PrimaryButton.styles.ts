import { IButtonStyles } from '../Button.Props';
import {
  ITheme,
  getTheme,
  mergeStyles,
  mergeStyleSets
} from '@uifabric/styling';
import {
  getStyles as getDefaultButtonStyles
} from '../DefaultButton/DefaultButton.styles';

export function getStyles(
  theme: ITheme = getTheme(),
  customStyles?: IButtonStyles,
): IButtonStyles {
  let { palette } = theme;
  let defaultButtonStyles: IButtonStyles = getDefaultButtonStyles(
    theme,
    customStyles,
    '0px',
    theme.palette.white
  );
  let primaryButtonStyles: IButtonStyles = {
    rootEnabled: mergeStyles(
      {
        backgroundColor: palette.themePrimary,
        color: palette.white,

        ':hover': {
          backgroundColor: palette.themeDark,
          color: palette.white
        },
        ':active': {
          backgroundColor: palette.themePrimary,
          color: palette.white
        }
      }
    )
  };

  return mergeStyleSets(defaultButtonStyles, primaryButtonStyles, customStyles);
}
