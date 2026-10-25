import * as React from 'react';
import { format } from '@fluentui/utilities';
import { getWeekNumber } from '@fluentui/date-time-utilities';
import { CalendarGridDayCell } from './CalendarGridDayCell';
import type { ICalendarDayGridProps, ICalendarDayGridStyles } from './CalendarDayGrid.types';
import type { IProcessedStyleSet } from '@fluentui/style-utilities';
import type { IDayInfo, IWeekCorners } from './CalendarDayGrid.base';

export interface ICalendarGridRowProps extends ICalendarDayGridProps {
  classNames: IProcessedStyleSet<ICalendarDayGridStyles>;
  weeks: IDayInfo[][];
  week: IDayInfo[];
  weekIndex: number;
  weekCorners?: IWeekCorners;
  ariaHidden?: boolean;
  rowClassName?: string;
  ariaRole?: string;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  navigatedDayRef: React.MutableRefObject<HTMLTableCellElement>;
  activeDescendantId: string;
  calculateRoundedStyles(
    classNames: IProcessedStyleSet<ICalendarDayGridStyles>,
    above: boolean,
    below: boolean,
    left: boolean,
    right: boolean,
  ): string;
  getDayInfosInRangeOfDay(dayToCompare: IDayInfo): IDayInfo[];
  getRefsFromDayInfos(dayInfosInRange: IDayInfo[]): (HTMLElement | null)[];
}

export const CalendarGridRow: React.FunctionComponent<ICalendarGridRowProps> = props => {
  const {
    classNames,
    week,
    weekIndex,
    rowClassName,
    ariaRole,
    showWeekNumbers,
    firstDayOfWeek,
    firstWeekOfYear,
    strings,
  } = props;
  // Derive the week number from the row's own days instead of the navigated month, so that
  // collapsed views rendering a single week (e.g. WeeklyDayPicker) show the visible week's number.
  const weekNumber = showWeekNumbers
    ? getWeekNumber(week[week.length - 1].originalDate, firstDayOfWeek, firstWeekOfYear)
    : null;

  const titleString =
    weekNumber !== null
      ? strings.weekNumberFormatString && format(strings.weekNumberFormatString, weekNumber)
      : '';

  return (
    <tr role={ariaRole} className={rowClassName} key={weekIndex + '_' + week[0].key}>
      {showWeekNumbers && weekNumber !== null && (
        <th
          className={classNames.weekNumberCell}
          key={weekIndex}
          title={titleString}
          aria-label={titleString}
          scope="row"
        >
          <span>{weekNumber}</span>
        </th>
      )}
      {week.map((day: IDayInfo, dayIndex: number) => (
        <CalendarGridDayCell {...props} key={day.key} day={day} dayIndex={dayIndex} />
      ))}
    </tr>
  );
};
