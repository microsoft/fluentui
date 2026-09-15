/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarDayGridHeaderRowSlots, CalendarDayGridHeaderRowState } from './CalendarDayGridHeaderRow.types';

/**
 * Render the final JSX of CalendarDayGridHeaderRow.
 */
export const renderCalendarDayGridHeaderRow_unstable = (state: CalendarDayGridHeaderRowState): JSXElement => {
  assertSlots<CalendarDayGridHeaderRowSlots>(state);

  return (
    <state.root>
      {state.weekNumberSpacerCell && <state.weekNumberSpacerCell />}
      {state.root.children}
    </state.root>
  );
};
