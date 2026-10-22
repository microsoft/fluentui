/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarDayState, CalendarDaySlots } from './CalendarDay.types';

/**
 * Render the final JSX of CalendarDay.
 */
export const renderCalendarDay = (state: CalendarDayState): JSXElement => {
  assertSlots<CalendarDaySlots>(state);

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
        {renderWeekdayHeader(state)}
        {state.body.children !== undefined ? <state.body /> : renderCalendarDayBody(state)}
      </state.grid>
    </state.root>
  );
};

/**
 * Render the body of the CalendarDay when state.body.children not provided.
 */
const renderCalendarDayBody = (state: CalendarDayState) => {
  assertSlots<CalendarDaySlots>(state);

  return (
    <state.body>
      {state.weeks.map(week => {
        const weekProps = state.getDayRowProps(week);

        return (
          <tr key={week.key} {...weekProps.root}>
            {weekProps.weekNumber && <th {...weekProps.weekNumber} />}
            {week.days.map(day => {
              const dayProps = state.getDayCellProps(day);
              return (
                <td key={day.key} {...dayProps.root}>
                  <button {...dayProps.button}>
                    {dayProps.button.children !== undefined ? (
                      dayProps.button.children
                    ) : (
                      <>
                        <span {...dayProps.label} />
                        {dayProps.marker && <span {...dayProps.marker} />}
                      </>
                    )}
                  </button>
                </td>
              );
            })}
          </tr>
        );
      })}
    </state.body>
  );
};

const renderWeekdayHeader = (state: CalendarDayState) => {
  assertSlots<CalendarDaySlots>(state);
  const weekdayRowProps = state.getDayRowProps(state.weekdayRow);

  return (
    <thead>
      <tr {...weekdayRowProps.root}>
        {weekdayRowProps.weekNumber && <th {...weekdayRowProps.weekNumber} />}
        {state.weekdayRow.cells.map(cell => (
          <th key={cell.key} {...state.getWeekdayCellProps(cell).root} />
        ))}
      </tr>
    </thead>
  );
};
