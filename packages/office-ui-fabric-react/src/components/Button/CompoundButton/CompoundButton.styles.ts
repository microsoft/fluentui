import { IButtonStyles } from '../Button.Props';
import {
  ITheme,
  mergeStyleSets,
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
  primary?: boolean,
  focusInset?: string,
  focusColor?: string
): IButtonStyles => {
  let baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme, focusInset, focusColor);
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
      float: 'left',
      fontSize: '2em',
      lineHeight: '1em',
      width: '1em',
      height: '1em',
      margin: '0px 8px 0px 0px'
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

  return mergeStyleSets(
    baseButtonStyles,
    compoundButtonStyles,
    primary ? primaryStyles(theme) : standardStyles(theme),
    primary ? primaryCompoundTheme : standardCompoundTheme,
    splitButtonStyles,
    customStyles
  )!;
});
