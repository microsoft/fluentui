import * as React from 'react';
import { KeyCodes, css, getRTLSafeKeyCode } from '@fluentui/utilities';
import { addDays, addWeeks, compareDates, findAvailableDate, DateRangeType } from '@fluentui/date-time-utilities';
import type { IAvailableDateOptions } from '@fluentui/date-time-utilities';
import type { IDayInfo } from './CalendarDayGrid.base';
import type { ICalendarGridRowProps } from './CalendarGridRow';

export interface ICalendarGridDayCellProps extends ICalendarGridRowProps {
  day: IDayInfo;
  dayIndex: number;
}

export const CalendarGridDayCell: React.FunctionComponent<ICalendarGridDayCellProps> = props => {
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

  const navigateMonthEdge = (ev: React.KeyboardEvent<HTMLElement>, date: Date): void => {
    let targetDate: Date | undefined = undefined;
    let direction = 1; // by default search forward

    // eslint-disable-next-line deprecation/deprecation
    if (ev.which === KeyCodes.up) {
      targetDate = addWeeks(date, -1);
      direction = -1;
      // eslint-disable-next-line deprecation/deprecation
    } else if (ev.which === KeyCodes.down) {
      targetDate = addWeeks(date, 1);
      // eslint-disable-next-line deprecation/deprecation
    } else if (ev.which === getRTLSafeKeyCode(KeyCodes.left)) {
      targetDate = addDays(date, -1);
      direction = -1;
      // eslint-disable-next-line deprecation/deprecation
    } else if (ev.which === getRTLSafeKeyCode(KeyCodes.right)) {
      targetDate = addDays(date, 1);
    }

    if (!targetDate) {
      // if we couldn't find a target date at all, do nothing
      return;
    }

    const findAvailableDateOptions: IAvailableDateOptions = {
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
      weeks.slice(1, weeks.length - 1).some((week: IDayInfo[]) => {
        return week.some((dayToCompare: IDayInfo) => {
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

    dayRefs.forEach((dayRef: HTMLElement, index: number) => {
      if (dayRef) {
        dayRef.classList.add('ms-CalendarDay-hoverStyle');
        if (
          !dayInfos[index].isSelected &&
          dateRangeType === DateRangeType.Day &&
          daysToSelectInDayView &&
          daysToSelectInDayView > 1
        ) {
          // remove the static classes first to overwrite them
          dayRef.classList.remove(
            classNames.bottomLeftCornerDate!,
            classNames.bottomRightCornerDate!,
            classNames.topLeftCornerDate!,
            classNames.topRightCornerDate!,
          );

          const classNamesToAdd = calculateRoundedStyles(
            classNames,
            false,
            false,
            index > 0,
            index < dayRefs.length - 1,
          ).trim();
          if (classNamesToAdd) {
            dayRef.classList.add(...classNamesToAdd.split(' '));
          }
        }
      }
    });
  };

  const onMouseDownDay = (ev: React.MouseEvent<HTMLElement>) => {
    const dayInfos = getDayInfosInRangeOfDay(day);
    const dayRefs = getRefsFromDayInfos(dayInfos);

    dayRefs.forEach((dayRef: HTMLElement) => {
      if (dayRef) {
        dayRef.classList.add('ms-CalendarDay-pressedStyle');
      }
    });
  };

  const onMouseUpDay = (ev: React.MouseEvent<HTMLElement>) => {
    const dayInfos = getDayInfosInRangeOfDay(day);
    const dayRefs = getRefsFromDayInfos(dayInfos);

    dayRefs.forEach((dayRef: HTMLElement) => {
      if (dayRef) {
        dayRef.classList.remove('ms-CalendarDay-pressedStyle');
      }
    });
  };

  const onMouseOutDay = (ev: React.MouseEvent<HTMLElement>) => {
    const dayInfos = getDayInfosInRangeOfDay(day);
    const dayRefs = getRefsFromDayInfos(dayInfos);

    dayRefs.forEach((dayRef: HTMLElement, index: number) => {
      if (dayRef) {
        dayRef.classList.remove('ms-CalendarDay-hoverStyle');
        dayRef.classList.remove('ms-CalendarDay-pressedStyle');
        if (
          !dayInfos[index].isSelected &&
          dateRangeType === DateRangeType.Day &&
          daysToSelectInDayView &&
          daysToSelectInDayView > 1
        ) {
          const classNamesToAdd = calculateRoundedStyles(
            classNames,
            false,
            false,
            index > 0,
            index < dayRefs.length - 1,
          ).trim();
          if (classNamesToAdd) {
            dayRef.classList.remove(...classNamesToAdd.split(' '));
          }
        }
      }
    });
  };

  const onDayKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    // eslint-disable-next-line deprecation/deprecation
    if (ev.which === KeyCodes.enter) {
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

  return (
    <td
      className={css(
        classNames.dayCell,
        weekCorners && cornerStyle,
        day.isSelected && classNames.daySelected,
        day.isSelected && 'ms-CalendarDay-daySelected',
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
      tabIndex={isNavigatedDate ? 0 : undefined}
      aria-current={day.isToday ? 'date' : undefined}
      aria-selected={day.isInBounds ? day.isSelected : undefined}
      data-is-focusable={!ariaHidden && (allFocusable || (day.isInBounds ? true : undefined))}
    >
      <button
        key={day.key + 'button'}
        aria-hidden={ariaHidden}
        className={css(
          classNames.dayButton,
          day.isToday && classNames.dayIsToday,
          day.isToday && 'ms-CalendarDay-dayIsToday',
        )}
        aria-label={ariaLabel}
        id={isNavigatedDate ? activeDescendantId : undefined}
        disabled={!ariaHidden && !day.isInBounds}
        type="button"
        tabIndex={-1}
        data-is-focusable="false"
      >
        <span aria-hidden="true">{dateTimeFormatter.formatDay(day.originalDate)}</span>
        {day.isMarked && <div aria-hidden="true" className={classNames.dayMarker} />}
      </button>
    </td>
  );
};
