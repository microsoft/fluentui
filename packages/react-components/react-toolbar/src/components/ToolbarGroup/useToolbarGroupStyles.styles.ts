import { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { ToolbarGroupSlots, ToolbarGroupState } from './ToolbarGroup.types';

export const toolbarGroupClassNames: SlotClassNames<ToolbarGroupSlots> = {
  root: 'fui-ToolbarGroup',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},
});

/**
 * Apply styling to the Toolbar slots based on the state
 */
export const useToolbarGroupStyles_unstable = (state: ToolbarGroupState): ToolbarGroupState => {
  const styles = useStyles();
  state.root.className = mergeClasses(toolbarGroupClassNames.root, styles.root, state.root.className);

  return state;
};
