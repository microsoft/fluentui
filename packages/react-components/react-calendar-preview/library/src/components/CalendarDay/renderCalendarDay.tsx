/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import * as React from 'react';
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarDayBaseState, CalendarDaySlots } from './CalendarDay.types';

/**
 * Render the final JSX of CalendarDay.
 */
export const renderCalendarDay_unstable = (state: CalendarDayBaseState): JSXElement => {
  assertSlots<CalendarDaySlots>(state);

  const { renderDay, weekdayRow, wrapWeek, wrapWeekdayCell } = state;

  return (
    <state.root>
      <state.header>
        <state.heading />
        <state.navigation>
          <state.previousMonthButton />
          <state.nextMonthButton />
          {state.closeButton && <state.closeButton />}
        </state.navigation>
      </state.header>
      <state.grid>
        {/* Consumer children replace the default rows. */}
        {state.body.children !== undefined ? (
          <state.body />
        ) : (
          <state.body>
            <tr {...weekdayRow.props}>
              {weekdayRow.weekNumberSpacer && <th {...weekdayRow.weekNumberSpacer} />}
              {weekdayRow.cells.map(cell => {
                const element = <th {...cell.props} />;
                return (
                  <React.Fragment key={cell.key}>{wrapWeekdayCell ? wrapWeekdayCell(element) : element}</React.Fragment>
                );
              })}
            </tr>
            {state.weeks.map(week => {
              // The transition rows exist only to be animated out, so they are skipped by a layer without motion.
              if (week.transition && !wrapWeek) {
                return null;
              }
              const row = (
                <tr {...week.props}>
                  {week.weekNumber && <th {...week.weekNumber} />}
                  {week.days.map(day => {
                    const content = (
                      <>
                        <span {...day.label} />
                        {day.marker && <div {...day.marker} />}
                      </>
                    );
                    return (
                      <td key={day.key} {...day.props}>
                        <button {...day.button}>
                          {renderDay && !week.transition ? renderDay(day, content) : content}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
              return <React.Fragment key={week.key}>{wrapWeek ? wrapWeek(row, week) : row}</React.Fragment>;
            })}
          </state.body>
        )}
      </state.grid>
    </state.root>
  );
};
