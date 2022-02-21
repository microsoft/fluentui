import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { ToolbarState } from './Toolbar.types';

export const toolbarClassName = 'fui-Toolbar';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    ...shorthands.gap('8px'),
  },
});

/**
 * Apply styling to the Toolbar slots based on the state
 */
export const useToolbarStyles_unstable = (state: ToolbarState): ToolbarState => {
  const styles = useStyles();
  state.root.className = mergeClasses(toolbarClassName, styles.root, state.root.className);

  return state;
};
