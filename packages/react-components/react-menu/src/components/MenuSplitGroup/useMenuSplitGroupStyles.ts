import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { menuItemClassNames } from '../MenuItem/useMenuItemStyles';
import type { MenuSplitGroupSlots, MenuSplitGroupState } from './MenuSplitGroup.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

/**
 * @deprecated Use `menuSplitGroupClassNames.root` instead.
 */
export const menuSplitGroupClassName = 'fui-MenuSplitGroup';
export const menuSplitGroupClassNames: SlotClassNames<MenuSplitGroupSlots> = {
  root: 'fui-MenuSplitGroup',
};
/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    [`& > .${menuItemClassNames.root}:nth-child(1)`]: {
      width: '100%',
    },
    [`& > .${menuItemClassNames.root}:nth-child(2)`]: {
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
  state.root.className = mergeClasses(menuSplitGroupClassNames.root, styles.root, state.root.className);
  return state;
};
