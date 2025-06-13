import { makeStyles, mergeClasses } from '@griffel/react';
import { useDividerStyles_unstable, type DividerSlots } from '@fluentui/react-divider';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavDividerState } from './NavDivider.types';

export const navDividerClassNames: SlotClassNames<DividerSlots> = {
  root: 'fui-NavDivider',
  wrapper: 'fui-NavDivider__wrapper',
};

const useStyles = makeStyles({
  root: {
    flexGrow: 0,
    marginTop: '4px',
    marginBottom: '4px',
  },
});

/**
 * Apply styling to the NavDivider slots based on the state
 */
export const useNavDividerStyles_unstable = (state: NavDividerState): NavDividerState => {
  'use no memo';

  const styles = useStyles();

  state.root.className = mergeClasses(navDividerClassNames.root, styles.root, state.root.className);
  state.wrapper.className = mergeClasses(navDividerClassNames.wrapper, state.wrapper.className);

  useDividerStyles_unstable(state);
  return state;
};
