import { IButtonStyles } from '../Button.Props';
import { ISplitButtonStyles } from '../SplitButton/SplitButton.Props';
import {
  ITheme,
  mergeStyleSets
} from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import {
  getStyles as getBaseButtonStyles
} from '../BaseButton.styles';
import {
  getStyles as getSplitButtonStyles
} from '../SplitButton/SplitButton.styles';

const DEFAULT_BUTTON_HEIGHT = '40px';
const DEFAULT_PADDING = '0 4px';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: IButtonStyles
): IButtonStyles => {
  let baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);
  let splitButtonStyles: ISplitButtonStyles = getSplitButtonStyles(theme);
  let commandButtonStyles: IButtonStyles = {
    root: {
      borderWidth: '0',
      padding: DEFAULT_PADDING,
      height: DEFAULT_BUTTON_HEIGHT,
      color: theme.palette.neutralPrimary,
      backgroundColor: 'transparent'
    },

    rootHovered: {
      color: theme.palette.themeDarker
    },

    rootPressed: {
      color: theme.palette.themePrimary
    },

    rootDisabled: {
      color: theme.palette.neutralTertiary,
      backgroundColor: 'transparent'
    },

    rootChecked: {
      backgroundColor: theme.palette.neutralTertiaryAlt,
    },

    rootExpanded: {
      color: theme.palette.themePrimary
    },

    rootCheckedHovered: {
      backgroundColor: theme.palette.neutralLight
    },

    flexContainer: {
      justifyContent: 'flex-start'
    },

    icon: {
      color: theme.palette.themePrimary
    },

    iconDisabled: {
      color: 'inherit'
    },

    menuIcon: {
      color: theme.palette.neutralSecondary
    }

  };

  return mergeStyleSets(baseButtonStyles, commandButtonStyles, splitButtonStyles, customStyles);
});
