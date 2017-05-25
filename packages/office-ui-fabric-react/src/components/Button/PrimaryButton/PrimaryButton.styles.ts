import { IButtonStyles } from '../Button.Props';
import {
  ITheme,
  getTheme,
  mergeStyleSets
} from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import {
  getStyles as getDefaultButtonStyles
} from '../DefaultButton/DefaultButton.styles';

export const getStyles = memoizeFunction((
  theme: ITheme = getTheme(),
  customStyles?: IButtonStyles
): IButtonStyles => {
  let { palette } = theme;
  let defaultButtonStyles: IButtonStyles = getDefaultButtonStyles(
    theme,
    customStyles,
    '0px',
    palette.white
  );
  let primaryButtonStyles: IButtonStyles = {
    root: {
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
    },

    rootToggled: {
      backgroundColor: palette.themeDark,
      color: palette.white,

      ':hover': {
        backgroundColor: theme.palette.neutralLight,
        color: theme.palette.black
      }
    }
  };

  return mergeStyleSets(defaultButtonStyles, primaryButtonStyles, customStyles);
});
