import type { SlotClassNames } from '@fluentui/react-utilities';
import { mergeClasses, makeStyles } from '@griffel/react';
import type { MenuGridSlots, MenuGridState } from './MenuGrid.types';

export const menuGridClassNames: SlotClassNames<MenuGridSlots> = {
  root: 'fui-MenuGrid',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  hasMenuContext: {
    height: '100%',
  },
});

/**
 * Apply styling to the Menu slots based on the state
 */
export const useMenuGridStyles_unstable = (state: MenuGridState): MenuGridState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(menuGridClassNames.root, styles.root, state.root.className);
  return state;
};
