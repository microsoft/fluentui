/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarMonthState, CalendarMonthSlots } from './CalendarMonth.types';

/**
 * Render the final JSX of CalendarMonth.
 */
export const renderCalendarMonth = (state: CalendarMonthState): JSXElement => {
  assertSlots<CalendarMonthSlots>(state);

  return (
    <state.root>
      {state.isYearPickerVisible ? (
        <state.yearPicker />
      ) : (
        <>
          <state.header>
            <state.heading />
            <state.navigation>
              <state.previousYearButton />
              <state.nextYearButton />
            </state.navigation>
          </state.header>
          <state.grid>
            {/* Consumer children replace the default rows. */}
            {state.grid.children !== undefined
              ? state.grid.children
              : state.monthRows.map(row => (
                  <div key={row.key} {...state.getMonthRowProps(row).root}>
                    {row.cells.map(cell => (
                      <button key={cell.index} {...state.getMonthCellProps(cell).root} />
                    ))}
                  </div>
                ))}
          </state.grid>
        </>
      )}
    </state.root>
  );
};
