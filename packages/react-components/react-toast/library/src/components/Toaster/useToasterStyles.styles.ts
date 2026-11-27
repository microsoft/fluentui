'use client';

import type * as React from 'react';
import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { ToasterSlots, ToasterState } from './Toaster.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { TOAST_POSITIONS, getPositionStyles, toasterMaxWidthVar } from '../../state/index';
import type { ToastPosition } from '../../state/index';

export const toasterClassNames: SlotClassNames<ToasterSlots> = {
  root: 'fui-Toaster',
};

/**
 * Styles for the root slot
 */
const useRootBaseClassName = makeResetStyles({
  position: 'fixed',
  // The position styles set the cap. It is on `width`, so that a `max-width` from the caller still applies.
  width: `min(292px, var(${toasterMaxWidthVar}, 100%))`,
  pointerEvents: 'none',
});

const useToasterStyles = makeStyles({
  inline: {
    position: 'absolute',
  },
});

/**
 * Returns the style of a position slot: the style of the caller with the position styles on top. The position
 * slots share the style object of the caller, so each one gets a new object and the caller's object is not changed.
 */
const getPositionSlotStyle = (
  state: ToasterState,
  position: ToastPosition,
  style: React.CSSProperties | undefined,
): React.CSSProperties => ({
  ...style,
  ...getPositionStyles(position, state.dir, state.offset),
});

/**
 * Apply styling to the Toaster slots based on the state
 */
export const useToasterStyles_unstable = (state: ToasterState): ToasterState => {
  const rootBaseClassName = useRootBaseClassName();
  const styles = useToasterStyles();
  const className = mergeClasses(
    toasterClassNames.root,
    rootBaseClassName,
    state.inline && styles.inline,
    state.root.className,
  );
  if (state.bottomStart) {
    // eslint-disable-next-line react-hooks/immutability
    state.bottomStart.className = className;
    // eslint-disable-next-line react-hooks/immutability
    state.bottomStart.style = getPositionSlotStyle(state, TOAST_POSITIONS.bottomStart, state.bottomStart.style);
  }

  if (state.bottomEnd) {
    // eslint-disable-next-line react-hooks/immutability
    state.bottomEnd.className = className;
    // eslint-disable-next-line react-hooks/immutability
    state.bottomEnd.style = getPositionSlotStyle(state, TOAST_POSITIONS.bottomEnd, state.bottomEnd.style);
  }

  if (state.topStart) {
    // eslint-disable-next-line react-hooks/immutability
    state.topStart.className = className;
    // eslint-disable-next-line react-hooks/immutability
    state.topStart.style = getPositionSlotStyle(state, TOAST_POSITIONS.topStart, state.topStart.style);
  }

  if (state.topEnd) {
    // eslint-disable-next-line react-hooks/immutability
    state.topEnd.className = className;
    // eslint-disable-next-line react-hooks/immutability
    state.topEnd.style = getPositionSlotStyle(state, TOAST_POSITIONS.topEnd, state.topEnd.style);
  }

  if (state.top) {
    // eslint-disable-next-line react-hooks/immutability
    state.top.className = className;
    // eslint-disable-next-line react-hooks/immutability
    state.top.style = getPositionSlotStyle(state, TOAST_POSITIONS.top, state.top.style);
  }

  if (state.bottom) {
    // eslint-disable-next-line react-hooks/immutability
    state.bottom.className = className;
    // eslint-disable-next-line react-hooks/immutability
    state.bottom.style = getPositionSlotStyle(state, TOAST_POSITIONS.bottom, state.bottom.style);
  }

  return state;
};
