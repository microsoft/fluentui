import { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { ToolbarSlots, ToolbarState } from './Toolbar.types';

export const toolbarClassNames: SlotClassNames<ToolbarSlots> = {
  root: 'fui-Toolbar',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    ...shorthands.padding('4px', '8px', '4px', '8px'),
    ...shorthands.gap('8px'),
  },
  vertical: {
    flexDirection: 'column',
    width: 'fit-content',
  },
});

/**
 * Apply styling to the Toolbar slots based on the state
 */
export const useToolbarStyles_unstable = (state: ToolbarState): ToolbarState => {
  const styles = useStyles();
  const { vertical } = state;
  state.root.className = mergeClasses(
    toolbarClassNames.root,
    styles.root,
    vertical && styles.vertical,
    state.root.className,
  );

  return state;
};
