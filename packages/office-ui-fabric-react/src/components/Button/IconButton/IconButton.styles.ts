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

const DEFAULT_BUTTON_HEIGHT = '32px';
const DEFAULT_PADDING = '0 4px';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: IButtonStyles
): IButtonStyles => {
  let baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);
  let splitButtonStyles: ISplitButtonStyles = getSplitButtonStyles(theme);
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

    rootExpanded: {
      color: theme.palette.themePrimary
    },

    rootChecked: {
      backgroundColor: theme.palette.neutralTertiaryAlt,
    },

    rootCheckedHovered: {
      backgroundColor: theme.palette.neutralLight
    },

    rootDisabled: {
      color: theme.palette.neutralTertiary
    }
  };

  return mergeStyleSets(baseButtonStyles, iconButtonStyles, splitButtonStyles, customStyles)!;
});
