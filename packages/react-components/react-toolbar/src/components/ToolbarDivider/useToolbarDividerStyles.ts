import { makeStyles, mergeClasses } from '@griffel/react';
import { useDividerStyles_unstable } from '@fluentui/react-divider';
import type { ToolbarDividerState } from './ToolbarDivider.types';

const useBaseStyles = makeStyles({
  // Base styles
  root: {
    display: 'inline-flex',
    maxWidth: '1px',
  },
});

/**
 * Apply styling to the ToolbarDivider slots based on the state
 */
export const useToolbarDividerStyles_unstable = (state: ToolbarDividerState): ToolbarDividerState => {
  useDividerStyles_unstable(state);
  const toolbarDividerStyles = useBaseStyles();
  state.root.className = mergeClasses(state.root.className, toolbarDividerStyles.root);
  return state;
};
