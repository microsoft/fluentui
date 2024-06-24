import * as React from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Enter } from '@fluentui/keyboard-keys';
import { getRTLSafeKey } from '@fluentui/react-utilities';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { mergeClasses } from '@griffel/react';
import { addDays, addWeeks, compareDates, findAvailableDate, DateRangeType } from '../../utils';
import { weekCornersClassNames } from './useWeekCornerStyles.styles';
import { extraCalendarDayGridClassNames } from './useCalendarDayGridStyles.styles';
import type { AvailableDateOptions } from '../../utils';
import type { DayInfo } from './CalendarDayGrid';
import type { CalendarGridRowProps } from './CalendarGridRow';

/**
 * @internal
 */
export interface CalendarGridDayCellProps extends CalendarGridRowProps {
  day: DayInfo;
  dayIndex: number;
}

/**
 * @internal
 */
export const CalendarGridDayCell: React.FunctionComponent<CalendarGridDayCellProps> = props => {
  'use no memo';

  const {
    navigatedDate,
    dateTimeFormatter,
    allFocusable,
    strings,
    activeDescendantId,
    navigatedDayRef,
    calculateRoundedStyles,
    weeks,
    classNames,
    day,
    dayIndex,
    weekIndex,
    weekCorners,
    ariaHidden,
    customDayCellRef,
    dateRangeType,
    daysToSelectInDayView,
    onSelectDate,
    restrictedDates,
    minDate,
    maxDate,
    onNavigateDate,
    getDayInfosInRangeOfDay,
    getRefsFromDayInfos,
  } = props;
  const cornerStyle = weekCorners?.[weekIndex + '_' + dayIndex] ?? '';
  const isNavigatedDate = compareDates(navigatedDate, day.originalDate);

  const { dir } = useFluent_unstable();

  const navigateMonthEdge = (ev: React.KeyboardEvent<HTMLElement>, date: Date): void => {
    let targetDate: Date | undefined = undefined;
    let direction = 1; // by default search forward

    if (ev.key === ArrowUp) {
      targetDate = addWeeks(date, -1);
      direction = -1;
    } else if (ev.key === ArrowDown) {
      targetDate = addWeeks(date, 1);
    } else if (ev.key === getRTLSafeKey(ArrowLeft, dir)) {
      targetDate = addDays(date, -1);
      direction = -1;
    } else if (ev.key === getRTLSafeKey(ArrowRight, dir)) {
      targetDate = addDays(date, 1);
    }

    if (!targetDate) {
      // if we couldn't find a target date at all, do nothing
      return;
    }

    const findAvailableDateOptions: AvailableDateOptions = {
      initialDate: date,
      targetDate,
      direction,
      restrictedDates,
      minDate,
      maxDate,
    };

    // target date is restricted, search in whatever direction until finding the next possible date,
    // stopping at boundaries
    let nextDate = findAvailableDate(findAvailableDateOptions);

    if (!nextDate) {
      // if no dates available in initial direction, try going backwards
      findAvailableDateOptions.direction = -direction;
      nextDate = findAvailableDate(findAvailableDateOptions);
    }

    // if the nextDate is still inside the same focusZone area, let the focusZone handle setting the focus so we
    // don't jump the view unnecessarily
    const isInCurrentView =
      weeks &&
      nextDate &&
      weeks.slice(1, weeks.length - 1).some((week: DayInfo[]) => {
        return week.some((dayToCompare: DayInfo) => {
          return compareDates(dayToCompare.originalDate, nextDate!);
        });
      });
    if (isInCurrentView) {
      return;
    }

    // else, fire navigation on the date to change the view to show it
    if (nextDate) {
      onNavigateDate(nextDate, true);
      ev.preventDefault();
    }
  };

  const onMouseOverDay = (ev: React.MouseEvent<HTMLElement>) => {
    const dayInfos = getDayInfosInRangeOfDay(day);
    const dayRefs = getRefsFromDayInfos(dayInfos);

    dayRefs.forEach((dayRef: HTMLElement | null, index: number) => {
      if (dayRef) {
        dayRef.classList.add(extraCalendarDayGridClassNames.hoverStyle);
        if (
          !dayInfos[index].isSelected &&
          dateRangeType === DateRangeType.Day &&
          daysToSelectInDayView &&
          daysToSelectInDayView > 1
        ) {
          // remove the static classes first to overwrite them
          dayRef.classList.remove(
            weekCornersClassNames.bottomLeftCornerDate!,
            weekCornersClassNames.bottomRightCornerDate!,
            weekCornersClassNames.topLeftCornerDate!,
            weekCornersClassNames.topRightCornerDate!,
          );

          const classNamesToAdd = calculateRoundedStyles(false, false, index > 0, index < dayRefs.length - 1).trim();
          if (classNamesToAdd) {
            dayRef.classList.add(...classNamesToAdd.trim().split(' '));
          }
        }
      }
    });
  };

  const onMouseDownDay = (ev: React.MouseEvent<HTMLElement>) => {
    const dayInfos = getDayInfosInRangeOfDay(day);
    const dayRefs = getRefsFromDayInfos(dayInfos);

    dayRefs.forEach((dayRef: HTMLElement | null) => {
      if (dayRef) {
        dayRef.classList.add(extraCalendarDayGridClassNames.pressedStyle);
      }
    });
  };

  const onMouseUpDay = (ev: React.MouseEvent<HTMLElement>) => {
    const dayInfos = getDayInfosInRangeOfDay(day);
    const dayRefs = getRefsFromDayInfos(dayInfos);

    dayRefs.forEach((dayRef: HTMLElement | null) => {
      if (dayRef) {
        dayRef.classList.remove(extraCalendarDayGridClassNames.pressedStyle);
      }
    });
  };

  const onMouseOutDay = (ev: React.MouseEvent<HTMLElement>) => {
    const dayInfos = getDayInfosInRangeOfDay(day);
    const dayRefs = getRefsFromDayInfos(dayInfos);

    dayRefs.forEach((dayRef: HTMLElement | null, index: number) => {
      if (dayRef) {
        dayRef.classList.remove(extraCalendarDayGridClassNames.hoverStyle);
        dayRef.classList.remove(extraCalendarDayGridClassNames.pressedStyle);
        if (
          !dayInfos[index].isSelected &&
          dateRangeType === DateRangeType.Day &&
          daysToSelectInDayView &&
          daysToSelectInDayView > 1
        ) {
          const classNamesToAdd = calculateRoundedStyles(false, false, index > 0, index < dayRefs.length - 1).trim();
          if (classNamesToAdd) {
            dayRef.classList.remove(...classNamesToAdd.trim().split(' '));
          }
        }
      }
    });
  };

  const onDayKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    if (ev.key === Enter) {
      onSelectDate?.(day.originalDate);
    } else {
      navigateMonthEdge(ev, day.originalDate);
    }
  };

  let ariaLabel =
    day.originalDate.getDate() +
    ', ' +
    strings.months[day.originalDate.getMonth()] +
    ', ' +
    day.originalDate.getFullYear();

  if (day.isMarked) {
    ariaLabel = ariaLabel + ', ' + strings.dayMarkedAriaLabel;
  }

  const isFocusable = !ariaHidden && (allFocusable || (day.isInBounds ? true : undefined));

  return (
    <td
      className={mergeClasses(
        classNames.dayCell,
        weekCorners && cornerStyle,
        day.isSelected && !day.isSingleSelected && classNames.daySelected,
        day.isSingleSelected && classNames.daySingleSelected,
        !day.isInBounds && classNames.dayOutsideBounds,
        !day.isInMonth && classNames.dayOutsideNavigatedMonth,
      )}
      ref={(element: HTMLTableCellElement) => {
        customDayCellRef?.(element, day.originalDate, classNames);
        day.setRef(element);
        isNavigatedDate && (navigatedDayRef.current = element);
      }}
      aria-hidden={ariaHidden}
      aria-disabled={!ariaHidden && !day.isInBounds}
      onClick={day.isInBounds && !ariaHidden ? day.onSelected : undefined}
      onMouseOver={!ariaHidden ? onMouseOverDay : undefined}
      onMouseDown={!ariaHidden ? onMouseDownDay : undefined}
      onMouseUp={!ariaHidden ? onMouseUpDay : undefined}
      onMouseOut={!ariaHidden ? onMouseOutDay : undefined}
      onKeyDown={!ariaHidden ? onDayKeyDown : undefined}
      role="gridcell"
      tabIndex={isNavigatedDate || isFocusable ? 0 : undefined}
      aria-current={day.isToday ? 'date' : undefined}
      aria-selected={day.isInBounds ? day.isSelected : undefined}
    >
      <button
        key={day.key + 'button'}
        aria-hidden={ariaHidden}
        className={mergeClasses(classNames.dayButton, day.isToday && classNames.dayIsToday)}
        aria-label={ariaLabel}
        id={isNavigatedDate ? activeDescendantId : undefined}
        disabled={!ariaHidden && !day.isInBounds}
        type="button"
        tabIndex={-1}
      >
        <span className={day.isToday ? mergeClasses(classNames.dayTodayMarker) : undefined} aria-hidden="true">
          {dateTimeFormatter.formatDay(day.originalDate)}
        </span>
        {day.isMarked && <div aria-hidden="true" className={classNames.dayMarker} />}
      </button>
    </td>
  );
};
