import { makeStyles, mergeClasses } from '@griffel/react';
import type { ToasterSlots, ToasterState } from './Toaster.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { getPositionStyles } from '../../state/index';
import { toastPositions } from './constants';

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

  toastPositions.forEach(position => {
    const positionSlot = state[position];
    if (!positionSlot) {
      return;
    }

    positionSlot.className = mergeClasses(toasterClassNames.root, styles.root, state.root.className);
    positionSlot.style ??= {};
    Object.assign(positionSlot.style, getPositionStyles(position, state.offset));
  });

  return state;
};
