'use client';

import * as React from 'react';
import { Enter, Space } from '@fluentui/keyboard-keys';
import { ArrowDownRegular, ArrowUpRegular } from '@fluentui/react-icons';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { useCalendarContext_unstable } from '../../contexts/calendarContext';
import { CalendarYearGridRow } from '../CalendarYearGridRow/CalendarYearGridRow';
import type {
  CalendarYearBaseProps,
  CalendarYearBaseState,
  CalendarYearCell,
  CalendarYearHandle,
  CalendarYearProps,
  CalendarYearRange,
  CalendarYearState,
} from './CalendarYear.types';

const CELL_COUNT = 12;
const CELLS_PER_ROW = 4;

function useYearRangeState({
  selectedYear,
  navigatedYear,
  onNavigateDate,
  currentYear,
}: Pick<CalendarYearProps, 'navigatedYear' | 'onNavigateDate'> & { selectedYear?: number; currentYear: number }) {
  const rangeYear = React.useMemo(
    () => navigatedYear ?? selectedYear ?? Math.floor(currentYear / 10) * 10,
    [currentYear, navigatedYear, selectedYear],
  );

  const [fromYear, setFromYear] = React.useState<number>(rangeYear);

  const onNavNext = (ev: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    const newFromYear = fromYear + CELL_COUNT;
    setFromYear(newFromYear);
    onNavigateDate?.(ev, {
      event: ev,
      type: ev.type === 'keydown' ? 'keydown' : 'click',
      year: newFromYear,
    });
  };

  const onNavPrevious = (ev: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    const newFromYear = fromYear - CELL_COUNT;
    setFromYear(newFromYear);
    onNavigateDate?.(ev, {
      event: ev,
      type: ev.type === 'keydown' ? 'keydown' : 'click',
      year: newFromYear,
    });
  };

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFromYear(rangeYear);
  }, [rangeYear]);

  return [fromYear, fromYear + CELL_COUNT - 1, onNavNext, onNavPrevious] as const;
}

/**
 * Create the base state required to render an unstyled CalendarYear.
 * Free of Tabster so the headless layer can supply its own roving focus; the styled
 * `useCalendarYear_unstable` adds arrow key navigation on top.
 */
export const useCalendarYearBase_unstable = (
  props: CalendarYearBaseProps,
  ref: React.Ref<CalendarYearHandle>,
): CalendarYearBaseState => {
  const allFocusable = useCalendarContext_unstable(ctx => ctx.allFocusable);
  const contextToday = useCalendarContext_unstable(ctx => ctx.today);
  const formatters = useCalendarContext_unstable(ctx => ctx.formatters);
  const maxDate = useCalendarContext_unstable(ctx => ctx.maxDate);
  const minDate = useCalendarContext_unstable(ctx => ctx.minDate);
  const value = useCalendarContext_unstable(ctx => ctx.value);

  const { grid, header, navigation, nextRangeButton, onHeaderSelect, onSelectYear, previousRangeButton, heading } =
    props;

  const today = contextToday ?? new Date();
  const currentYear = today.getFullYear();
  const selectedYear = props.selectedYear ?? (value ? value.getFullYear() : undefined);
  const minYear = minDate ? minDate.getFullYear() : undefined;
  const maxYear = maxDate ? maxDate.getFullYear() : undefined;
  const [fromYear, toYear, onNavNext, onNavPrevious] = useYearRangeState({
    ...props,
    currentYear,
    selectedYear,
  });

  const currentYearRef = React.useRef<HTMLButtonElement>(null);
  const selectedYearRef = React.useRef<HTMLButtonElement>(null);
  const navigatedYearRef = React.useRef<HTMLButtonElement>(null);

  React.useImperativeHandle(
    ref,
    () => ({
      focus() {
        [navigatedYearRef.current, selectedYearRef.current, currentYearRef.current]
          .find(element => element && !element.disabled)
          ?.focus();
      },
    }),
    [],
  );

  const formatYear = (year: number) => formatters.dateTime({ date: new Date(year, 0, 1), format: 'year' });

  const firstFocusableYear = allFocusable ? fromYear : Math.max(fromYear, minYear ?? fromYear);
  const lastFocusableYear = allFocusable ? toYear : Math.min(toYear, maxYear ?? toYear);
  const focusYear = Math.min(
    lastFocusableYear,
    Math.max(firstFocusableYear, props.navigatedYear ?? selectedYear ?? currentYear),
  );
  const yearRows: CalendarYearCell[][] = [];
  for (let row = 0; row < CELL_COUNT / CELLS_PER_ROW; row++) {
    const cells: CalendarYearCell[] = [];
    for (let column = 0; column < CELLS_PER_ROW; column++) {
      const year = fromYear + row * CELLS_PER_ROW + column;
      cells.push({
        year,
        content: props.renderYear ? props.renderYear(year) : formatYear(year),
        isCurrent: year === currentYear,
        isSelected: year === selectedYear,
        isNavigated: year === focusYear,
        isDisabled: (minYear !== undefined && year < minYear) || (maxYear !== undefined && year > maxYear),
      });
    }
    yearRows.push(cells);
  }

  const prevDisabled = minYear !== undefined && fromYear <= minYear;
  const nextDisabled = maxYear !== undefined && fromYear + CELL_COUNT > maxYear;

  const prevRange = { fromYear: fromYear - CELL_COUNT, toYear: toYear - CELL_COUNT };
  const nextRange = { fromYear: fromYear + CELL_COUNT, toYear: toYear + CELL_COUNT };

  const formatRange = (range: CalendarYearRange) => `${formatYear(range.fromYear)} - ${formatYear(range.toYear)}`;
  const range = { fromYear, toYear };
  const rangeLabel = formatRange(range);
  const titleAriaLabel = formatters.yearRangePickerHeaderLabel({ ...range, formattedRange: rangeLabel });

  const titleElementType = onHeaderSelect ? 'button' : 'div';
  const titleContent = (
    <>
      {formatYear(fromYear)} - {formatYear(toYear)}
    </>
  );

  return {
    currentYearRef,
    fromYear,
    onSelectYear,
    selectedYearRef,
    navigatedYearRef,
    yearRows,
    components: {
      root: 'div',
      header: 'div',
      heading: titleElementType,
      navigation: 'div',
      previousRangeButton: 'button',
      nextRangeButton: 'button',
      grid: 'div',
    },
    root: slot.always(getIntrinsicElementProps('div', props), { elementType: 'div' }),
    header: slot.always(header, { elementType: 'div' }),
    heading: slot.always(heading, {
      defaultProps: {
        as: titleElementType,
        'aria-label': onHeaderSelect ? titleAriaLabel : undefined,
        children: onHeaderSelect ? (
          <span aria-live="assertive" aria-atomic="true">
            {titleContent}
          </span>
        ) : (
          titleContent
        ),
        onClick: onHeaderSelect
          ? (ev: React.MouseEvent<HTMLElement>) => onHeaderSelect(ev, { event: ev, type: 'click', focus: true })
          : undefined,
        onKeyDown: onHeaderSelect
          ? (ev: React.KeyboardEvent<HTMLElement>) => {
              if (ev.key === Enter || ev.key === Space) {
                ev.preventDefault();
                onHeaderSelect(ev, { event: ev, type: 'keydown', focus: true });
              }
            }
          : undefined,
        type: onHeaderSelect ? 'button' : undefined,
      },
      elementType: titleElementType,
    }),
    navigation: slot.always(navigation, { elementType: 'div' }),
    previousRangeButton: slot.always(previousRangeButton, {
      defaultProps: {
        'aria-disabled': prevDisabled,
        onClick: prevDisabled ? undefined : onNavPrevious,
        onKeyDown: prevDisabled ? undefined : onNavigationKeyDown(onNavPrevious),
        tabIndex: prevDisabled ? (allFocusable ? 0 : -1) : undefined,
        title: formatters.previousYearRangeLabel({ ...prevRange, formattedRange: formatRange(prevRange) }),
        type: 'button',
      },
      elementType: 'button',
    }),
    nextRangeButton: slot.always(nextRangeButton, {
      defaultProps: {
        'aria-disabled': nextDisabled,
        onClick: nextDisabled ? undefined : onNavNext,
        onKeyDown: nextDisabled ? undefined : onNavigationKeyDown(onNavNext),
        tabIndex: nextDisabled ? (allFocusable ? 0 : -1) : undefined,
        title: formatters.nextYearRangeLabel({ ...nextRange, formattedRange: formatRange(nextRange) }),
        type: 'button',
      },
      elementType: 'button',
    }),
    grid: slot.always(grid, {
      defaultProps: {
        'aria-label': rangeLabel,
        role: 'grid',
      },
      elementType: 'div',
    }),
    hasHeaderClickCallback: !!onHeaderSelect,
    prevDisabled,
    nextDisabled,
  };
};

const onNavigationKeyDown =
  (callback: (ev: React.KeyboardEvent<HTMLButtonElement>) => void) => (ev: React.KeyboardEvent<HTMLButtonElement>) => {
    if (ev.key === Enter) {
      ev.preventDefault();
      callback(ev);
    }
  };

/**
 * Create the state required to render CalendarYear.
 */
export const useCalendarYear_unstable = (
  props: CalendarYearProps,
  ref: React.Ref<CalendarYearHandle>,
): CalendarYearState => {
  const baseState = useCalendarYearBase_unstable(props, ref);
  const arrowNavigationAttributes = useArrowNavigationGroup({ axis: 'grid' });

  return {
    ...baseState,
    grid: slot.always(props.grid, {
      defaultProps: {
        ...baseState.grid,
        ...arrowNavigationAttributes,
        children: baseState.yearRows.map((_, rowIndex: number) => (
          <CalendarYearGridRow key={rowIndex} rowIndex={rowIndex} />
        )),
      },
      elementType: 'div',
    }),
    previousRangeButton: slot.always(props.previousRangeButton, {
      defaultProps: {
        ...baseState.previousRangeButton,
        children: <ArrowUpRegular />,
      },
      elementType: 'button',
    }),
    nextRangeButton: slot.always(props.nextRangeButton, {
      defaultProps: {
        ...baseState.nextRangeButton,
        children: <ArrowDownRegular />,
      },
      elementType: 'button',
    }),
  };
};
