/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarDayGridRowSlots, CalendarDayGridRowState } from './CalendarDayGridRow.types';

/**
 * Render the final JSX of CalendarDayGridRow.
 */
export const renderCalendarDayGridRow_unstable = (state: CalendarDayGridRowState): JSXElement | null => {
  assertSlots<CalendarDayGridRowSlots>(state);

  const { motion: Motion, transition } = state;

  // The transition rows exist only to be animated out, so they are skipped without motion.
  if (transition && !Motion) {
    return null;
  }

  const row = (
    <state.root>
      {state.weekNumberCell && <state.weekNumberCell />}
      {state.root.children}
    </state.root>
  );

  return Motion ? <Motion>{row}</Motion> : row;
};
