import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { ToasterSlots, ToasterState } from './Toaster.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { TOAST_POSITIONS, getPositionStyles } from '../../state/index';

export const toasterClassNames: SlotClassNames<ToasterSlots> = {
  root: 'fui-Toaster',
};

/**
 * Styles for the root slot
 */
const useRootBaseClassName = makeResetStyles({
  position: 'fixed',
  width: '292px',
  pointerEvents: 'none',
});

const useToasterStyles = makeStyles({
  inline: {
    position: 'absolute',
  },
});

/**
 * Apply styling to the Toaster slots based on the state
 */
export const useToasterStyles_unstable = (state: ToasterState): ToasterState => {
  'use no memo';

  const rootBaseClassName = useRootBaseClassName();
  const styles = useToasterStyles();
  const className = mergeClasses(
    toasterClassNames.root,
    rootBaseClassName,
    state.inline && styles.inline,
    state.root.className,
  );
  if (state.bottomStart) {
    state.bottomStart.className = className;
    state.bottomStart.style ??= {};
    Object.assign(state.bottomStart.style, getPositionStyles(TOAST_POSITIONS.bottomStart, state.dir, state.offset));
  }

  if (state.bottomEnd) {
    state.bottomEnd.className = className;
    state.bottomEnd.style ??= {};
    Object.assign(state.bottomEnd.style, getPositionStyles(TOAST_POSITIONS.bottomEnd, state.dir, state.offset));
  }

  if (state.topStart) {
    state.topStart.className = className;
    state.topStart.style ??= {};
    Object.assign(state.topStart.style, getPositionStyles(TOAST_POSITIONS.topStart, state.dir, state.offset));
  }

  if (state.topEnd) {
    state.topEnd.className = className;
    state.topEnd.style ??= {};
    Object.assign(state.topEnd.style, getPositionStyles(TOAST_POSITIONS.topEnd, state.dir, state.offset));
  }

  if (state.top) {
    state.top.className = className;
    state.top.style ??= {};
    Object.assign(state.top.style, getPositionStyles(TOAST_POSITIONS.top, state.dir, state.offset));
  }

  if (state.bottom) {
    state.bottom.className = className;
    state.bottom.style ??= {};
    Object.assign(state.bottom.style, getPositionStyles(TOAST_POSITIONS.bottom, state.dir, state.offset));
  }

  return state;
};
