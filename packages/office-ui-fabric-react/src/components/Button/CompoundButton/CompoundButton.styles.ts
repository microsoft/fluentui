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

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: IButtonStyles
): IButtonStyles => {
  let defaultButtonStyles: IButtonStyles = getDefaultButtonStyles(
    theme,
    customStyles
  );
  let splitButtonStyles: IButtonStyles = getSplitButtonStyles(theme);
  let compoundButtonStyles: IButtonStyles = {
    root: {
      maxWidth: '280px',
      minHeight: '72px',
      height: 'auto',
      padding: '20px'
    },

    flexContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      minWidth: '100%',
      margin: ''
    },

    icon: {
      float: 'left',
      fontSize: '2em',
      lineHeight: '1em',
      width: '1em',
      height: '1em',
      margin: '0px 8px 0px 0px'
    },

    label: {
      margin: '0 0 5px',
      lineHeight: '100%'
    },

    description: [
      theme.fonts.small,
      {
        color: theme.palette.neutralSecondary,
        lineHeight: '100%'
      }
    ],

    descriptionHovered: {
      color: theme.palette.neutralDark
    },

    descriptionPressed: {
      color: 'inherit'
    },

    descriptionChecked: {
      color: 'inherit'
    },

    descriptionDisabled: {
      color: 'inherit'
    }

  };

  return mergeStyleSets(defaultButtonStyles, compoundButtonStyles, splitButtonStyles, customStyles)!;
});
