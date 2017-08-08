import { IButtonStyles, ButtonTheme } from '../Button.Props';
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

const DEFAULT_BUTTON_HEIGHT = '32px';
const DEFAULT_BUTTON_MINWIDTH = '80px';
const DEFAULT_PADDING = '0 16px';

export const getStyles = memoizeFunction((
  buttonTheme: ButtonTheme,
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
      flexDirection: 'column',
      alignItems: 'flex-start',
      minWidth: '100%',
      margin: ''
    },

    label: {
      margin: '0 0 5px',
      lineHeight: '100%'
    },

    description: [
      theme.fonts.small,
      {
        lineHeight: '100%'
      }
    ],

  };

  let standardTheme: IButtonStyles = {
    description: {
      color: theme.palette.neutralSecondary,
    },

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
  }

  let primaryTheme: IButtonStyles = {
    root: {
      backgroundColor: theme.palette.themePrimary,
      color: theme.palette.white
    },

    rootHovered: {
      backgroundColor: theme.palette.themeDark,
      color: theme.palette.white
    },

    rootPressed: {
      backgroundColor: theme.palette.themePrimary,
      color: theme.palette.white
    },

    rootExpanded: {
      backgroundColor: theme.palette.themePrimary,
      color: theme.palette.white
    },

    rootChecked: {
      backgroundColor: theme.palette.themeDark,
      color: theme.palette.white,
    },

    rootCheckedHovered: {
      backgroundColor: theme.palette.neutralLight,
      color: theme.palette.black
    },

    description: {
      color: theme.palette.white,
    },

    descriptionHovered: {
      color: theme.palette.white
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
  }



  return mergeStyleSets(
    defaultButtonStyles,
    compoundButtonStyles,
    buttonTheme == ButtonTheme.primary ? primaryTheme : standardTheme,
    splitButtonStyles,
    customStyles
  )!;
});
