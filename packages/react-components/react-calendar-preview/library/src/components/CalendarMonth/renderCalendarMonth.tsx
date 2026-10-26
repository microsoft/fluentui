/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import * as React from 'react';
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarMonthBaseState, CalendarMonthSlots } from './CalendarMonth.types';

/**
 * Render the final JSX of CalendarMonth.
 */
export const renderCalendarMonth_unstable = (state: CalendarMonthBaseState): JSXElement => {
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
          {/* Consumer children replace the default rows. */}
          {state.grid.children !== undefined ? (
            <state.grid />
          ) : (
            <state.grid>
              {state.monthRows.map(row => {
                const element = (
                  <div {...row.props}>
                    {row.cells.map(cell => (
                      <button key={cell.index} {...cell.props}>
                        {cell.label}
                      </button>
                    ))}
                  </div>
                );
                return (
                  <React.Fragment key={row.key}>{state.wrapRow ? state.wrapRow(element, row) : element}</React.Fragment>
                );
              })}
            </state.grid>
          )}
        </>
      )}
    </state.root>
  );
};
