import type * as React from 'react';
import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ToastPosition } from '@fluentui/react-headless-components-preview/toast';
import type { ToasterSlots, ToasterState } from './Toaster.types';
import styles from './Toaster.module.css';

export const toasterClassNames: SlotClassNames<ToasterSlots> = {
  root: 'fui-Toaster',
};

type PositionSlot = NonNullable<ToasterState['bottomStart']>;
type ToastOffsetObject = { horizontal?: number; vertical?: number };

const getPositionStyles = (
  position: ToastPosition,
  dir: ToasterState['dir'],
  offset: ToasterState['offset'],
): React.CSSProperties => {
  const resolvedOffset: ToastOffsetObject = offset
    ? 'horizontal' in offset || 'vertical' in offset
      ? offset
      : (offset as Partial<Record<ToastPosition, ToastOffsetObject>>)[position] ?? {}
    : {};
  const centered = position === 'top' || position === 'bottom';
  const { horizontal = centered ? 0 : 20, vertical = 16 } = resolvedOffset;

  switch (position) {
    case 'top':
      return { top: vertical, left: `calc(50% + ${horizontal}px)`, transform: 'translateX(-50%)' };
    case 'bottom':
      return { bottom: vertical, left: `calc(50% + ${horizontal}px)`, transform: 'translateX(-50%)' };
    case 'top-start':
      return { top: vertical, ...(dir === 'ltr' ? { left: horizontal } : { right: horizontal }) };
    case 'top-end':
      return { top: vertical, ...(dir === 'ltr' ? { right: horizontal } : { left: horizontal }) };
    case 'bottom-start':
      return { bottom: vertical, ...(dir === 'ltr' ? { left: horizontal } : { right: horizontal }) };
    case 'bottom-end':
      return { bottom: vertical, ...(dir === 'ltr' ? { right: horizontal } : { left: horizontal }) };
  }
};

const applyPositionStyles = (slotProps: PositionSlot, position: ToastPosition, state: ToasterState): void => {
  slotProps.className = clsx(toasterClassNames.root, styles.root, slotProps.className);
  slotProps.style = {
    ...slotProps.style,
    ...getPositionStyles(position, state.dir, state.offset),
  };
};

/** Apply styling and viewport positioning to each active Toaster stack. */
export const useToasterStyles = (state: ToasterState): ToasterState => {
  if (state.bottomStart) {
    applyPositionStyles(state.bottomStart, 'bottom-start', state);
  }
  if (state.bottomEnd) {
    applyPositionStyles(state.bottomEnd, 'bottom-end', state);
  }
  if (state.topStart) {
    applyPositionStyles(state.topStart, 'top-start', state);
  }
  if (state.topEnd) {
    applyPositionStyles(state.topEnd, 'top-end', state);
  }
  if (state.top) {
    applyPositionStyles(state.top, 'top', state);
  }
  if (state.bottom) {
    applyPositionStyles(state.bottom, 'bottom', state);
  }
  return state;
};
