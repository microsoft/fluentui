import * as React from 'react';
import { format } from '@uifabric/utilities';
import { getWeekNumbersInMonth } from '@fluentui/date-time-utilities';
import { ICalendarDayGridProps, ICalendarDayGridStyles } from './CalendarDayGrid.types';
import { IProcessedStyleSet } from '@uifabric/styling';
import { CalendarGridDayCell } from './CalendarGridDayCell';
import { IDayInfo, IWeekCorners } from './CalendarDayGrid.base';

export interface ICalendarGridRowProps extends ICalendarDayGridProps {
  classNames: IProcessedStyleSet<ICalendarDayGridStyles>;
  weeks: IDayInfo[][];
  week: IDayInfo[];
  weekIndex: number;
  weekCorners?: IWeekCorners;
  ariaHidden?: boolean;
  rowClassName?: string;
  ariaRole?: string;
  navigatedDayRef: React.RefObject<HTMLButtonElement>;
  activeDescendantId: string;
  calculateRoundedStyles(
    classNames: IProcessedStyleSet<ICalendarDayGridStyles>,
    above: boolean,
    below: boolean,
    left: boolean,
    right: boolean,
  ): string;
  getDayInfosInRangeOfDay(dayToCompare: IDayInfo, daysToSelectInDayView?: number): IDayInfo[];
  getRefsFromDayInfos(dayInfosInRange: IDayInfo[]): (HTMLElement | null)[];
  onDragSelectStart(startDay: IDayInfo): void;
  onDragSelectOverDay(day: IDayInfo): void;
  onDragSelectEnd(endDay: IDayInfo): void;
}

export const CalendarGridRow = (props: ICalendarGridRowProps): JSX.Element => {
  const {
    classNames,
    week,
    weeks,
    weekIndex,
    rowClassName,
    ariaRole,
    showWeekNumbers,
    firstDayOfWeek,
    firstWeekOfYear,
    navigatedDate,
    strings,
  } = props;
  const weekNumbers = showWeekNumbers
    ? getWeekNumbersInMonth(weeks!.length, firstDayOfWeek, firstWeekOfYear, navigatedDate)
    : null;

  const titleString = weekNumbers
    ? strings.weekNumberFormatString && format(strings.weekNumberFormatString, weekNumbers[weekIndex])
    : '';

  return (
    <tr role={ariaRole} className={rowClassName} key={weekIndex + '_' + week[0].key}>
      {showWeekNumbers && weekNumbers && (
        <th
          className={classNames.weekNumberCell}
          key={weekIndex}
          title={titleString}
          aria-label={titleString}
          scope="row"
        >
          <span>{weekNumbers[weekIndex]}</span>
        </th>
      )}
      {week.map((day: IDayInfo, dayIndex: number) => (
        <CalendarGridDayCell {...props} key={day.key} day={day} dayIndex={dayIndex} />
      ))}
    </tr>
  );
};
