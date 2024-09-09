import { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
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
    alignItems: 'center',
    padding: '4px 8px',
  },
  vertical: {
    flexDirection: 'column',
    width: 'fit-content',
  },
  small: { padding: '0px 4px' },
  medium: { padding: '4px 8px' },
  large: { padding: '4px 20px' },
});

/**
 * Apply styling to the Toolbar slots based on the state
 */
export const useToolbarStyles_unstable = (state: ToolbarState): ToolbarState => {
  'use no memo';

  const styles = useStyles();
  const { vertical, size } = state;
  state.root.className = mergeClasses(
    toolbarClassNames.root,
    styles.root,
    vertical && styles.vertical,
    size === 'small' && !vertical && styles.small,
    size === 'medium' && !vertical && styles.medium,
    size === 'large' && !vertical && styles.large,
    state.root.className,
  );

  return state;
};
