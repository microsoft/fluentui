import { IButtonStyles } from '../Button.Props';
import {
  ITheme,
  mergeStyleSets,
  getTheme
} from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import {
  getStyles as getBaseButtonStyles
} from '../BaseButton.styles';

const DEFAULT_BUTTON_HEIGHT = '32px';
const DEFAULT_PADDING = '0 4px';

export const getStyles = memoizeFunction((
  theme: ITheme = getTheme(),
  customStyles?: IButtonStyles
): IButtonStyles => {
  let baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);
  let iconButtonStyles: IButtonStyles = {
    root: {
      padding: '0 4px',
      width: '32px',
      height: '32px',
      backgroundColor: 'transparent'
    },

    rootHovered: {
      color: theme.palette.themeDarker
    },

    rootPressed: {
      color: theme.palette.themePrimary
    },

    rootChecked: {
      backgroundColor: theme.palette.neutralTertiaryAlt,

      ':hover': {
        backgroundColor: theme.palette.neutralLight
      }

    },

    rootDisabled: {
      color: theme.palette.neutralTertiary
    }
  };

  return mergeStyleSets(baseButtonStyles, iconButtonStyles, customStyles);
});
