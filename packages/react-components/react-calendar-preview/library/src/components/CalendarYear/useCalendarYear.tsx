'use client';

import * as React from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Enter, Space } from '@fluentui/keyboard-keys';
import { ArrowDownRegular, ArrowUpRegular } from '@fluentui/react-icons';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { useCalendarContext_unstable } from '../../contexts/calendarContext';
import { createDate } from '../../utils/dateMath';
import { getCalendarEventType, getCalendarNavigationButtonProps } from '../../utils/calendarHeader';
import { getCalendarPickerRows, useCalendarPickerGrid } from '../../hooks/useCalendarPickerGrid';
import { useAnimateBackwards } from '../../hooks/useAnimateBackwards';
import { DirectionalSlideIn } from '../../utils/calendarMotions';
import type {
  CalendarYearBaseProps,
  CalendarYearBaseState,
  CalendarYearCell,
  CalendarYearHandle,
  CalendarYearProps,
  CalendarYearRange,
  CalendarYearRow,
  CalendarYearState,
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
 * Create the base state required to render an unstyled CalendarYear.
 * The grid owns arrow navigation and its roving tab stop, so the base state is complete without a focus runtime.
 */
export const useCalendarYearBase_unstable = (
  props: CalendarYearBaseProps,
  ref: React.Ref<CalendarYearHandle>,
): CalendarYearBaseState => {
  // The context value only changes when Calendar re-renders the pickers anyway, so it is read as a whole.
  const {
    allFocusable,
    today: contextToday,
    formatters,
    maxDate,
    minDate,
    value,
  } = useCalendarContext_unstable(ctx => ctx);
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

  const yearCells: CalendarYearCell[] = Array.from({ length: CELL_COUNT }, (_, index) => {
    const year = fromYear + index;
    return {
      year,
      content: props.renderYear ? props.renderYear(year) : formatYear(year),
      isCurrent: year === currentYear,
      isSelected: year === selectedYear,
      isNavigated: year === focusYear,
      isDisabled: isYearDisabled(year),
      props: {},
    };
  });
  const yearRows: CalendarYearRow[] = getCalendarPickerRows(yearCells, allFocusable, cell => [
    cell.isDisabled,
    cell.isSelected,
    cell.isCurrent,
    cell.isNavigated,
  ]);

  const prevDisabled = minYear !== undefined && fromYear <= minYear;
  const nextDisabled = maxYear !== undefined && fromYear + CELL_COUNT > maxYear;

  const formatRange = (range: CalendarYearRange) => `${formatYear(range.fromYear)} - ${formatYear(range.toYear)}`;
  const prevRange = { fromYear: fromYear - CELL_COUNT, toYear: toYear - CELL_COUNT };
  const nextRange = { fromYear: fromYear + CELL_COUNT, toYear: toYear + CELL_COUNT };
  const range = { fromYear, toYear };
  const rangeLabel = formatRange(range);

  const titleElementType = onHeaderSelect ? 'button' : 'div';
  const titleContent = (
    <>
      {formatYear(fromYear)} - {formatYear(toYear)}
    </>
  );

  const [gridSlot, getCell] = useCalendarPickerGrid(
    grid,
    rangeLabel,
    allFocusable,
    focusYear - fromYear,
    index => !isYearDisabled(fromYear + index),
    (ev, index) => onSelectYear?.(ev, { event: ev, type: getCalendarEventType(ev), year: fromYear + index }),
  );

  React.useImperativeHandle(ref, () => ({
    focus(options?: FocusOptions) {
      [focusYear, selectedYear, currentYear]
        .map(year => (typeof year === 'number' ? getCell(year - fromYear) : undefined))
        .find(cell => cell && !cell.matches(':disabled'))
        ?.focus(options);
    },
  }));

  return {
    fromYear,
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
        'aria-label': onHeaderSelect
          ? formatters.yearRangePickerHeaderLabel({ ...range, formattedRange: rangeLabel })
          : undefined,
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
      defaultProps: getCalendarNavigationButtonProps(
        !prevDisabled,
        allFocusable,
        formatters.previousYearRangeLabel({ ...prevRange, formattedRange: formatRange(prevRange) }),
        ev => onNavigate(ev, -CELL_COUNT),
      ),
      elementType: 'button',
    }),
    nextRangeButton: slot.always(nextRangeButton, {
      defaultProps: getCalendarNavigationButtonProps(
        !nextDisabled,
        allFocusable,
        formatters.nextYearRangeLabel({ ...nextRange, formattedRange: formatRange(nextRange) }),
        ev => onNavigate(ev, CELL_COUNT),
      ),
      elementType: 'button',
    }),
    grid: gridSlot,
    hasHeaderClickCallback: !!onHeaderSelect,
    prevDisabled,
    nextDisabled,
  };
};

/**
 * Create the state required to render CalendarYear.
 */
export const useCalendarYear_unstable = (
  props: CalendarYearProps,
  ref: React.Ref<CalendarYearHandle>,
): CalendarYearState => {
  const state = useCalendarYearBase_unstable(props, ref);
  // The grid owns its arrow keys; the Tabster group only keeps an enclosing Tabster mover from handling them.
  const arrowNavigationAttributes = useArrowNavigationGroup({
    axis: 'grid',
    ignoreDefaultKeydown: { [ArrowDown]: true, [ArrowLeft]: true, [ArrowRight]: true, [ArrowUp]: true },
  });
  const animateBackwards = useAnimateBackwards(state.fromYear);

  Object.assign(state.grid, arrowNavigationAttributes);
  /* eslint-disable react-hooks/immutability */
  if (state.previousRangeButton.children === undefined) {
    state.previousRangeButton.children = <ArrowUpRegular />;
  }
  if (state.nextRangeButton.children === undefined) {
    state.nextRangeButton.children = <ArrowDownRegular />;
  }
  state.wrapRow = row => (
    <DirectionalSlideIn animationDirection="vertical" animateBackwards={animateBackwards} replayKey={state.fromYear}>
      {row}
    </DirectionalSlideIn>
  );
  /* eslint-enable react-hooks/immutability */

  return state;
};
