'use client';

import * as React from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  End,
  Enter,
  Escape,
  Home,
  PageDown,
  PageUp,
  Space,
} from '@fluentui/keyboard-keys';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { mergeCallbacks, slot, useControllableState, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import type { ExtractSlotProps, Slot, SlotShorthandValue } from '@fluentui/react-utilities';
import { toDataAttributeValue } from '../../utils';
import {
  DAYS_IN_WEEK,
  DEFAULT_WORK_WEEK_DAYS,
  addDays,
  addMonths,
  addYears,
  calendarFormatters,
  compareDatePart,
  createDate,
  findAvailableDate,
  findCivilDate,
  focusCalendarGrid,
  getAvailableDates,
  getDateRange,
  getDateRangeTypeToUse,
  getDayFromIndex,
  getDayGrid,
  getDayIndex,
  getEventCell,
  getGridCells,
  getMonthEnd,
  getMonthStart,
  getTargetIndex,
  getWeekNumber,
  isEditable,
  isGridNavigationKey,
  isNestedWidget,
  isRestrictedDate,
  setMonth,
} from './utils';
import type { RestrictedDatesOptions } from './utils';
import type {
  CalendarCellData,
  CalendarDayCellData,
  CalendarMonthCellData,
  CalendarPanelState,
  CalendarProps,
  CalendarRowData,
  CalendarState,
  CalendarView,
  CalendarWeekdayCellData,
  CalendarYearCellData,
} from './Calendar.types';

type CalendarEvent = React.SyntheticEvent<HTMLElement>;
type ButtonSlot = ExtractSlotProps<Slot<'button'>> | SlotShorthandValue | undefined;
/** Which panel to focus after the next render: the first visible panel, or the month panel. */
type FocusRequest = 'first' | 'month';

const YEAR_COUNT = 12;
const RANGE_HOVERED = 'data-range-hovered';
const RANGE_PRESSED = 'data-range-pressed';

const eventType = (event: React.SyntheticEvent | Event): 'click' | 'keydown' =>
  event.type === 'keydown' ? 'keydown' : 'click';

/**
 * Creates Calendar state. Calendar owns the selected and displayed dates, the view, and the roving focus of every
 * grid, and renders one panel per visible grid with a shared header.
 */
export const useCalendar = (props: CalendarProps, ref: React.Ref<HTMLDivElement>): CalendarState => {
  const {
    allFocusable = false,
    calendarMonthColumns = 4,
    calendarYearColumns = 4,
    dateRangeType = 'day',
    dayHeadingView,
    daysToSelectInDayView,
    defaultDisplayedDate,
    defaultValue,
    defaultView,
    displayedDate,
    firstDayOfWeek = 'sunday',
    firstWeekOfYear = 'firstDay',
    formatters: formatterOverrides,
    getMarkedDays,
    layout,
    maxDate,
    minDate,
    onDismiss,
    onDisplayedDateChange,
    onSelectDate,
    onViewChange,
    renderCell,
    renderRow,
    renderWeekdayCell,
    restrictedDates,
    showWeekNumbers = false,
    today: todayProp,
    value,
    view: viewProp,
    weeksToShow,
    workWeekDays = DEFAULT_WORK_WEEK_DAYS,
    yearPickerHidden = false,
    // Slots
    closeButton,
    dayPicker,
    divider,
    goToTodayButton,
    grid,
    gridBody,
    gridHeader,
    header,
    heading,
    headingLabel,
    liveRegion,
    monthPicker,
    navigation,
    nextButton,
    previousButton,
    ...rootProps
  } = props;

  const { dir, targetDocument } = useFluent();
  const rtl = dir === 'rtl';
  const formatters = React.useMemo(() => ({ ...calendarFormatters, ...formatterOverrides }), [formatterOverrides]);
  const format = formatters.dateTime;
  const today = React.useMemo(() => todayProp ?? new Date(), [todayProp]);
  const bounds: RestrictedDatesOptions = { minDate, maxDate, restrictedDates };
  const isUnavailable = (date: Date) => isRestrictedDate(date, bounds);
  const clamp = (date: Date): Date =>
    minDate && compareDatePart(date, minDate) < 0
      ? minDate
      : maxDate && compareDatePart(date, maxDate) > 0
      ? maxDate
      : date;

  // Selected and displayed dates

  const [valueState, setValue] = useControllableState({
    state: value,
    defaultState: defaultValue && clamp(defaultValue),
    initialState: null,
  });
  const selectedDate = valueState && compareDatePart(valueState, clamp(valueState)) ? null : valueState;
  const isValueOutOfRange = !!value && compareDatePart(value, clamp(value)) !== 0;
  const warnedRef = React.useRef(false);
  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && isValueOutOfRange && !warnedRef.current) {
      warnedRef.current = true;
      // eslint-disable-next-line no-console
      console.warn('Calendar: value is outside minDate/maxDate and is rendered as an empty selection.');
    }
  }, [isValueOutOfRange]);

  const initialDisplayedDate = clamp(defaultDisplayedDate ?? selectedDate ?? today);
  const [displayedState = initialDisplayedDate, setDisplayed] = useControllableState({
    state: displayedDate,
    initialState: initialDisplayedDate,
  });
  const navigatedDate = clamp(displayedState);
  const navigatedYear = navigatedDate.getFullYear();
  const navigatedTime = navigatedDate.getTime();

  // External value changes navigate when the displayed date is uncontrolled.
  const valueTime = value?.getTime();
  const [previousValueTime, setPreviousValueTime] = React.useState(valueTime);
  if (!Object.is(previousValueTime, valueTime)) {
    setPreviousValueTime(valueTime);
    if (value && displayedDate === undefined) {
      setDisplayed(clamp(value));
    }
  }

  // View and panels

  const [view = 'day', setView] = useControllableState<CalendarView>({
    state: viewProp,
    defaultState: viewProp === undefined ? defaultView : undefined,
    initialState: 'day',
  });
  const hasDayPanel = dayPicker !== null;
  const hasMonthPanel = monthPicker !== null;
  const isOverlay = hasDayPanel && hasMonthPanel && layout === 'overlay';
  const showDayPanel = hasDayPanel && (!isOverlay || view === 'day');
  const showMonthPanel = hasMonthPanel && (!isOverlay || view !== 'day');
  const monthPanelView: CalendarView = view === 'year' && !yearPickerHidden ? 'year' : 'month';

  // Focus

  const rootRef = React.useRef<HTMLDivElement>(null);
  const focusRequest = React.useRef<FocusRequest | undefined>(undefined);
  const focusWithin = React.useRef(false);
  // The view of the panel that holds focus, and whether focus is in its grid.
  const focused = React.useRef<{ view: CalendarView; inGrid: boolean } | undefined>(undefined);
  const pagingDate = React.useRef<Date | undefined>(undefined);
  // Refs are written only from event handlers, through these stable callbacks.
  const requestFocus = useEventCallback((focus: FocusRequest | undefined) => {
    focusRequest.current = focus;
  });
  const setPagingDate = useEventCallback((date: Date | undefined) => {
    pagingDate.current = date;
  });
  const renderedViews = `${showDayPanel ? 'day' : ''} ${showMonthPanel ? monthPanelView : ''}`;

  React.useEffect(() => {
    const root = rootRef.current;
    let request = focusRequest.current;
    focusRequest.current = undefined;
    const lost = focused.current;
    if (lost && !renderedViews.includes(lost.view)) {
      focused.current = undefined;
      if (lost.view === 'day' || !showMonthPanel) {
        // A layout or view change removed the focused panel.
        request ??= 'first';
      } else if (lost.inGrid) {
        // The month panel swapped its month and year grids while one of them had focus.
        request ??= 'month';
      }
    }
    if (!root || !request) {
      return;
    }
    const active = (root.getRootNode() as Document | ShadowRoot).activeElement;
    // Focus moves only when it is in the calendar, was in it, or was lost with a removed element.
    if (!active || active === targetDocument?.body || focusWithin.current || root.contains(active)) {
      const panels = root.querySelectorAll('[data-view]');
      focusCalendarGrid(request === 'month' ? panels[panels.length - 1] : panels[0]);
    }
  });

  // Clear range marks when the grid shows another range.
  React.useEffect(() => {
    rootRef.current?.querySelectorAll(`[${RANGE_HOVERED}],[${RANGE_PRESSED}]`).forEach(element => {
      element.removeAttribute(RANGE_HOVERED);
      element.removeAttribute(RANGE_PRESSED);
    });
  }, [navigatedTime]);

  // The focused cell keeps its grid's tab stop until the grid shows different cells.
  const [activeCells, setActiveCells] = React.useState<Partial<Record<CalendarView, string>>>({});
  const setActiveCell = (gridView: CalendarView, resetKey: string, key: string) =>
    setActiveCells(cells => ({ ...cells, [gridView]: `${resetKey}|${key}` }));
  const getActiveKey = (gridView: CalendarView, resetKey: string) => {
    const active = activeCells[gridView];
    return active?.startsWith(`${resetKey}|`) ? active.slice(resetKey.length + 1) : undefined;
  };

  // Actions

  const navigate = (event: React.SyntheticEvent | Event, date: Date, focus?: FocusRequest) => {
    const displayed = clamp(date);
    setDisplayed(displayed);
    onDisplayedDateChange?.(event, {
      event: event as CalendarEvent,
      type: eventType(event),
      displayedDate: displayed,
    });
    requestFocus(focus);
  };

  const changeView = (event: CalendarEvent, nextView: CalendarView, focus: FocusRequest) => {
    if (nextView === 'year') {
      setYearRange({ anchor: navigatedYear, from: navigatedYear });
    }
    setView(nextView);
    onViewChange?.(event, { event, type: eventType(event), view: nextView });
    requestFocus(focus);
  };

  const selectDate = (event: CalendarEvent, date: Date, rangeType = dateRangeType, days = daysToSelectInDayView) => {
    if (isUnavailable(date)) {
      return;
    }
    const selectedDateRange = getAvailableDates(
      getDateRange(date, rangeType, firstDayOfWeek, workWeekDays, days),
      bounds,
    );
    setValue(date);
    onSelectDate?.(event, { event, type: eventType(event), date, selectedDateRange });
  };

  // Day cells

  const dayGrid = getDayGrid({
    daysToSelectInDayView,
    dateRangeType,
    firstDayOfWeek,
    maxDate,
    minDate,
    navigatedDate,
    restrictedDates,
    selectedDate,
    today,
    weeksToShow,
    workWeekDays,
  });
  const visibleDates = dayGrid.flat().flatMap(day => (day.originalDate ? [day.originalDate] : []));
  const markedDayKeys = new Set(
    (visibleDates.length ? getMarkedDays?.(visibleDates[0], visibleDates[visibleDates.length - 1]) ?? [] : []).map(
      date => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
    ),
  );

  let dayFocusTarget: Date | undefined = navigatedDate;
  if (!allFocusable && isUnavailable(navigatedDate)) {
    const monthStart = getMonthStart(navigatedDate);
    const monthEnd = getMonthEnd(navigatedDate);
    const inMonth = (date: Date) => compareDatePart(date, monthStart) >= 0 && compareDatePart(date, monthEnd) <= 0;
    const after = (date: Date) => compareDatePart(date, navigatedDate) > 0 && !isUnavailable(date);
    const before = (date: Date) => compareDatePart(date, navigatedDate) < 0 && !isUnavailable(date);
    const monthDates = visibleDates.filter(inMonth);
    const otherDates = visibleDates.filter(date => !inMonth(date));
    dayFocusTarget =
      monthDates.find(after) ??
      monthDates.reverse().find(before) ??
      otherDates.find(after) ??
      otherDates.reverse().find(before) ??
      findAvailableDate({ ...bounds, initialDate: addDays(monthEnd, 1), targetDate: navigatedDate, direction: 1 }) ??
      findAvailableDate({ ...bounds, initialDate: addDays(monthStart, -1), targetDate: navigatedDate, direction: -1 });
  }
  const isDayFocusable = (day: CalendarDayCellData) => !!day.originalDate && (allFocusable || day.isInBounds);
  const days: CalendarDayCellData[] = dayGrid.flat().map(day => {
    const date = day.originalDate;
    return {
      ...day,
      type: 'day',
      isMarked: !!date && markedDayKeys.has(day.key),
      label: date ? format({ date, format: 'day' }) : day.date,
      isNavigated: !!date && !!dayFocusTarget && compareDatePart(date, dayFocusTarget) === 0,
    };
  });
  const dayResetKey = `${navigatedTime}`;
  const activeDayKey = getActiveKey('day', dayResetKey);
  const dayTabStop =
    days.find(day => day.key === activeDayKey && isDayFocusable(day)) ?? days.find(day => day.isNavigated);

  const weekdayDates = Array.from({ length: DAYS_IN_WEEK }, (_, index) => new Date(2020, 0, 5 + index));
  const shortDays = weekdayDates.map(date => format({ date, format: 'shortWeekday' }));
  const dayNames = weekdayDates.map(date => format({ date, format: 'weekday' }));
  const firstDayIndex = getDayIndex(firstDayOfWeek);
  const firstOfMonthIndex = dayGrid[0].findIndex(day => day.originalDate?.getDate() === 1);
  const firstOfMonth = dayGrid[0][firstOfMonthIndex]?.originalDate;
  if (weeksToShow === 1 && firstOfMonth) {
    // A single week names the month where it starts instead of the weekday.
    const index = (firstOfMonthIndex + firstDayIndex) % DAYS_IN_WEEK;
    shortDays[index] = format({ date: firstOfMonth, format: 'shortMonth' });
    dayNames[index] = format({ date: firstOfMonth, format: 'month' });
  }
  const dayRows: CalendarRowData[] = [
    {
      type: 'weekday',
      key: -1,
      cells: shortDays.map((_, index): CalendarWeekdayCellData => {
        const dayIndex = (index + firstDayIndex) % DAYS_IN_WEEK;
        return {
          key: `${shortDays[dayIndex]} ${index}`,
          dayOfWeek: getDayFromIndex(dayIndex),
          label: shortDays[dayIndex],
          accessibleLabel: dayNames[dayIndex],
        };
      }),
    },
    ...dayGrid.map((week, key): CalendarRowData => {
      const lastDate = week.reduce<Date | null>((last, day) => day.originalDate ?? last, null);
      return {
        type: 'week',
        key,
        cells: days.slice(key * DAYS_IN_WEEK, (key + 1) * DAYS_IN_WEEK),
        weekNumber: showWeekNumbers && lastDate ? getWeekNumber(lastDate, firstDayOfWeek, firstWeekOfYear) : undefined,
      };
    }),
  ];

  // Month cells

  const isMonthOnly = !hasDayPanel;
  const monthSelection = isMonthOnly ? selectedDate : navigatedDate;
  const months: CalendarMonthCellData[] = Array.from({ length: 12 }, (_, index) => {
    const date = setMonth(navigatedDate, index);
    return {
      type: 'month',
      key: `${index}`,
      index,
      label: format({ date, format: 'shortMonth' }),
      isNavigated: false,
      isCurrent: today.getFullYear() === navigatedYear && today.getMonth() === index,
      isSelected:
        !!monthSelection && monthSelection.getMonth() === index && monthSelection.getFullYear() === navigatedYear,
      isInBounds:
        (!minDate || compareDatePart(minDate, getMonthEnd(date)) < 1) &&
        (!maxDate || compareDatePart(getMonthStart(date), maxDate) < 1) &&
        (!isMonthOnly || getDateRange(date, 'month', firstDayOfWeek).some(rangeDate => !isUnavailable(rangeDate))),
    };
  });
  const navigatedMonth =
    months.find(month => month.index === navigatedDate.getMonth() && (month.isInBounds || allFocusable)) ??
    months.find(month => month.isInBounds);
  if (navigatedMonth) {
    navigatedMonth.isNavigated = true;
  }

  // Year cells

  const [yearRange, setYearRange] = React.useState({ anchor: navigatedYear, from: navigatedYear });
  if (yearRange.anchor !== navigatedYear) {
    setYearRange({ anchor: navigatedYear, from: navigatedYear });
  }
  const fromYear = yearRange.anchor === navigatedYear ? yearRange.from : navigatedYear;
  const toYear = fromYear + YEAR_COUNT - 1;
  const minYear = minDate?.getFullYear();
  const maxYear = maxDate?.getFullYear();
  const focusYear = Math.min(
    allFocusable ? toYear : Math.min(toYear, maxYear ?? toYear),
    Math.max(allFocusable ? fromYear : Math.max(fromYear, minYear ?? fromYear), navigatedYear),
  );
  const formatYear = (year: number) => format({ date: createDate(year, 0, 1), format: 'year' });
  const formatRange = (from: number) => `${formatYear(from)} - ${formatYear(from + YEAR_COUNT - 1)}`;
  const years: CalendarYearCellData[] = Array.from({ length: YEAR_COUNT }, (_, index) => {
    const year = fromYear + index;
    return {
      type: 'year',
      key: `${year}`,
      year,
      label: formatYear(year),
      isNavigated: year === focusYear,
      isCurrent: year === today.getFullYear(),
      isSelected: year === selectedDate?.getFullYear(),
      isInBounds: !((minYear !== undefined && year < minYear) || (maxYear !== undefined && year > maxYear)),
    };
  });

  const toRows = (cells: (CalendarMonthCellData | CalendarYearCellData)[], columns: number) => {
    if (columns !== 3 && columns !== 4) {
      throw new RangeError('Calendar picker columns must be 3 or 4.');
    }
    return Array.from({ length: YEAR_COUNT / columns }, (_, key) => ({
      type: cells[0].type,
      key,
      cells: cells.slice(key * columns, (key + 1) * columns),
    })) as CalendarRowData[];
  };

  // Shared cell, row and weekday props

  const tabStops: Partial<Record<CalendarView, string>> = {};
  const activeKeys: Partial<Record<CalendarView, string>> = {};

  const resolveCellProps: CalendarState['resolveCellProps'] = cell => {
    const isTabStop = tabStops[cell.type] === cell.key;
    const isDay = cell.type === 'day';
    const disabled = !cell.isInBounds;
    const date = isDay ? cell.originalDate : undefined;
    const formattedDate = isDay ? (date ? format({ date, format: 'monthDayYear' }) : cell.date) : '';
    return {
      root: {
        role: 'gridcell',
        'aria-current': (isDay ? cell.isToday : cell.isCurrent) ? 'date' : undefined,
        'aria-disabled': disabled,
        'aria-label':
          cell.type === 'month' ? format({ date: setMonth(navigatedDate, cell.index), format: 'month' }) : undefined,
        'aria-selected': isDay && disabled ? undefined : cell.isSelected,
        tabIndex: isDay
          ? isDayFocusable(cell)
            ? isTabStop
              ? 0
              : -1
            : undefined
          : isTabStop
          ? 0
          : // Keep the last focused cell programmatically focusable if the grid changes while it is focused.
          allFocusable || !disabled || activeKeys[cell.type] === cell.key
          ? -1
          : undefined,
        ...({
          [isDay ? 'data-today' : 'data-current']: toDataAttributeValue(isDay ? cell.isToday : cell.isCurrent),
          'data-selected': toDataAttributeValue(cell.isSelected),
          'data-outside-bounds': toDataAttributeValue(disabled),
          'data-marked': toDataAttributeValue(isDay && cell.isMarked),
          'data-outside-month': toDataAttributeValue(isDay && !cell.isInMonth),
        } as {}),
      },
      button: isDay
        ? {
            'aria-label': cell.isMarked && date ? formatters.dayMarkedLabel({ date, formattedDate }) : formattedDate,
            disabled,
            onMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault(),
            tabIndex: -1,
            type: 'button',
          }
        : { children: cell.label, disabled: disabled && !allFocusable, tabIndex: -1, type: 'button' },
      label: isDay ? { children: cell.label } : undefined,
      marker: isDay && cell.isMarked ? { 'aria-hidden': true } : undefined,
    };
  };

  const resolveRowProps: CalendarState['resolveRowProps'] = row => {
    const weekNumber = row.type === 'week' ? row.weekNumber : undefined;
    const weekNumberLabel = weekNumber === undefined ? '' : formatters.weekNumberLabel({ weekNumber });
    return {
      root: { role: 'row' },
      weekNumber:
        row.type === 'weekday'
          ? showWeekNumbers
            ? { role: 'presentation' }
            : undefined
          : weekNumber !== undefined
          ? { 'aria-label': weekNumberLabel, children: weekNumber, scope: 'row', title: weekNumberLabel }
          : undefined,
    };
  };

  const resolveWeekdayCellProps: CalendarState['resolveWeekdayCellProps'] = weekday => ({
    root: {
      role: 'columnheader',
      'aria-label': weekday.accessibleLabel,
      children: weekday.label,
      scope: 'col',
      title: weekday.accessibleLabel,
    },
  });

  // Labels

  const formatDay = (date: Date) => format({ date, format: 'monthDayYear' });
  const monthYear = format({ date: navigatedDate, format: 'monthYear' });
  const yearString = format({ date: navigatedDate, format: 'year' });
  const selectedDateString = selectedDate
    ? formatters.selectedDateLabel({ date: selectedDate, formattedDate: formatDay(selectedDate) })
    : '';
  const todayDateString = formatters.todayDateLabel({ date: today, formattedDate: formatDay(today) });

  // Panels

  /** Wires activation of a header button, reporting Enter as a `keydown`. */
  const onActivate = <T,>(buttonSlot: T, enabled: boolean, activate: (event: CalendarEvent) => void): T => {
    const typed = buttonSlot as React.ButtonHTMLAttributes<HTMLElement>;
    typed.onClick = mergeCallbacks(typed.onClick, event => {
      if (enabled && !event.isDefaultPrevented()) {
        activate(event);
      }
    });
    typed.onKeyDown = mergeCallbacks(typed.onKeyDown, event => {
      if (enabled && !event.isDefaultPrevented() && event.key === Enter) {
        activate(event);
        if (!event.isDefaultPrevented()) {
          event.preventDefault();
        }
      }
    });
    return buttonSlot;
  };

  const navButton = (button: ButtonSlot, inBounds: boolean, label: string, onNavigate: (e: CalendarEvent) => void) =>
    onActivate(
      slot.always(button, {
        defaultProps: {
          'aria-disabled': !inBounds,
          'aria-label': label,
          tabIndex: inBounds ? undefined : allFocusable ? 0 : -1,
          title: label,
          type: 'button',
        },
        elementType: 'button',
      }),
      inBounds,
      onNavigate,
    );

  const createPanel = (
    panelView: CalendarView,
    root: ExtractSlotProps<Slot<'div'>>,
    isFirst: boolean,
  ): CalendarPanelState => {
    const isDay = panelView === 'day';
    const isYear = panelView === 'year';
    const columns = isDay ? DAYS_IN_WEEK : isYear ? calendarYearColumns : calendarMonthColumns;
    const rows = isDay ? dayRows : toRows(isYear ? years : months, columns);
    const cells = rows.flatMap(row => (row.type === 'weekday' ? [] : (row.cells as CalendarCellData[])));
    const resetKey = isDay ? dayResetKey : `${isYear ? fromYear : navigatedYear}:${columns}`;
    const isFocusable = (cell: CalendarCellData | undefined) =>
      !!cell && (cell.type === 'day' ? isDayFocusable(cell) : allFocusable || cell.isInBounds);
    const activeKey = isDay ? activeDayKey : getActiveKey(panelView, resetKey);
    const navigatedCell = cells.find(cell => cell.isNavigated);
    // The last focused cell stays programmatically focusable even after the grid shows other cells.
    activeKeys[panelView] = activeCells[panelView]?.split('|')[1];
    tabStops[panelView] = isDay
      ? dayTabStop?.key
      : activeKey ?? (isFocusable(navigatedCell) ? navigatedCell!.key : undefined);

    const getCell = (event: CalendarEvent): [HTMLElement, CalendarCellData] | undefined => {
      const element = getEventCell(event);
      const cell = element && cells[getGridCells(event.currentTarget).indexOf(element)];
      return element && cell && (cell.type !== 'day' || cell.originalDate) ? [element, cell] : undefined;
    };

    const activateCell = (event: CalendarEvent, cell: CalendarCellData) => {
      if (cell.type === 'day') {
        selectDate(event, cell.originalDate!);
        navigate(event, cell.originalDate!, 'first');
      } else if (cell.type === 'month') {
        let date = setMonth(navigatedDate, cell.index);
        if (isMonthOnly) {
          const available = getAvailableDates(getDateRange(date, 'month', firstDayOfWeek), bounds);
          if (!available.length) {
            return;
          }
          date = available.find(rangeDate => compareDatePart(rangeDate, date) === 0) ?? available[0];
          selectDate(event, date, dateRangeType, undefined);
        }
        if (isOverlay) {
          changeView(event, 'day', 'first');
        }
        navigate(event, date, 'first');
      } else {
        if (cell.year !== navigatedYear) {
          // Keep the displayed month within the bounds of the new year.
          let date = addYears(navigatedDate, cell.year - navigatedYear);
          const bound =
            maxDate && compareDatePart(date, maxDate) > 0
              ? maxDate
              : minDate && compareDatePart(date, minDate) < 0
              ? minDate
              : undefined;
          if (bound) {
            date = setMonth(date, bound.getMonth());
            date = compareDatePart(date, bound) * (bound === maxDate ? 1 : -1) > 0 ? bound : date;
          }
          navigate(event, date);
        }
        // A new year moves focus to the first panel, as navigation does; otherwise it returns to the month grid.
        changeView(event, 'month', cell.year !== navigatedYear ? 'first' : 'month');
      }
    };

    // Range marks cover an arbitrary set of days, which a CSS :hover rule cannot express.
    const markRange = (gridElement: HTMLElement, cell: CalendarCellData, attribute: string, on: boolean) => {
      if (cell.type !== 'day') {
        return;
      }
      const range = getDateRange(
        cell.originalDate!,
        getDateRangeTypeToUse(dateRangeType, workWeekDays, firstDayOfWeek),
        firstDayOfWeek,
        workWeekDays,
        daysToSelectInDayView,
      );
      const elements = getGridCells(gridElement);
      cells.forEach((candidate, index) => {
        const date = candidate.type === 'day' && candidate.originalDate;
        if (date && range.some(rangeDate => compareDatePart(rangeDate, date) === 0)) {
          elements[index]?.toggleAttribute(attribute, on);
        }
      });
    };

    /** Moves past the visible days to the next available date. */
    const navigateBeyond = (event: React.KeyboardEvent<HTMLElement>, date: Date) => {
      const options = { ...bounds, restrictedDates: allFocusable ? undefined : restrictedDates };
      const vertical = event.key === ArrowUp || event.key === ArrowDown;
      const step = (vertical ? event.key === ArrowDown : (event.key === ArrowRight) !== rtl) ? 1 : -1;
      const next = vertical
        ? findCivilDate(
            date,
            step * DAYS_IN_WEEK,
            candidate => !isRestrictedDate(candidate, options),
            step > 0 ? maxDate : minDate,
          )
        : (() => {
            const target = findCivilDate(date, step, candidate => compareDatePart(candidate, date) * step > 0);
            return target && findAvailableDate({ ...options, initialDate: date, targetDate: target, direction: step });
          })();
      if (next) {
        event.preventDefault();
        navigate(event, next, 'first');
      }
    };

    const gridSlot = slot.always(grid, {
      defaultProps: {
        role: 'grid',
        'aria-label': isDay
          ? `${monthYear}, ${selectedDateString}, ${todayDateString}`
          : isYear
          ? formatRange(fromYear)
          : yearString,
        'aria-multiselectable': isDay ? dateRangeType !== 'day' || Math.abs(daysToSelectInDayView ?? 1) > 1 : undefined,
      },
      elementType: (isDay ? 'table' : 'div') as 'div',
    });
    Object.assign(gridSlot, { 'data-fui-calendar-grid': '' });
    gridSlot.onKeyDown = mergeCallbacks(gridSlot.onKeyDown, (event: React.KeyboardEvent<HTMLElement>) => {
      const found = getCell(event);
      // Keys from content inside a month or year cell, including its button, keep their native behavior. Day cells
      // own keys from their content; Enter and Space are cancelled, so the day button does not also click.
      if (!found || event.isDefaultPrevented() || (!isDay && event.target !== found[0])) {
        return;
      }
      const [, cell] = found;
      const index = cells.indexOf(cell);
      if (event.key === PageUp || event.key === PageDown) {
        // Calendar pages from the focused day.
        setPagingDate(cell.type === 'day' ? cell.originalDate! : undefined);
      } else if ((event.key === Enter || event.key === Space) && cell.isInBounds) {
        activateCell(event, cell);
        if (!event.isDefaultPrevented()) {
          event.preventDefault();
        }
      } else if (isGridNavigationKey(event)) {
        const targetIndex = getTargetIndex(
          event.key,
          rtl,
          index,
          cells.length,
          columns,
          i => isFocusable(cells[i]),
          isDay,
        );
        const target = targetIndex === undefined ? undefined : cells[targetIndex];
        if (target) {
          event.preventDefault();
          setActiveCell(panelView, resetKey, target.key);
          getGridCells(event.currentTarget)[targetIndex!]?.focus();
          if (target.type === 'day' && !target.isInMonth && target.isInBounds) {
            navigate(event, target.originalDate!, 'first');
          }
          return;
        }
        if (cell.type === 'day' && event.key !== Home && event.key !== End && !event.altKey) {
          navigateBeyond(event, cell.originalDate!);
        }
        // Boundary keys are owned too, so the page does not scroll when focus cannot move further.
        if (!event.isDefaultPrevented()) {
          event.preventDefault();
        }
      }
    });
    gridSlot.onClick = mergeCallbacks(gridSlot.onClick, (event: React.MouseEvent<HTMLElement>) => {
      const found = getCell(event);
      if (found && !event.isDefaultPrevented()) {
        found[0].focus();
        if (found[1].isInBounds) {
          activateCell(event, found[1]);
        }
      }
    });
    gridSlot.onFocus = mergeCallbacks(gridSlot.onFocus, (event: React.FocusEvent<HTMLElement>) => {
      const found = getCell(event);
      if (found && event.target === found[0] && isFocusable(found[1])) {
        setActiveCell(panelView, resetKey, found[1].key);
      }
    });
    if (isDay) {
      const onHover = (on: boolean) => (event: React.MouseEvent<HTMLElement>) => {
        const found = getCell(event);
        // Ignore pointer moves between a cell and its own content.
        if (found && !(event.relatedTarget && found[0].contains(event.relatedTarget as Node))) {
          markRange(event.currentTarget, found[1], RANGE_HOVERED, on);
          if (!on) {
            markRange(event.currentTarget, found[1], RANGE_PRESSED, false);
          }
        }
      };
      const onPress = (on: boolean) => (event: React.MouseEvent<HTMLElement>) => {
        const found = getCell(event);
        if (found) {
          if (on) {
            event.preventDefault();
          }
          markRange(event.currentTarget, found[1], RANGE_PRESSED, on);
        }
      };
      gridSlot.onMouseOver = mergeCallbacks(gridSlot.onMouseOver, onHover(true));
      gridSlot.onMouseOut = mergeCallbacks(gridSlot.onMouseOut, onHover(false));
      gridSlot.onMouseDown = mergeCallbacks(gridSlot.onMouseDown, onPress(true));
      gridSlot.onMouseUp = mergeCallbacks(gridSlot.onMouseUp, onPress(false));
    }

    // Header

    const headingView: CalendarView | undefined = isDay
      ? hasMonthPanel
        ? dayHeadingView ?? (isOverlay ? 'month' : undefined)
        : undefined
      : isYear
      ? 'month'
      : !yearPickerHidden
      ? 'year'
      : isOverlay
      ? 'day'
      : undefined;
    const headingText = isDay ? monthYear : isYear ? formatRange(fromYear) : yearString;
    const headingSlot = slot.always(heading, {
      defaultProps: {
        'aria-label': headingView
          ? isDay
            ? // A day heading that opens the year grid names the year action, unless the day label is overridden.
              (headingView === 'year' && !formatterOverrides?.dayPickerHeaderLabel
                ? formatters.monthPickerHeaderLabel
                : formatters.dayPickerHeaderLabel)({ date: navigatedDate, formattedDate: monthYear })
            : isYear
            ? formatters.yearRangePickerHeaderLabel({ fromYear, toYear, formattedRange: headingText })
            : formatters.monthPickerHeaderLabel({ date: navigatedDate, formattedDate: yearString })
          : undefined,
        type: headingView ? 'button' : undefined,
      },
      elementType: headingView ? 'button' : 'div',
    });
    onActivate(headingSlot, !!headingView, event =>
      changeView(event, headingView!, headingView === 'day' ? 'first' : 'month'),
    );

    const unit = isDay ? 'Month' : isYear ? 'YearRange' : 'Year';
    const periodStart = isDay ? getMonthStart(navigatedDate) : createDate(isYear ? fromYear : navigatedYear, 0, 1);
    const periodEnd = isDay ? getMonthEnd(navigatedDate) : createDate((isYear ? toYear : navigatedYear) + 1, 0, 0);
    const getNavButton = (button: ButtonSlot, direction: 1 | -1) => {
      const date = isDay ? addMonths(navigatedDate, direction) : addYears(navigatedDate, direction);
      const from = fromYear + direction * YEAR_COUNT;
      // Whether any of the previous or next period lies within the bounds.
      const inBounds =
        direction < 0
          ? !minDate || compareDatePart(minDate, periodStart) < 0
          : !maxDate || compareDatePart(periodEnd, maxDate) < 0;
      const labelKey = `${direction < 0 ? 'previous' : 'next'}${unit}Label` as const;
      const label = isYear
        ? formatters[labelKey as 'nextYearRangeLabel']({
            fromYear: from,
            toYear: from + YEAR_COUNT - 1,
            formattedRange: formatRange(from),
          })
        : formatters[labelKey as 'nextMonthLabel']({
            date,
            formattedDate: format({ date, format: isDay ? 'month' : 'year' }),
          });
      return navButton(button, inBounds, label, event =>
        isYear ? setYearRange({ anchor: navigatedYear, from }) : navigate(event, date),
      );
    };

    const closeSlot = isFirst
      ? slot.optional(closeButton, {
          defaultProps: { 'aria-label': formatters.closeLabel(), title: formatters.closeLabel(), type: 'button' },
          elementType: 'button',
        })
      : undefined;
    if (closeSlot) {
      onActivate(closeSlot, !!onDismiss, event => onDismiss?.(event, { event, type: eventType(event) }));
    }

    Object.assign(root, { 'data-view': panelView });
    return {
      view: panelView,
      rows,
      components: {
        root: 'div',
        header: 'div',
        heading: headingView ? 'button' : 'div',
        headingLabel: 'span',
        navigation: 'div',
        previousButton: 'button',
        nextButton: 'button',
        closeButton: 'button',
        grid: isDay ? ('table' as 'div') : 'div',
        gridHeader: 'thead',
        gridBody: 'tbody',
      },
      root,
      header: slot.always(header, { elementType: 'div' }),
      heading: headingSlot,
      headingLabel: slot.always(headingLabel, {
        defaultProps: { 'aria-atomic': true, 'aria-live': isYear ? 'assertive' : 'polite', children: headingText },
        elementType: 'span',
      }),
      navigation: slot.always(navigation, { elementType: 'div' }),
      previousButton: getNavButton(previousButton, -1),
      nextButton: getNavButton(nextButton, 1),
      closeButton: closeSlot,
      grid: gridSlot,
      gridHeader: isDay ? slot.optional(gridHeader, { renderByDefault: true, elementType: 'thead' }) : undefined,
      gridBody: isDay ? slot.optional(gridBody, { renderByDefault: true, elementType: 'tbody' }) : undefined,
    };
  };

  const dayPickerSlot = slot.optional(dayPicker, { renderByDefault: true, elementType: 'div' });
  const monthPickerSlot = slot.optional(monthPicker, { renderByDefault: true, elementType: 'div' });
  const panels: CalendarPanelState[] = [];
  if (showDayPanel && dayPickerSlot) {
    panels.push(createPanel('day', dayPickerSlot, true));
  }
  if (showMonthPanel && monthPickerSlot) {
    panels.push(createPanel(monthPanelView, monthPickerSlot, !panels.length));
  }

  // Go to today

  const resolvedToday = clamp(today);
  const goToTodayEnabled =
    navigatedYear !== resolvedToday.getFullYear() ||
    navigatedDate.getMonth() !== resolvedToday.getMonth() ||
    (weeksToShow !== undefined && weeksToShow <= 5 && compareDatePart(navigatedDate, resolvedToday) !== 0);
  const goToTodaySlot = slot.optional(goToTodayButton, {
    renderByDefault: true,
    defaultProps: {
      children: formatters.goToTodayLabel(),
      'aria-disabled': !goToTodayEnabled,
      disabled: !goToTodayEnabled && !allFocusable,
      type: 'button',
    },
    elementType: 'button',
  });
  if (goToTodaySlot) {
    goToTodaySlot.onClick = mergeCallbacks(goToTodaySlot.onClick, event => {
      if (!event.isDefaultPrevented() && goToTodayEnabled) {
        navigate(event, resolvedToday, 'first');
        if (isOverlay && view !== 'day') {
          changeView(event, 'day', 'first');
        }
      }
    });
  }

  // Root

  const mergedRootRef = useMergedRefs(ref, rootRef);
  const onRootKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    const date = pagingDate.current ?? navigatedDate;
    pagingDate.current = undefined;
    rootProps.onKeyDown?.(event);
    if (event.isDefaultPrevented()) {
      return;
    }
    if (event.key === Escape && onDismiss) {
      event.stopPropagation();
      onDismiss(event, { event, type: 'keydown' });
    } else if (
      (event.key === PageUp || event.key === PageDown) &&
      !isEditable(event.target) &&
      !isNestedWidget(event.target, event.currentTarget)
    ) {
      const direction = event.key === PageUp ? -1 : 1;
      navigate(event, event.shiftKey ? addYears(date, direction) : addMonths(date, direction), 'first');
      event.preventDefault();
    }
  });

  const onRootFocusCapture = useEventCallback((event: React.FocusEvent<HTMLDivElement>) => {
    focusWithin.current = true;
    const target = event.target as Element;
    const focusedView = target.closest('[data-view]')?.getAttribute('data-view') as CalendarView | undefined;
    focused.current = focusedView && { view: focusedView, inGrid: !!target.closest('[data-fui-calendar-grid]') };
  });
  const onRootBlurCapture = useEventCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) {
      focusWithin.current = false;
      focused.current = undefined;
    }
  });

  return {
    panels,
    renderCell,
    renderRow,
    renderWeekdayCell,
    resolveCellProps,
    resolveRowProps,
    resolveWeekdayCellProps,
    components: {
      root: 'div',
      liveRegion: 'div',
      dayPicker: 'div',
      divider: 'div',
      monthPicker: 'div',
      goToTodayButton: 'button',
    },
    root: slot.always(
      {
        ...rootProps,
        ref: mergedRootRef,
        onKeyDown: onRootKeyDown,
        onFocusCapture: mergeCallbacks(rootProps.onFocusCapture, onRootFocusCapture),
        onBlurCapture: mergeCallbacks(rootProps.onBlurCapture, onRootBlurCapture),
      },
      { elementType: 'div' },
    ),
    liveRegion: slot.always(liveRegion, {
      defaultProps: { 'aria-atomic': true, 'aria-live': 'polite', children: selectedDateString },
      elementType: 'div',
    }),
    dayPicker: dayPickerSlot,
    divider: slot.always(divider, { elementType: 'div' }),
    monthPicker: monthPickerSlot,
    goToTodayButton: goToTodaySlot,
  };
};
