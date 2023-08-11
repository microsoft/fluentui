import * as React from 'react';
import { mergeClasses } from '@griffel/react';
import { DAYS_IN_WEEK } from '../../utils';
import type { CalendarDayGridProps, CalendarDayGridStyles } from './CalendarDayGrid.types';
import type { DayInfo } from './CalendarDayGrid';

/**
 * @internal
 */
export interface CalendarDayMonthHeaderRowProps extends CalendarDayGridProps {
  weeks: DayInfo[][];
  classNames: CalendarDayGridStyles;
}

/**
 * @internal
 */
export const CalendarMonthHeaderRow: React.FunctionComponent<CalendarDayMonthHeaderRowProps> = props => {
  const { showWeekNumbers, strings, firstDayOfWeek, allFocusable, weeksToShow, weeks, classNames } = props;
  const dayLabels = strings.shortDays.slice();

  let firstOfMonthIndex = -1;
  const firstWeekOfMonth = weeks![1];
  for (let i = 0; i < weeks![1].length; i++) {
    if (firstWeekOfMonth[i].originalDate.getDate() === 1) {
      firstOfMonthIndex = i;
      break;
    }
  }

  if (weeksToShow === 1 && firstOfMonthIndex >= 0) {
    // if we only show one week, replace the header with short month name
    const firstOfMonthIndexOffset = (firstOfMonthIndex + firstDayOfWeek) % DAYS_IN_WEEK;
    dayLabels[firstOfMonthIndexOffset] = strings.shortMonths[weeks![1][firstOfMonthIndex].originalDate.getMonth()];
  }

  return (
    <tr>
      {showWeekNumbers && <th className={classNames.dayCell} />}
      {dayLabels.map((val: string, index: number) => {
        const i = (index + firstDayOfWeek) % DAYS_IN_WEEK;
        const label = strings.days[i];
        return (
          <th
            className={mergeClasses(classNames.dayCell, classNames.weekDayLabelCell)}
            scope="col"
            key={dayLabels[i] + ' ' + index}
            title={label}
            aria-label={label}
            tabIndex={allFocusable ? 0 : undefined}
          >
            {dayLabels[i]}
          </th>
        );
      })}
    </tr>
  );
};
