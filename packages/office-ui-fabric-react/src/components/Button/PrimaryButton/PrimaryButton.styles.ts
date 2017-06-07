import { IButtonStyles } from '../Button.Props';
import {
  ITheme,
  mergeStyleSets
} from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import {
  getStyles as getDefaultButtonStyles
} from '../DefaultButton/DefaultButton.styles';

export const getStyles = memoizeFunction((
  theme: ITheme,
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
      color: palette.white
    },

    rootHovered: {
      backgroundColor: palette.themeDark,
      color: palette.white
    },

    rootPressed: {
      backgroundColor: palette.themePrimary,
      color: palette.white
    },

    rootChecked: {
      backgroundColor: palette.themeDark,
      color: palette.white,
    },

    rootCheckedHovered: {
      backgroundColor: theme.palette.neutralLight,
      color: theme.palette.black
    }
  };

  return mergeStyleSets(defaultButtonStyles, primaryButtonStyles, customStyles);
});
