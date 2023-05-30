import { makeStyles, mergeClasses } from '@griffel/react';
import type { ToasterSlots, ToasterState } from './Toaster.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const toasterClassNames: SlotClassNames<ToasterSlots> = {
  root: 'fui-Toaster',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    position: 'fixed',
    width: '292px',
    pointerEvents: 'none',
  },
});

/**
 * Apply styling to the Toaster slots based on the state
 */
export const useToasterStyles_unstable = (state: ToasterState): ToasterState => {
  const styles = useStyles();
  state.root.className = mergeClasses(toasterClassNames.root, styles.root, state.root.className);

  return state;
};
