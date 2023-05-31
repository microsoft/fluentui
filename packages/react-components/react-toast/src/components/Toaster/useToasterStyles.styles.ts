import { makeStyles, mergeClasses } from '@griffel/react';
import type { ToasterSlots, ToasterState } from './Toaster.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { TOAST_POSITIONS, getPositionStyles } from '../../state/index';

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
  const className = mergeClasses(toasterClassNames.root, styles.root, state.root.className);
  if (state.bottomLeft) {
    state.bottomLeft.className = className;
    state.bottomLeft.style ??= {};
    Object.assign(state.bottomLeft.style, getPositionStyles(TOAST_POSITIONS.bottomLeft, state.offset));
  }

  if (state.bottomRight) {
    state.bottomRight.className = className;
    state.bottomRight.style ??= {};
    Object.assign(state.bottomRight.style, getPositionStyles(TOAST_POSITIONS.bottomRight, state.offset));
  }

  if (state.topLeft) {
    state.topLeft.className = className;
    state.topLeft.style ??= {};
    Object.assign(state.topLeft.style, getPositionStyles(TOAST_POSITIONS.topLeft, state.offset));
  }

  if (state.topRight) {
    state.topRight.className = className;
    state.topRight.style ??= {};
    Object.assign(state.topRight.style, getPositionStyles(TOAST_POSITIONS.topRight, state.offset));
  }

  return state;
};
