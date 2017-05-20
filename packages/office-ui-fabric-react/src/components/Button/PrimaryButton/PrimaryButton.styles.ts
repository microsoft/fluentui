import { IButtonStyles } from '../Button.Props';
import {
  ITheme,
  getTheme,
  mergeStyles,
  mergeStyleSets
} from '../../../Styling';
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
    palette.white
  );
  let primaryButtonStyles: IButtonStyles = {
    root: mergeStyles(
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
    ),

    rootToggled: mergeStyles({
      backgroundColor: palette.themeDark,
      color: palette.white,

      ':hover': {
        backgroundColor: theme.palette.neutralLight,
        color: theme.palette.black
      }
    })
  };

  return mergeStyleSets(defaultButtonStyles, primaryButtonStyles, customStyles);
}
