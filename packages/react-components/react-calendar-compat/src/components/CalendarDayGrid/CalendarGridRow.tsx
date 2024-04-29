import * as React from 'react';
import { getWeekNumbersInMonth } from '../../utils';
import { CalendarGridDayCell } from './CalendarGridDayCell';
import type { CalendarDayGridProps, CalendarDayGridStyles } from './CalendarDayGrid.types';
import type { DayInfo } from './CalendarDayGrid';
import type { WeekCorners } from './useWeekCornerStyles.styles';

/**
 * @internal
 */
export interface CalendarGridRowProps extends CalendarDayGridProps {
  classNames: CalendarDayGridStyles;
  weeks: DayInfo[][];
  week: DayInfo[];
  weekIndex: number;
  weekCorners?: WeekCorners;
  ariaHidden?: boolean;
  rowClassName?: string;
  ariaRole?: string;
  navigatedDayRef: React.MutableRefObject<HTMLTableCellElement>;
  activeDescendantId: string;
  calculateRoundedStyles(above: boolean, below: boolean, left: boolean, right: boolean): string;
  getDayInfosInRangeOfDay(dayToCompare: DayInfo): DayInfo[];
  getRefsFromDayInfos(dayInfosInRange: DayInfo[]): (HTMLElement | null)[];
}

/**
 * @internal
 */
export const CalendarGridRow: React.FunctionComponent<CalendarGridRowProps> = props => {
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
    ? strings.weekNumberFormatString && strings.weekNumberFormatString.replace('{0}', `${weekNumbers[weekIndex]}`)
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
      {week.map((day: DayInfo, dayIndex: number) => (
        <CalendarGridDayCell {...props} key={day.key} day={day} dayIndex={dayIndex} />
      ))}
    </tr>
  );
};
