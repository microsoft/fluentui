'use client';

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
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  navigatedDayRef: React.MutableRefObject<HTMLTableCellElement | null>;
  activeDescendantId: string;
  calculateRoundedStyles(above: boolean, below: boolean, left: boolean, right: boolean): string;
  getDayInfosInRangeOfDay(dayToCompare: DayInfo): DayInfo[];
  getRefsFromDayInfos(dayInfosInRange: DayInfo[]): (HTMLElement | null)[];
}

/**
 * @internal
 */
export const CalendarGridRow = React.forwardRef<HTMLTableRowElement, CalendarGridRowProps>((props, ref) => {
  const {
    ariaHidden,
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
    // No `key` here — the parent DirectionalSlide already has a stable key for this row.
    // A date-based key (e.g. `weekIndex + '_' + week[0].key`) would remount the <tr> on every
    // navigation, detaching it from Slide.In's Web Animation handle and silently breaking replay.
    // Day cells inside reconcile correctly via their own `key={day.key}`.
    <tr ref={ref} role={ariaRole} aria-hidden={ariaHidden} className={rowClassName}>
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
});

CalendarGridRow.displayName = 'CalendarGridRow';
