/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarDayGridCellSlots, CalendarDayGridCellState } from './CalendarDayGridCell.types';

/**
 * Render the final JSX of CalendarDayGridCell.
 */
export const renderCalendarDayGridCell_unstable = (state: CalendarDayGridCellState): JSXElement => {
  assertSlots<CalendarDayGridCellSlots>(state);

  return (
    <state.root>
      <state.button>
        <state.dayLabel />
        {state.marker && <state.marker />}
      </state.button>
    </state.root>
  );
};
