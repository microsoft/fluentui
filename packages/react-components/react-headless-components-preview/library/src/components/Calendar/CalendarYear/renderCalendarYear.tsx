/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarYearState, CalendarYearSlots } from './CalendarYear.types';

/**
 * Render the final JSX of CalendarYear.
 */
export const renderCalendarYear = (state: CalendarYearState): JSXElement => {
  assertSlots<CalendarYearSlots>(state);

  return (
    <state.root>
      <state.header>
        <state.heading />
        <state.navigation>
          <state.previousRangeButton />
          <state.nextRangeButton />
        </state.navigation>
      </state.header>
      <state.grid>
        {/* Consumer children replace the default rows. */}
        {state.grid.children !== undefined
          ? state.grid.children
          : state.yearRows.map(row => (
              <div key={row.key} {...state.getYearRowProps(row).root}>
                {row.cells.map(cell => {
                  const cellProps = state.getYearCellProps(cell);
                  return (
                    <div key={cell.year} {...cellProps.root}>
                      <button {...cellProps.button} />
                    </div>
                  );
                })}
              </div>
            ))}
      </state.grid>
    </state.root>
  );
};
