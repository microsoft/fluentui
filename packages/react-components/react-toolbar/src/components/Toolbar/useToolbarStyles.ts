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
    alignItems: 'center',
    ...shorthands.padding('4px', '8px', '4px', '8px'),
    ...shorthands.gap('8px'),
  },
  vertical: {
    flexDirection: 'column',
    width: 'fit-content',
  },
  small: {
    height: '32px',
  },
  medium: {
    height: '40px',
  },
  large: {
    height: '48px',
  },
});

/**
 * Apply styling to the Toolbar slots based on the state
 */
export const useToolbarStyles_unstable = (state: ToolbarState): ToolbarState => {
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
