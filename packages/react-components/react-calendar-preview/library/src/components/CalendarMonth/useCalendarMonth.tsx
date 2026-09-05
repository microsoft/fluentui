'use client';

import * as React from 'react';
import { Enter } from '@fluentui/keyboard-keys';
import { ArrowDownRegular, ArrowUpRegular } from '@fluentui/react-icons';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { getIntrinsicElementProps, slot, useEventCallback } from '@fluentui/react-utilities';
import { addYears, compareDatePart, getMonthEnd, getMonthStart, getYearEnd, getYearStart, setMonth } from '../../utils';
import { useCalendarContext_unstable } from '../../contexts/calendarContext';
import { CalendarYear } from '../CalendarYear/CalendarYear';
import { CalendarMonthGridRow } from '../CalendarMonthGridRow/CalendarMonthGridRow';
import type { CalendarYearHandle, CalendarYearProps, CalendarYearSelectData } from '../CalendarYear/CalendarYear.types';
import type {
  CalendarMonthBaseProps,
  CalendarMonthBaseState,
  CalendarMonthCell,
  CalendarMonthHandle,
  CalendarMonthProps,
  CalendarMonthState,
} from './CalendarMonth.types';

const MONTHS_PER_ROW = 4;

const noop = () => undefined;

const onButtonKeyDown =
  (
    callback?: (ev: React.KeyboardEvent<HTMLButtonElement>) => void,
  ): ((ev: React.KeyboardEvent<HTMLButtonElement>) => void) =>
  ev => {
    if (ev.key === Enter) {
      callback?.(ev);
    }
  };

function isCurrentMonth(month: number, year: number, today: Date): boolean {
  return today.getFullYear() === year && today.getMonth() === month;
}

/**
 * Create the base state required to render an unstyled CalendarMonth.
 * Free of Tabster so the headless layer can supply its own roving focus; the styled
 * `useCalendarMonth_unstable` adds arrow key navigation on top.
 */
export const useCalendarMonthBase_unstable = (
  props: CalendarMonthBaseProps,
  ref: React.Ref<CalendarMonthHandle>,
): CalendarMonthBaseState => {
  const allFocusable = useCalendarContext_unstable(ctx => ctx.allFocusable);
  const formatDateTime = useCalendarContext_unstable(ctx => ctx.formatDateTime);
  const formatLabel = useCalendarContext_unstable(ctx => ctx.formatLabel);
  const highlightCurrentMonth = useCalendarContext_unstable(ctx => ctx.highlightCurrent);
  const highlightSelectedMonth = useCalendarContext_unstable(ctx => ctx.highlightSelected);
  const maxDate = useCalendarContext_unstable(ctx => ctx.maxDate);
  const minDate = useCalendarContext_unstable(ctx => ctx.minDate);
  const contextToday = useCalendarContext_unstable(ctx => ctx.today);
  const value = useCalendarContext_unstable(ctx => ctx.value);

  const {
    grid,
    header,
    navigation,
    nextYearButton,
    onHeaderSelect: onUserHeaderSelect,
    onNavigateDate = noop,
    previousYearButton,
    heading,
    yearPicker,
    yearPickerHidden = false,
  } = props;

  const today = React.useMemo(() => contextToday ?? new Date(), [contextToday]);
  const navigatedDate = props.navigatedDate ?? today;
  const selectedDate = props.selectedDate ?? value ?? today;

  const navigatedMonthRef = React.useRef<HTMLButtonElement>(null);
  const yearPickerRef = React.useRef<CalendarYearHandle>(null);
  const focusOnUpdate = React.useRef(false);

  const [isYearPickerVisible, setIsYearPickerVisible] = React.useState(false);

  const focus = React.useCallback(() => {
    if (yearPickerRef.current) {
      yearPickerRef.current.focus();
    } else {
      navigatedMonthRef.current?.focus();
    }
  }, []);

  React.useImperativeHandle(ref, () => ({ focus }), [focus]);

  React.useEffect(() => {
    if (focusOnUpdate.current) {
      focus();
      focusOnUpdate.current = false;
    }
  });

  const focusOnNextUpdate = () => {
    focusOnUpdate.current = true;
  };

  const onSelectMonth = useEventCallback(
    (ev: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>, newMonth: number): void => {
      const type = ev.type === 'keydown' ? 'keydown' : 'click';
      // If header is clickable the calendars are overlaid, switch back to day picker when month is clicked
      onUserHeaderSelect?.(ev, { event: ev, type });
      onNavigateDate(ev, {
        event: ev,
        type,
        date: setMonth(navigatedDate, newMonth),
        focusOnNavigatedDay: true,
      });
    },
  );

  const onSelectPrevYear = useEventCallback(
    (ev: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) =>
      onNavigateDate(ev, {
        event: ev,
        type: ev.type === 'keydown' ? 'keydown' : 'click',
        date: addYears(navigatedDate, -1),
        focusOnNavigatedDay: false,
      }),
  );
  const onSelectNextYear = useEventCallback(
    (ev: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) =>
      onNavigateDate(ev, {
        event: ev,
        type: ev.type === 'keydown' ? 'keydown' : 'click',
        date: addYears(navigatedDate, 1),
        focusOnNavigatedDay: false,
      }),
  );

  const onHeaderSelect = useEventCallback(
    (ev: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>): void => {
      if (!yearPickerHidden) {
        focusOnNextUpdate();
        setIsYearPickerVisible(true);
      } else {
        onUserHeaderSelect?.(ev, { event: ev, type: ev.type === 'keydown' ? 'keydown' : 'click' });
      }
    },
  );

  const onSelectYear = useEventCallback((ev: React.SyntheticEvent | Event, data: CalendarYearSelectData) => {
    const selectedYear = data.year;
    focusOnNextUpdate();
    const navYear = navigatedDate.getFullYear();
    if (navYear !== selectedYear) {
      let newNavigationDate = new Date(navigatedDate.getTime());
      newNavigationDate.setFullYear(selectedYear);
      /*
       * for min and max dates, adjust the new navigation date - perhaps this should be
       * checked on the master navigation date handler (i.e. in Calendar)
       */
      if (maxDate && newNavigationDate > maxDate) {
        newNavigationDate = setMonth(newNavigationDate, maxDate.getMonth());
      } else if (minDate && newNavigationDate < minDate) {
        newNavigationDate = setMonth(newNavigationDate, minDate.getMonth());
      }
      onNavigateDate(ev, {
        ...data,
        date: newNavigationDate,
        focusOnNavigatedDay: true,
      });
    }
    setIsYearPickerVisible(false);
  });

  const onYearPickerHeaderSelect = useEventCallback((_ev: React.SyntheticEvent | Event, _data): void => {
    focusOnNextUpdate();
    setIsYearPickerVisible(false);
  });

  const yearString = formatDateTime(navigatedDate, 'year');
  const headerAriaLabel = formatLabel('monthPickerHeader', { date: navigatedDate, formattedDate: yearString });

  const isPrevYearInBounds = minDate ? compareDatePart(minDate, getYearStart(navigatedDate)) < 0 : true;
  const isNextYearInBounds = maxDate ? compareDatePart(getYearEnd(navigatedDate), maxDate) < 0 : true;

  const headerIsClickable = !!onUserHeaderSelect || !yearPickerHidden;

  const monthRows: CalendarMonthCell[][] = [];
  for (let rowNum = 0; rowNum < 12 / MONTHS_PER_ROW; rowNum++) {
    const row = Array.from({ length: MONTHS_PER_ROW }, (_, index: number) => {
      const monthIndex = rowNum * MONTHS_PER_ROW + index;
      const indexedMonth = setMonth(navigatedDate, monthIndex);

      return {
        index: monthIndex,
        label: formatDateTime(indexedMonth, 'shortMonth'),
        ariaLabel: formatDateTime(indexedMonth, 'month'),
        isNavigated: navigatedDate.getMonth() === monthIndex,
        isCurrent: !!highlightCurrentMonth && isCurrentMonth(monthIndex, navigatedDate.getFullYear(), today),
        isSelected:
          !!highlightSelectedMonth &&
          selectedDate.getMonth() === monthIndex &&
          selectedDate.getFullYear() === navigatedDate.getFullYear(),
        isInBounds:
          (minDate ? compareDatePart(minDate, getMonthEnd(indexedMonth)) < 1 : true) &&
          (maxDate ? compareDatePart(getMonthStart(indexedMonth), maxDate) < 1 : true),
        onSelect: (ev: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) =>
          onSelectMonth(ev, monthIndex),
      };
    });
    monthRows.push(row);
  }

  let yearPickerProps: CalendarYearProps | undefined;
  if (isYearPickerVisible) {
    yearPickerProps = {
      navigatedYear: navigatedDate.getFullYear(),
      selectedYear: selectedDate.getFullYear(),
      onHeaderSelect: onYearPickerHeaderSelect,
      onSelectYear,
    };
  }

  return {
    isYearPickerVisible,
    monthRows,
    navigatedMonthRef,
    navigatedYear: navigatedDate.getFullYear(),
    yearPickerRef,
    yearString,
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
    root: slot.always(getIntrinsicElementProps('div', props), { elementType: 'div' }),
    header: slot.always(header, { elementType: 'div' }),
    heading: slot.always(heading, {
      defaultProps: {
        'aria-label': headerAriaLabel,
        children: (
          <span aria-live="polite" aria-atomic="true">
            {yearString}
          </span>
        ),
        onClick: onHeaderSelect,
        onKeyDown: onButtonKeyDown(onHeaderSelect),
        tabIndex: headerIsClickable ? 0 : -1,
        type: 'button',
      },
      elementType: 'button',
    }),
    navigation: slot.always(navigation, { elementType: 'div' }),
    previousYearButton: slot.always(previousYearButton, {
      defaultProps: {
        'aria-disabled': !isPrevYearInBounds,
        onClick: isPrevYearInBounds ? onSelectPrevYear : undefined,
        onKeyDown: isPrevYearInBounds ? onButtonKeyDown(onSelectPrevYear) : undefined,
        tabIndex: isPrevYearInBounds ? undefined : allFocusable ? 0 : -1,
        title: formatLabel('previousYear', {
          date: addYears(navigatedDate, -1),
          formattedDate: formatDateTime(addYears(navigatedDate, -1), 'year'),
        }),
        type: 'button',
      },
      elementType: 'button',
    }),
    nextYearButton: slot.always(nextYearButton, {
      defaultProps: {
        'aria-disabled': !isNextYearInBounds,
        onClick: isNextYearInBounds ? onSelectNextYear : undefined,
        onKeyDown: isNextYearInBounds ? onButtonKeyDown(onSelectNextYear) : undefined,
        tabIndex: isNextYearInBounds ? undefined : allFocusable ? 0 : -1,
        title: formatLabel('nextYear', {
          date: addYears(navigatedDate, 1),
          formattedDate: formatDateTime(addYears(navigatedDate, 1), 'year'),
        }),
        type: 'button',
      },
      elementType: 'button',
    }),
    grid: slot.always(grid, {
      defaultProps: {
        'aria-label': yearString,
        role: 'grid',
      },
      elementType: 'div',
    }),
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
  const baseState = useCalendarMonthBase_unstable(props, ref);
  const arrowNavigationAttributes = useArrowNavigationGroup({ axis: 'grid' });

  return {
    ...baseState,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...baseState.components,
      yearPicker: CalendarYear,
    },
    grid: slot.always(props.grid, {
      defaultProps: {
        ...baseState.grid,
        ...arrowNavigationAttributes,
        children: baseState.monthRows.map((_, rowNum: number) => (
          <CalendarMonthGridRow key={rowNum} rowIndex={rowNum} />
        )),
      },
      elementType: 'div',
    }),
    yearPicker: slot.always(props.yearPicker, {
      defaultProps: { ...baseState.yearPicker, ref: baseState.yearPickerRef },
      elementType: CalendarYear,
    }),
    previousYearButton: slot.always(props.previousYearButton, {
      defaultProps: {
        ...baseState.previousYearButton,
        children: <ArrowUpRegular />,
      },
      elementType: 'button',
    }),
    nextYearButton: slot.always(props.nextYearButton, {
      defaultProps: {
        ...baseState.nextYearButton,
        children: <ArrowDownRegular />,
      },
      elementType: 'button',
    }),
  };
};
