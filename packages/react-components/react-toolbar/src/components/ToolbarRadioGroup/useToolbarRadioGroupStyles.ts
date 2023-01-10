import { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { ToolbarRadioGroupSlots, ToolbarRadioGroupState } from './ToolbarRadioGroup.types';

export const toolbarRadioGroupClassNames: SlotClassNames<ToolbarRadioGroupSlots> = {
  root: 'fui-ToolbarRadioGroup',
};

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
export const useToolbarRadioGroupStyles_unstable = (state: ToolbarRadioGroupState): ToolbarRadioGroupState => {
  const styles = useStyles();
  state.root.className = mergeClasses(toolbarRadioGroupClassNames.root, styles.root, state.root.className);

  return state;
};
