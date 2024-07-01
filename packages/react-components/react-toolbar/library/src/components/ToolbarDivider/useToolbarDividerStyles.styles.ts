import { makeStyles, mergeClasses } from '@griffel/react';
import { useDividerStyles_unstable } from '@fluentui/react-divider';
import type { ToolbarDividerState } from './ToolbarDivider.types';

const useBaseStyles = makeStyles({
  // Base styles
  root: {
    display: 'inline-flex',
    maxWidth: '1px',
    padding: '0 12px',
  },
  vertical: {
    maxWidth: 'initial',
  },
});

/**
 * Apply styling to the ToolbarDivider slots based on the state
 */
export const useToolbarDividerStyles_unstable = (state: ToolbarDividerState): ToolbarDividerState => {
  'use no memo';

  useDividerStyles_unstable(state);
  const { vertical } = state;
  const toolbarDividerStyles = useBaseStyles();
  state.root.className = mergeClasses(
    toolbarDividerStyles.root,
    !vertical && toolbarDividerStyles.vertical,
    state.root.className,
  );
  return state;
};
