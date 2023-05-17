import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TreeItemAsideSlots, TreeItemAsideState } from './TreeItemAside.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

export const treeItemAsideClassNames: SlotClassNames<TreeItemAsideSlots> = {
  root: 'fui-TreeItemAside',
};

/**
 * Styles for the action icon slot
 */
const useStyles = makeStyles({
  base: {
    display: 'flex',
    marginLeft: 'auto',
    ...shorthands.gridArea('aside'),
  },
  actions: {
    position: 'relative',
    zIndex: 1,
    ...shorthands.padding(0, tokens.spacingHorizontalS),
  },
  aside: {
    alignItems: 'center',
    zIndex: 0,
    ...shorthands.padding(0, tokens.spacingHorizontalM),
    ...shorthands.gap(tokens.spacingHorizontalXS),
  },
});

/**
 * Apply styling to the TreeItemAside slots based on the state
 */
export const useTreeItemAsideStyles_unstable = (state: TreeItemAsideState): TreeItemAsideState => {
  const styles = useStyles();

  state.root.className = mergeClasses(
    treeItemAsideClassNames.root,
    styles.base,
    state.actions ? styles.actions : styles.aside,
    state.root.className,
  );
  return state;
};
