import { IButtonStyles } from '../Button.Props';
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

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: IButtonStyles,
  focusInset?: string,
  focusColor?: string
): IButtonStyles => {
  let baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);
<<<<<<< HEAD:packages/office-ui-fabric-react/src/components/Button/CommandButton/CommandButton.styles.ts
  let baseSplitButtonStyles: IButtonStyles = getSplitButtonStyles(theme);
  let commandButtonStyles: IButtonStyles = {
=======
  let splitButtonStyles: IButtonStyles = getSplitButtonStyles(theme);
  let actionButtonStyles: IButtonStyles = {
>>>>>>> 7141e63018997876d0c4f9d8dc6e420eb5f52db9:packages/office-ui-fabric-react/src/components/Button/ActionButton/ActionButton.styles.ts
    root: {
      minWidth: '40px',
      backgroundColor: theme.palette.neutralLighter,
      color: theme.palette.neutralPrimary,
      padding: '0 4px'
    },

    rootHovered: {
<<<<<<< HEAD:packages/office-ui-fabric-react/src/components/Button/CommandButton/CommandButton.styles.ts
      backgroundColor: theme.palette.neutralLight,
      color: theme.palette.neutralDark,
      icon: {
        color: theme.palette.themeDark
      }
    },

    rootPressed: {
      backgroundColor: theme.palette.neutralQuaternaryAlt,
      color: theme.palette.black,
      icon: {
        color: theme.palette.themeDark
      }
    },

    rootChecked: {
      backgroundColor: theme.palette.neutralQuaternaryAlt,
      color: theme.palette.black,
      icon: {
        color: theme.palette.themeDarker
      }
    },

    rootExpanded: {
      backgroundColor: theme.palette.neutralQuaternaryAlt,
      color: theme.palette.black,
      icon: {
        color: theme.palette.themeDark
      }
    },

    rootCheckedHovered: {
      backgroundColor: theme.palette.neutralQuaternary,
      color: theme.palette.black,
=======
      color: theme.palette.themePrimary,
      icon: {
        color: theme.palette.themePrimary
      }
    },

    iconHovered: {
      color: theme.palette.themePrimary
    },

    rootPressed: {
      color: theme.palette.black,
    },

    rootExpanded: {
      color: theme.palette.themePrimary
    },

    iconPressed: {
      color: theme.palette.themeDarker
    },

    rootDisabled: {
      color: theme.palette.neutralTertiary,
      backgroundColor: 'transparent'
    },

    rootChecked: {
      color: theme.palette.black,
    },

    iconChecked: {
      color: theme.palette.themeDarker
>>>>>>> 7141e63018997876d0c4f9d8dc6e420eb5f52db9:packages/office-ui-fabric-react/src/components/Button/ActionButton/ActionButton.styles.ts
    },

    label: {
      fontWeight: 'normal' // theme.fontWeights.semibold,
    },

    icon: {
      color: theme.palette.themeDarkAlt
<<<<<<< HEAD:packages/office-ui-fabric-react/src/components/Button/CommandButton/CommandButton.styles.ts
=======
    },

    iconDisabled: {
      color: 'inherit'
>>>>>>> 7141e63018997876d0c4f9d8dc6e420eb5f52db9:packages/office-ui-fabric-react/src/components/Button/ActionButton/ActionButton.styles.ts
    },

    menuIcon: {
      color: theme.palette.neutralSecondary
    }

  };

<<<<<<< HEAD:packages/office-ui-fabric-react/src/components/Button/CommandButton/CommandButton.styles.ts
  return mergeStyleSets(baseButtonStyles, commandButtonStyles, baseSplitButtonStyles, customStyles)!;
});
=======
  return mergeStyleSets(baseButtonStyles, actionButtonStyles, customStyles)!;
});
>>>>>>> 7141e63018997876d0c4f9d8dc6e420eb5f52db9:packages/office-ui-fabric-react/src/components/Button/ActionButton/ActionButton.styles.ts
