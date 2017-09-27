import { IButtonStyles } from '../Button.Props';
import {
  ITheme,
  concatStyleSets,
  FontWeights
} from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import {
  getStyles as getBaseButtonStyles
} from '../BaseButton.styles';
import {
  getStyles as getSplitButtonStyles
} from '../SplitButton/SplitButton.styles';
import {
  primaryStyles,
  standardStyles
} from '../ButtonThemes';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: IButtonStyles,
  primary?: boolean
): IButtonStyles => {
  let baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);
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

    textContainer: {
      textAlign: 'left'
    },

    icon: {
      fontSize: '2em',
      lineHeight: '1em',
      height: '1em',
      margin: '0px 8px 0px 0px',
      flexBasis: '1em',
      flexShrink: '0'
    },

    label: {
      margin: '0 0 5px',
      lineHeight: '100%',
      fontWeight: FontWeights.semibold
    },
    description: [
      theme.fonts.small,
      {
        lineHeight: '100%'
      }
    ],

  };

  let standardCompoundTheme: IButtonStyles = {

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
  };

  let primaryCompoundTheme: IButtonStyles = {

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
  };

  return concatStyleSets(
    baseButtonStyles,
    compoundButtonStyles,
    primary ? primaryStyles(theme) : standardStyles(theme),
    primary ? primaryCompoundTheme : standardCompoundTheme,
    splitButtonStyles,
    customStyles
  )!;

});
