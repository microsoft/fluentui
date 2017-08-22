import { IButtonStyles } from '../Button.Props';
import {
  ITheme,
  mergeStyleSets
} from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import {
  getStyles as getDefaultButtonStyles
} from '../DefaultButton/DefaultButton.styles';
import {
  getStyles as getSplitButtonStyles
} from '../SplitButton/SplitButton.styles';

const MS_HIGHCONTRAST_ACTIVE = '@media screen and (-ms-high-contrast: active)';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: IButtonStyles
): IButtonStyles => {
  let { palette } = theme;
  let splitButtonStyles: IButtonStyles = getSplitButtonStyles(theme);
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
      [MS_HIGHCONTRAST_ACTIVE]: {
        borderColor: 'Highlight',
        color: 'Highlight'
      }
    },

    rootHovered: {
      backgroundColor: palette.themeDark,
      color: palette.white
    },

    rootPressed: {
      backgroundColor: palette.themePrimary,
      color: palette.white
    },

    rootExpanded: {
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

  return mergeStyleSets(defaultButtonStyles, primaryButtonStyles, splitButtonStyles, customStyles)!;
});
