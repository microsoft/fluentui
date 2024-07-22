import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { menuItemClassNames } from '../MenuItem/useMenuItemStyles.styles';
import type { MenuSplitGroupSlots, MenuSplitGroupState } from './MenuSplitGroup.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const menuSplitGroupClassNames: SlotClassNames<MenuSplitGroupSlots> = {
  root: 'fui-MenuSplitGroup',
};
/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    [`& > .${menuItemClassNames.root}:nth-of-type(1)`]: {
      flexGrow: 1,
    },
    [`& > .${menuItemClassNames.root}:nth-of-type(2)`]: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      paddingLeft: 0,
      '::before': {
        content: '""',
        width: tokens.strokeWidthThin,
        height: '20px',
        backgroundColor: tokens.colorNeutralStroke1,
      },
    },
  },
});

/**
 * Apply styling to the MenuSplitGroup slots based on the state
 */
export const useMenuSplitGroupStyles_unstable = (state: MenuSplitGroupState): MenuSplitGroupState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(menuSplitGroupClassNames.root, styles.root, state.root.className);
  return state;
};
