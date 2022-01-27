import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { menuItemClassName } from '../MenuItem/useMenuItemStyles';
import type { MenuSplitGroupState } from './MenuSplitGroup.types';

export const menuSplitGroupClassName = 'fui-MenuSplitGroup';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    [`& > .${menuItemClassName}:nth-child(1)`]: {
      width: '100%',
    },
    [`& > .${menuItemClassName}:nth-child(2)`]: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      paddingLeft: 0,
      marginLeft: 'auto',
      ':before': {
        content: '""',
        width: tokens.strokeWidthThin,
        height: '24px',
        backgroundColor: tokens.colorNeutralStroke1,
      },
    },
  },
});

/**
 * Apply styling to the MenuSplitGroup slots based on the state
 */
export const useMenuSplitGroupStyles_unstable = (state: MenuSplitGroupState): MenuSplitGroupState => {
  const styles = useStyles();
  state.root.className = mergeClasses(menuSplitGroupClassName, styles.root, state.root.className);
  return state;
};
