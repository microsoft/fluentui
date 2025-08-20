import { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';

import type { ToolbarGroupSlots, ToolbarGroupState } from './ToolbarGroup.types';

export const toolbarGroupClassNames: SlotClassNames<ToolbarGroupSlots> = {
  root: 'fui-ToolbarGroup',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  vertical: {
    flexDirection: 'column',
    width: 'fit-content',
  },
});

/**
 * Apply styling to the Toolbar slots based on the state
 */
export const useToolbarGroupStyles_unstable = (state: ToolbarGroupState): ToolbarGroupState => {
  'use no memo';

  const { vertical } = state;
  const styles = useStyles();

  state.root.className = mergeClasses(
    toolbarGroupClassNames.root,
    styles.root,
    vertical && styles.vertical,
    state.root.className,
  );

  return state;
};
