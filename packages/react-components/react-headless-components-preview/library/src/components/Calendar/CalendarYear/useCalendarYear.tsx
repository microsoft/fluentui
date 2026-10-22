'use client';

import * as React from 'react';
import { Enter, Space } from '@fluentui/keyboard-keys';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { useCalendarContext } from '../calendarContext';
import { createDate } from '../utils/dateMath';
import { mergeProps } from '../../../utils/mergeProps';
import { getCalendarEventType, resolveCalendarNavigationButton } from '../utils/calendarNavigation';
import { getCalendarPickerCellProps, getCalendarPickerRows, useCalendarPickerGrid } from '../hooks/useCalendarGrid';
import type {
  CalendarYearProps,
  CalendarYearState,
  CalendarYearCellData,
  CalendarYearRange,
} from './CalendarYear.types';

const CELL_COUNT = 12;

type ButtonEvent = React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;

function useYearRangeState({
  selectedYear,
  navigatedYear,
  onNavigateDate,
  currentYear,
}: Pick<CalendarYearProps, 'navigatedYear' | 'onNavigateDate'> & {
  selectedYear?: number | null;
  currentYear: number;
}) {
  const rangeYear = React.useMemo(
    () => navigatedYear ?? selectedYear ?? Math.floor(currentYear / 10) * 10,
    [currentYear, navigatedYear, selectedYear],
  );

  const [fromYear, setFromYear] = React.useState<number>(rangeYear);

  const onNavigate = (ev: ButtonEvent, offset: number) => {
    const newFromYear = fromYear + offset;
    setFromYear(newFromYear);
    onNavigateDate?.(ev, { event: ev, type: getCalendarEventType(ev), year: newFromYear });
  };

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFromYear(rangeYear);
  }, [rangeYear]);

  return [fromYear, fromYear + CELL_COUNT - 1, onNavigate] as const;
}

/**
 * Create the state required to render CalendarYear.
 * Calendar owns selection, directional navigation and roving focus.
 */
export const useCalendarYear = (props: CalendarYearProps, ref: React.Ref<HTMLDivElement>): CalendarYearState => {
  const {
    allFocusable,
    calendarYearColumns,
    today: contextToday,
    formatters,
    maxDate,
    minDate,
    value,
  } = useCalendarContext();
  const { grid, header, navigation, nextRangeButton, onHeaderSelect, onSelectYear, previousRangeButton, heading } =
    props;

  const today = contextToday ?? new Date();
  const currentYear = today.getFullYear();
  const selectedYear = props.selectedYear !== undefined ? props.selectedYear : value?.getFullYear();
  const minYear = minDate ? minDate.getFullYear() : undefined;
  const maxYear = maxDate ? maxDate.getFullYear() : undefined;
  const [fromYear, toYear, onNavigate] = useYearRangeState({ ...props, currentYear, selectedYear });

  const firstFocusableYear = allFocusable ? fromYear : Math.max(fromYear, minYear ?? fromYear);
  const lastFocusableYear = allFocusable ? toYear : Math.min(toYear, maxYear ?? toYear);
  const focusYear = Math.min(
    lastFocusableYear,
    Math.max(firstFocusableYear, props.navigatedYear ?? selectedYear ?? currentYear),
  );

  const formatYear = (year: number) => formatters.dateTime({ date: createDate(year, 0, 1), format: 'year' });
  const isYearDisabled = (year: number) =>
    (minYear !== undefined && year < minYear) || (maxYear !== undefined && year > maxYear);

  const yearCells: CalendarYearCellData[] = Array.from({ length: CELL_COUNT }, (_, index) => {
    const year = fromYear + index;
    return {
      year,
      label: formatYear(year),
      isCurrent: year === currentYear,
      isSelected: year === selectedYear,
      isNavigated: year === focusYear,
      isDisabled: isYearDisabled(year),
    };
  });
  const yearRows = getCalendarPickerRows(yearCells, calendarYearColumns);
  const range = { fromYear, toYear };
  const rangeLabel = `${formatYear(fromYear)} - ${formatYear(toYear)}`;
  const [gridSlot, getCell] = useCalendarPickerGrid(
    grid,
    rangeLabel,
    index => !isYearDisabled(fromYear + index),
    (ev, index) => onSelectYear?.(ev, { event: ev, type: getCalendarEventType(ev), year: fromYear + index }),
  );
  const getYearCellProps: CalendarYearState['getYearCellProps'] = year => ({
    root: mergeProps(
      {
        ...getCalendarPickerCellProps(allFocusable, year.isDisabled, year.isSelected, year.isCurrent, year.isNavigated),
        children: year.label,
      },
      props.getCellProps?.(year).root,
    ),
  });
  const getYearRowProps: CalendarYearState['getYearRowProps'] = row => ({
    root: mergeProps({ role: 'row', focusgrouprow: '' }, props.getRowProps?.(row).root),
  });

  const prevDisabled = minYear !== undefined && fromYear <= minYear;
  const nextDisabled = maxYear !== undefined && fromYear + CELL_COUNT > maxYear;

  const formatRange = (yearRange: CalendarYearRange) =>
    `${formatYear(yearRange.fromYear)} - ${formatYear(yearRange.toYear)}`;
  const prevRange = { fromYear: fromYear - CELL_COUNT, toYear: toYear - CELL_COUNT };
  const nextRange = { fromYear: fromYear + CELL_COUNT, toYear: toYear + CELL_COUNT };

  const titleElementType = onHeaderSelect ? 'button' : 'div';

  React.useImperativeHandle(props.imperativeRef, () => ({
    focus(options?: FocusOptions) {
      if (focusYear >= fromYear && focusYear <= toYear) {
        getCell(focusYear - fromYear)?.focus(options);
      }
    },
  }));

  return {
    yearRows,
    getYearCellProps,
    getYearRowProps,
    components: {
      root: 'div',
      header: 'div',
      heading: titleElementType,
      navigation: 'div',
      previousRangeButton: 'button',
      nextRangeButton: 'button',
      grid: 'div',
    },
    root: slot.always(getIntrinsicElementProps('div', { ...props, ref }), { elementType: 'div' }),
    header: slot.always(header, { elementType: 'div' }),
    heading: slot.always(heading, {
      defaultProps: {
        as: titleElementType,
        'aria-label': onHeaderSelect
          ? formatters.yearRangePickerHeaderLabel({ ...range, formattedRange: rangeLabel })
          : undefined,
        children: onHeaderSelect ? (
          <span aria-live="assertive" aria-atomic="true">
            {rangeLabel}
          </span>
        ) : (
          rangeLabel
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
    previousRangeButton: resolveCalendarNavigationButton(
      previousRangeButton,
      !prevDisabled,
      allFocusable,
      formatters.previousYearRangeLabel({ ...prevRange, formattedRange: formatRange(prevRange) }),
      ev => onNavigate(ev, -CELL_COUNT),
    ),
    nextRangeButton: resolveCalendarNavigationButton(
      nextRangeButton,
      !nextDisabled,
      allFocusable,
      formatters.nextYearRangeLabel({ ...nextRange, formattedRange: formatRange(nextRange) }),
      ev => onNavigate(ev, CELL_COUNT),
    ),
    grid: gridSlot,
  };
};
