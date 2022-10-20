import * as React from 'react';
import { css, findIndex } from '@fluentui/utilities';
import { DAYS_IN_WEEK } from '@fluentui/date-time-utilities';
import type { ICalendarDayGridProps, ICalendarDayGridStyles } from './CalendarDayGrid.types';
import type { IProcessedStyleSet } from '@fluentui/style-utilities';
import type { IDayInfo } from './CalendarDayGrid.base';

export interface ICalendarDayMonthHeaderRowProps extends ICalendarDayGridProps {
  weeks: IDayInfo[][];
  classNames: IProcessedStyleSet<ICalendarDayGridStyles>;
}

export const CalendarMonthHeaderRow: React.FunctionComponent<ICalendarDayMonthHeaderRowProps> = props => {
  const { showWeekNumbers, strings, firstDayOfWeek, allFocusable, weeksToShow, weeks, classNames } = props;
  const dayLabels = strings.shortDays.slice();
  const firstOfMonthIndex = findIndex(weeks![1], (day: IDayInfo) => day.originalDate.getDate() === 1);
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
            className={css(classNames.dayCell, classNames.weekDayLabelCell)}
            scope="col"
            key={dayLabels[i] + ' ' + index}
            title={label}
            aria-label={label}
            data-is-focusable={allFocusable ? true : undefined}
          >
            {dayLabels[i]}
          </th>
        );
      })}
    </tr>
  );
};
