import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import {
  ITheme,
  mergeStyleSets
} from '@uifabric/Styling';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getBaseButtonStyles } from 'office-ui-fabric-react/lib/Button';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: IButtonStyles,
  focusInset?: string,
  focusColor?: string
): IButtonStyles => {
  let baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);
  let commandButtonStyles: IButtonStyles = {
    root: {
      minWidth: '40px',
      backgroundColor: theme.palette.neutralLighter,
      color: theme.palette.neutralPrimary,
      padding: '0 4px'
    },

    rootHovered: {
      backgroundColor: theme.palette.neutralLight,
      color: theme.palette.neutralDark
    },

    iconHovered: {
      color: theme.palette.themeDark
    },

    rootPressed: {
      backgroundColor: theme.palette.neutralQuaternaryAlt,
      color: theme.palette.black
    },

    iconPressed: {
      color: theme.palette.themeDark
    },

    rootChecked: {
      backgroundColor: theme.palette.neutralQuaternaryAlt,
      color: theme.palette.black
    },

    iconChecked: {
      color: theme.palette.themeDarker
    },

    rootExpanded: {
      backgroundColor: theme.palette.neutralQuaternaryAlt,
      color: theme.palette.black
    },

    iconExpanded: {
      color: theme.palette.themeDark
    },

    rootCheckedHovered: {
      backgroundColor: theme.palette.neutralQuaternary,
      color: theme.palette.black,
    },

    label: {
      fontWeight: 'normal' // theme.fontWeights.semibold,
    },

    icon: {
      color: theme.palette.themeDarkAlt
    },

    menuIcon: {
      color: theme.palette.neutralSecondary
    }

  };

  return mergeStyleSets(
    baseButtonStyles,
    commandButtonStyles,
    customStyles
  )!;
});
