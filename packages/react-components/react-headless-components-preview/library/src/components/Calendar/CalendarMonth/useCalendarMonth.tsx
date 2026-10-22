'use client';

import * as React from 'react';
import {
  getIntrinsicElementProps,
  mergeCallbacks,
  slot,
  useEventCallback,
  useMergedRefs,
} from '@fluentui/react-utilities';
import {
  addYears,
  compareDatePart,
  getDateRange,
  getMonthEnd,
  getMonthStart,
  getYearEnd,
  getYearStart,
  isRestrictedDate,
  setMonth,
} from '../utils';
import { useCalendarContext } from '../calendarContext';
import { mergeProps } from '../../../utils/mergeProps';
import { getAvailableDates } from '../utils/dateGrid/dateAvailability';
import {
  getCalendarEventType,
  onCalendarEnterKeyDown,
  resolveCalendarNavigationButton,
} from '../utils/calendarNavigation';
import { getCalendarPickerCellProps, getCalendarPickerRows, useCalendarPickerGrid } from '../hooks/useCalendarGrid';
import { CalendarYear } from '../CalendarYear/CalendarYear';
import type { CalendarYearHandle, CalendarYearProps, CalendarYearSelectData } from '../CalendarYear/CalendarYear.types';
import type { CalendarMonthProps, CalendarMonthState, CalendarMonthCellData } from './CalendarMonth.types';

type ButtonEvent = React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;

/**
 * Create the state required to render CalendarMonth.
 * Calendar owns selection, directional navigation and roving focus.
 * @param props - props from this instance of CalendarMonth
 * @param ref - reference to the root element of CalendarMonth
 */
export const useCalendarMonth = (props: CalendarMonthProps, ref: React.Ref<HTMLDivElement>): CalendarMonthState => {
  const {
    allFocusable,
    calendarMonthColumns,
    dateRangeType,
    firstDayOfWeek,
    formatters,
    maxDate,
    minDate,
    restrictedDates,
    workWeekDays,
    today: contextToday,
    value,
  } = useCalendarContext();

  const {
    grid,
    header,
    navigation,
    nextYearButton,
    onHeaderSelect: onUserHeaderSelect,
    onNavigateDate,
    onSelectDate,
    previousYearButton,
    heading,
    yearPicker,
    yearPickerHidden = false,
  } = props;

  const today = React.useMemo(() => contextToday ?? new Date(), [contextToday]);
  const navigatedDate = props.navigatedDate ?? today;
  const selectedDate = props.selectedDate !== undefined ? props.selectedDate : value ?? null;
  const restrictedDatesOptions = { minDate, maxDate, restrictedDates };

  const yearPickerRef = React.useRef<CalendarYearHandle>(null);
  const focusOnUpdate = React.useRef(false);

  const [isYearPickerVisible, setIsYearPickerVisible] = React.useState(false);

  const navigate = (ev: React.SyntheticEvent<HTMLElement>, date: Date, focusOnNavigatedDay: boolean) =>
    onNavigateDate?.(ev, { event: ev, type: getCalendarEventType(ev), date, focusOnNavigatedDay });

  const onSelectMonth = (ev: ButtonEvent, newMonth: number): void => {
    const type = getCalendarEventType(ev);
    let date = setMonth(navigatedDate, newMonth);
    if (onSelectDate) {
      const availableDates = getAvailableDates(getDateRange(date, 'month', firstDayOfWeek), restrictedDatesOptions);
      if (!availableDates.length) {
        return;
      }
      date = availableDates.find(rangeDate => compareDatePart(rangeDate, date) === 0) ?? availableDates[0];
      const selectedDateRange = getAvailableDates(
        getDateRange(date, dateRangeType, firstDayOfWeek, workWeekDays),
        restrictedDatesOptions,
      );
      onSelectDate(ev, { event: ev, type, date, selectedDateRange });
    }
    // If header is clickable the calendars are overlaid, switch back to day picker when month is clicked
    onUserHeaderSelect?.(ev, { event: ev, type });
    navigate(ev, date, true);
  };

  const onHeaderSelect = useEventCallback((ev: ButtonEvent): void => {
    if (!yearPickerHidden) {
      focusOnUpdate.current = true;
      setIsYearPickerVisible(true);
    } else {
      onUserHeaderSelect?.(ev, { event: ev, type: getCalendarEventType(ev) });
    }
  });

  const onSelectYear = useEventCallback((ev: React.SyntheticEvent | Event, data: CalendarYearSelectData) => {
    const selectedYear = data.year;
    focusOnUpdate.current = true;
    const navYear = navigatedDate.getFullYear();
    if (navYear !== selectedYear) {
      let newNavigationDate = addYears(navigatedDate, selectedYear - navYear);
      // for min and max dates, adjust the new navigation date
      if (maxDate && compareDatePart(newNavigationDate, maxDate) > 0) {
        newNavigationDate = setMonth(newNavigationDate, maxDate.getMonth());
        if (compareDatePart(newNavigationDate, maxDate) > 0) {
          newNavigationDate = maxDate;
        }
      } else if (minDate && compareDatePart(newNavigationDate, minDate) < 0) {
        newNavigationDate = setMonth(newNavigationDate, minDate.getMonth());
        if (compareDatePart(newNavigationDate, minDate) < 0) {
          newNavigationDate = minDate;
        }
      }
      onNavigateDate?.(ev, { ...data, date: newNavigationDate, focusOnNavigatedDay: true });
    }
    setIsYearPickerVisible(false);
  });

  const onYearPickerHeaderSelect = useEventCallback((): void => {
    focusOnUpdate.current = true;
    setIsYearPickerVisible(false);
  });

  const yearString = formatters.dateTime({ date: navigatedDate, format: 'year' });
  const isPrevYearInBounds = minDate ? compareDatePart(minDate, getYearStart(navigatedDate)) < 0 : true;
  const isNextYearInBounds = maxDate ? compareDatePart(getYearEnd(navigatedDate), maxDate) < 0 : true;
  const headerIsClickable = !!onUserHeaderSelect || !yearPickerHidden;

  const months: CalendarMonthCellData[] = Array.from({ length: 12 }, (_, monthIndex) => {
    const indexedMonth = setMonth(navigatedDate, monthIndex);
    const label = formatters.dateTime({ date: indexedMonth, format: 'shortMonth' });
    return {
      index: monthIndex,
      label,
      isNavigated: navigatedDate.getMonth() === monthIndex,
      isCurrent: today.getFullYear() === navigatedDate.getFullYear() && today.getMonth() === monthIndex,
      isSelected:
        !!selectedDate &&
        selectedDate.getMonth() === monthIndex &&
        selectedDate.getFullYear() === navigatedDate.getFullYear(),
      isInBounds:
        (minDate ? compareDatePart(minDate, getMonthEnd(indexedMonth)) < 1 : true) &&
        (maxDate ? compareDatePart(getMonthStart(indexedMonth), maxDate) < 1 : true) &&
        (!onSelectDate ||
          getDateRange(indexedMonth, 'month', firstDayOfWeek).some(
            date => !isRestrictedDate(date, restrictedDatesOptions),
          )),
    };
  });

  const focusableMonth =
    months.find(month => month.isNavigated && (month.isInBounds || allFocusable)) ??
    months.find(month => month.isInBounds);
  const [gridSlot, getCell] = useCalendarPickerGrid(
    grid,
    yearString,
    index => !!months[index]?.isInBounds,
    onSelectMonth,
  );

  const focus = (options?: FocusOptions) => {
    if (yearPickerRef.current) {
      yearPickerRef.current.focus(options);
    } else if (focusableMonth) {
      getCell(focusableMonth.index)?.focus(options);
    }
  };

  React.useImperativeHandle(props.imperativeRef, () => ({ focus }));

  React.useEffect(() => {
    if (focusOnUpdate.current) {
      focus();
      focusOnUpdate.current = false;
    }
  });

  for (const month of months) {
    month.isNavigated = month === focusableMonth;
  }
  const monthRows = getCalendarPickerRows(months, calendarMonthColumns);
  const getMonthCellProps: CalendarMonthState['getMonthCellProps'] = month => {
    const cellProps = getCalendarPickerCellProps(
      allFocusable,
      !month.isInBounds,
      month.isSelected,
      month.isCurrent,
      month.index === focusableMonth?.index,
    );
    const overrides = props.getCellProps?.(month);
    return {
      root: mergeProps(
        {
          ...cellProps.root,
          'aria-label': formatters.dateTime({ date: setMonth(navigatedDate, month.index), format: 'month' }),
        },
        overrides?.root,
      ),
      button: mergeProps({ ...cellProps.button, children: month.label }, overrides?.button),
    };
  };
  const getMonthRowProps: CalendarMonthState['getMonthRowProps'] = row => ({
    root: mergeProps({ role: 'row', focusgrouprow: '' }, props.getRowProps?.(row).root),
  });

  let yearPickerProps: CalendarYearProps | undefined;
  if (isYearPickerVisible) {
    yearPickerProps = {
      navigatedYear: navigatedDate.getFullYear(),
      selectedYear: selectedDate === null ? null : selectedDate?.getFullYear(),
      onHeaderSelect: onYearPickerHeaderSelect,
      onSelectYear,
    };
  }

  const previousYearDate = addYears(navigatedDate, -1);
  const nextYearDate = addYears(navigatedDate, 1);
  const onSelectPrevYear = (ev: ButtonEvent) => navigate(ev, previousYearDate, false);
  const onSelectNextYear = (ev: ButtonEvent) => navigate(ev, nextYearDate, false);

  const yearPickerSlot = slot.always(yearPicker, {
    defaultProps: yearPickerProps,
    elementType: CalendarYear,
  });
  yearPickerSlot.imperativeRef = useMergedRefs(yearPickerRef, yearPickerSlot.imperativeRef);
  const headingSlot = slot.always(heading, {
    defaultProps: {
      'aria-label': headerIsClickable
        ? formatters.monthPickerHeaderLabel({ date: navigatedDate, formattedDate: yearString })
        : undefined,
      children: (
        <span aria-live="polite" aria-atomic="true">
          {yearString}
        </span>
      ),
      tabIndex: headerIsClickable ? 0 : undefined,
      type: headerIsClickable ? 'button' : undefined,
    },
    elementType: headerIsClickable ? 'button' : 'div',
  });
  if (headerIsClickable) {
    headingSlot.onClick = mergeCallbacks(
      headingSlot.onClick as React.MouseEventHandler<HTMLElement> | undefined,
      ev => {
        if (!ev.isDefaultPrevented()) {
          onHeaderSelect(ev as React.MouseEvent<HTMLButtonElement>);
        }
      },
    );
    headingSlot.onKeyDown = mergeCallbacks(
      headingSlot.onKeyDown as React.KeyboardEventHandler<HTMLElement> | undefined,
      ev => {
        if (!ev.isDefaultPrevented()) {
          onCalendarEnterKeyDown<HTMLElement>(event => onHeaderSelect(event as React.KeyboardEvent<HTMLButtonElement>))(
            ev,
          );
        }
      },
    );
  }

  return {
    isYearPickerVisible,
    monthRows,
    getMonthCellProps,
    getMonthRowProps,
    components: {
      root: 'div',
      header: 'div',
      heading: headerIsClickable ? 'button' : 'div',
      navigation: 'div',
      previousYearButton: 'button',
      nextYearButton: 'button',
      grid: 'div',
      yearPicker: CalendarYear,
    },
    root: slot.always(getIntrinsicElementProps('div', { ...props, ref, 'data-fui-calendar-picker': 'month' }), {
      elementType: 'div',
    }),
    header: slot.always(header, { elementType: 'div' }),
    heading: headingSlot,
    navigation: slot.always(navigation, { elementType: 'div' }),
    previousYearButton: resolveCalendarNavigationButton(
      previousYearButton,
      isPrevYearInBounds,
      allFocusable,
      formatters.previousYearLabel({
        date: previousYearDate,
        formattedDate: formatters.dateTime({ date: previousYearDate, format: 'year' }),
      }),
      onSelectPrevYear,
    ),
    nextYearButton: resolveCalendarNavigationButton(
      nextYearButton,
      isNextYearInBounds,
      allFocusable,
      formatters.nextYearLabel({
        date: nextYearDate,
        formattedDate: formatters.dateTime({ date: nextYearDate, format: 'year' }),
      }),
      onSelectNextYear,
    ),
    grid: gridSlot,
    yearPicker: yearPickerSlot,
  };
};
