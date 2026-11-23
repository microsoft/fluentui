/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import * as React from 'react';
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarYearBaseState, CalendarYearSlots } from './CalendarYear.types';

/**
 * Render the final JSX of CalendarYear.
 */
export const renderCalendarYear_unstable = (state: CalendarYearBaseState): JSXElement => {
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
      {/* Consumer children replace the default rows. */}
      {state.grid.children !== undefined ? (
        <state.grid />
      ) : (
        <state.grid>
          {state.yearRows.map(row => {
            const element = (
              <div {...row.props}>
                {row.cells.map(cell => (
                  <button key={cell.year} {...cell.props}>
                    {cell.content}
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
    </state.root>
  );
};
