'use client';

import * as React from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from '@fluentui/keyboard-keys';
import { ArrowDownRegular, ArrowUpRegular } from '@fluentui/react-icons';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { getIntrinsicElementProps, slot, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
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
} from '../../utils';
import { useCalendarContext_unstable } from '../../contexts/calendarContext';
import {
  getCalendarEventType,
  getCalendarNavigationButtonProps,
  onCalendarEnterKeyDown,
} from '../../utils/calendarHeader';
import { getCalendarPickerRows, useCalendarPickerGrid } from '../../hooks/useCalendarPickerGrid';
import { useAnimateBackwards } from '../../hooks/useAnimateBackwards';
import { DirectionalSlideIn } from '../../utils/calendarMotions';
import { CalendarYear } from '../CalendarYear/CalendarYear';
import type { CalendarYearHandle, CalendarYearProps, CalendarYearSelectData } from '../CalendarYear/CalendarYear.types';
import type {
  CalendarMonthBaseProps,
  CalendarMonthBaseState,
  CalendarMonthCell,
  CalendarMonthHandle,
  CalendarMonthProps,
  CalendarMonthRow,
  CalendarMonthState,
} from './CalendarMonth.types';

type ButtonEvent = React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;

/**
 * Create the base state required to render an unstyled CalendarMonth.
 * The grid owns arrow navigation and its roving tab stop, so the base state is complete without a focus runtime.
 * The year picker slot is left for the caller to resolve, so each layer renders its own CalendarYear.
 */
export const useCalendarMonthBase_unstable = (
  props: CalendarMonthBaseProps,
  ref: React.Ref<CalendarMonthHandle>,
): CalendarMonthBaseState => {
  // The context value only changes when Calendar re-renders the pickers anyway, so it is read as a whole.
  const {
    allFocusable,
    dateRangeType,
    firstDayOfWeek,
    formatters,
    highlightCurrent: highlightCurrentMonth,
    maxDate,
    minDate,
    restrictedDates,
    workWeekDays,
    today: contextToday,
    value,
  } = useCalendarContext_unstable(ctx => ctx);

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
  const selectedDate = props.selectedDate !== undefined ? props.selectedDate : value === undefined ? today : value;
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
      const availableDates = getDateRange(date, 'month', firstDayOfWeek).filter(
        rangeDate => !isRestrictedDate(rangeDate, restrictedDatesOptions),
      );
      if (!availableDates.length) {
        return;
      }
      date = availableDates.find(rangeDate => compareDatePart(rangeDate, date) === 0) ?? availableDates[0];
      const selectedDateRange = getDateRange(date, dateRangeType, firstDayOfWeek, workWeekDays).filter(
        rangeDate => !isRestrictedDate(rangeDate, restrictedDatesOptions),
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

  const months: CalendarMonthCell[] = Array.from({ length: 12 }, (_, monthIndex) => {
    const indexedMonth = setMonth(navigatedDate, monthIndex);
    return {
      index: monthIndex,
      label: formatters.dateTime({ date: indexedMonth, format: 'shortMonth' }),
      isNavigated: navigatedDate.getMonth() === monthIndex,
      isCurrent:
        highlightCurrentMonth && today.getFullYear() === navigatedDate.getFullYear() && today.getMonth() === monthIndex,
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
      props: {
        'aria-label': formatters.dateTime({ date: indexedMonth, format: 'month' }),
      },
    };
  });

  const focusableMonth =
    months.find(month => month.isNavigated && (month.isInBounds || allFocusable)) ??
    months.find(month => month.isInBounds);
  const [gridSlot, getCell] = useCalendarPickerGrid(
    grid,
    yearString,
    allFocusable,
    focusableMonth?.index,
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

  React.useImperativeHandle(ref, () => ({ focus }));

  React.useEffect(() => {
    if (focusOnUpdate.current) {
      focus();
      focusOnUpdate.current = false;
    }
  });

  for (const month of months) {
    month.isNavigated = month === focusableMonth;
  }
  const monthRows: CalendarMonthRow[] = getCalendarPickerRows(months, allFocusable, month => [
    !month.isInBounds,
    month.isSelected,
    month.isCurrent,
    month.isNavigated,
  ]);

  let yearPickerProps: CalendarYearProps | undefined;
  if (isYearPickerVisible) {
    yearPickerProps = {
      navigatedYear: navigatedDate.getFullYear(),
      selectedYear: selectedDate === null ? null : selectedDate?.getFullYear(),
      onHeaderSelect: onYearPickerHeaderSelect,
      onSelectYear,
    };
  }

  const onSelectPrevYear = (ev: ButtonEvent) => navigate(ev, addYears(navigatedDate, -1), false);
  const onSelectNextYear = (ev: ButtonEvent) => navigate(ev, addYears(navigatedDate, 1), false);

  return {
    isYearPickerVisible,
    monthRows,
    navigatedYear: navigatedDate.getFullYear(),
    yearPickerRef,
    components: {
      root: 'div',
      header: 'div',
      heading: 'button',
      navigation: 'div',
      previousYearButton: 'button',
      nextYearButton: 'button',
      grid: 'div',
      yearPicker: 'div',
    },
    root: slot.always(getIntrinsicElementProps('div', { ...props, 'data-fui-calendar-picker': 'month' }), {
      elementType: 'div',
    }),
    header: slot.always(header, { elementType: 'div' }),
    heading: slot.always(heading, {
      defaultProps: {
        'aria-label': formatters.monthPickerHeaderLabel({ date: navigatedDate, formattedDate: yearString }),
        children: (
          <span aria-live="polite" aria-atomic="true">
            {yearString}
          </span>
        ),
        onClick: onHeaderSelect,
        onKeyDown: onCalendarEnterKeyDown(onHeaderSelect),
        tabIndex: headerIsClickable ? 0 : -1,
        type: 'button',
      },
      elementType: 'button',
    }),
    navigation: slot.always(navigation, { elementType: 'div' }),
    previousYearButton: slot.always(previousYearButton, {
      defaultProps: getCalendarNavigationButtonProps(
        isPrevYearInBounds,
        allFocusable,
        formatters.previousYearLabel({
          date: addYears(navigatedDate, -1),
          formattedDate: formatters.dateTime({ date: addYears(navigatedDate, -1), format: 'year' }),
        }),
        onSelectPrevYear,
      ),
      elementType: 'button',
    }),
    nextYearButton: slot.always(nextYearButton, {
      defaultProps: getCalendarNavigationButtonProps(
        isNextYearInBounds,
        allFocusable,
        formatters.nextYearLabel({
          date: addYears(navigatedDate, 1),
          formattedDate: formatters.dateTime({ date: addYears(navigatedDate, 1), format: 'year' }),
        }),
        onSelectNextYear,
      ),
      elementType: 'button',
    }),
    grid: gridSlot,
    yearPicker: slot.always(yearPicker, {
      defaultProps: yearPickerProps,
      elementType: 'div',
    }),
    headerIsClickable,
    isPrevYearInBounds,
    isNextYearInBounds,
  };
};

/**
 * Create the state required to render CalendarMonth.
 */
export const useCalendarMonth_unstable = (
  props: CalendarMonthProps,
  ref: React.Ref<CalendarMonthHandle>,
): CalendarMonthState => {
  const state = useCalendarMonthBase_unstable(props, ref);
  // The grid owns its arrow keys; the Tabster group only keeps an enclosing Tabster mover from handling them.
  const arrowNavigationAttributes = useArrowNavigationGroup({
    axis: 'grid',
    ignoreDefaultKeydown: { [ArrowDown]: true, [ArrowLeft]: true, [ArrowRight]: true, [ArrowUp]: true },
  });
  const animateBackwards = useAnimateBackwards(state.navigatedYear);
  const yearPicker = slot.always(props.yearPicker, {
    defaultProps: state.yearPicker,
    elementType: CalendarYear,
  });
  yearPicker.ref = useMergedRefs(state.yearPickerRef, yearPicker.ref);

  Object.assign(state.grid, arrowNavigationAttributes);
  /* eslint-disable react-hooks/immutability */
  if (state.previousYearButton.children === undefined) {
    state.previousYearButton.children = <ArrowUpRegular />;
  }
  if (state.nextYearButton.children === undefined) {
    state.nextYearButton.children = <ArrowDownRegular />;
  }
  state.wrapRow = row => (
    <DirectionalSlideIn
      animationDirection="vertical"
      animateBackwards={animateBackwards}
      replayKey={state.navigatedYear}
    >
      {row}
    </DirectionalSlideIn>
  );
  /* eslint-enable react-hooks/immutability */

  return {
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      yearPicker: CalendarYear,
    },
    yearPicker,
  };
};
