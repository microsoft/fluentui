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
import {
  mergeCallbacks,
  slot,
  useControllableState,
  useEventCallback,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
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
type FocusRequest = 'first' | 'month' | 'dayHeading' | 'monthHeading';

const YEAR_COUNT = 12;
const RANGE_HOVERED = 'data-range-hovered';
const RANGE_PRESSED = 'data-range-pressed';
/** Identifies a cell's data, so renderers can omit or reorder cells without misattributing events. */
const CELL_KEY = 'data-fui-calendar-cell';

/** The rendered cell elements of a grid, by cell key. */
const getCellElements = (grid: Element): Map<string | null, HTMLElement> =>
  new Map(getGridCells(grid).map(element => [element.getAttribute(CELL_KEY), element]));

const isPrevented = (event: React.SyntheticEvent): boolean => event.isDefaultPrevented();

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
  if (process.env.NODE_ENV !== 'production') {
    const isValueOutOfRange = !!value && compareDatePart(value, clamp(value)) !== 0;
    // eslint-disable-next-line react-hooks/rules-of-hooks -- "process.env" does not change in runtime
    const warnedRef = React.useRef(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks -- "process.env" does not change in runtime
    React.useEffect(() => {
      if (isValueOutOfRange && !warnedRef.current) {
        warnedRef.current = true;
        // eslint-disable-next-line no-console
        console.warn('Calendar: value is outside minDate/maxDate and is rendered as an empty selection.');
      }
    }, [isValueOutOfRange]);
  }

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
  const [pickerNavigation, setPickerNavigation] = React.useState({ time: navigatedTime, year: navigatedYear });
  const pickerYear = pickerNavigation.time === navigatedTime ? pickerNavigation.year : navigatedYear;
  const setPickerYear = (year: number) => setPickerNavigation({ time: navigatedTime, year });
  // Reset only when the displayed date changes, before children receive a stale picker year.
  if (pickerNavigation.time !== navigatedTime) {
    setPickerNavigation({ time: navigatedTime, year: navigatedYear });
  }
  const pickerDate = addYears(navigatedDate, pickerYear - navigatedYear);

  // Focus

  const rootRef = React.useRef<HTMLDivElement>(null);
  const focusRequest = React.useRef<FocusRequest | undefined>(undefined);
  const focusWithin = React.useRef(false);
  // The view of the panel that holds focus, and whether focus is in its grid.
  const focused = React.useRef<{ view: CalendarView; inGrid: boolean } | undefined>(undefined);
  // The day a grid pages from, kept only for the keydown that set it.
  const pagingDate = React.useRef<{ event: Event; date: Date } | undefined>(undefined);
  // Refs are written only from event handlers, through these stable callbacks.
  const setPagingDate = useEventCallback((event: React.KeyboardEvent, date: Date | undefined) => {
    pagingDate.current = date && { event: event.nativeEvent, date };
  });
  // Runs a change callback, then requests focus unless the callback moved focus out of the calendar.
  const notifyChange = useEventCallback((notify: () => void, focus: FocusRequest | undefined) => {
    const hadFocus = focusWithin.current;
    notify();
    const exited = hadFocus && !focusWithin.current;
    focusRequest.current = exited ? undefined : focus;
    return !exited;
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
    if (!root) {
      return;
    }
    const active = (root.getRootNode() as Document | ShadowRoot).activeElement;
    const isInside = !!active && root.contains(active);
    // Focus moves only when it is in the calendar, was in it, or was lost with a removed element.
    if (request && (!active || active === targetDocument?.body || focusWithin.current || isInside)) {
      const panels = root.querySelectorAll('[data-view]');
      if (request === 'dayHeading' || request === 'monthHeading') {
        const panel = request === 'dayHeading' ? panels[0] : panels[panels.length - 1];
        panel?.querySelector<HTMLElement>('[data-fui-calendar-heading]')?.focus();
      } else {
        focusCalendarGrid(request === 'month' ? panels[panels.length - 1] : panels[0]);
      }
    } else if (!isInside) {
      // Focus is outside, including focus lost with an element removed for another reason, such as a renderer
      // omitting the focused cell. Stop tracking it, so a later view change does not pull focus back.
      focusWithin.current = false;
      focused.current = undefined;
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
    return notifyChange(
      () =>
        onDisplayedDateChange?.(event, {
          event: event as CalendarEvent,
          type: eventType(event),
          displayedDate: displayed,
        }),
      focus,
    );
  };

  const changeView = (event: CalendarEvent, nextView: CalendarView, focus?: FocusRequest) => {
    if (nextView === 'year') {
      setYearRange({ anchor: pickerYear, from: pickerYear });
    }
    setView(nextView);
    notifyChange(() => onViewChange?.(event, { event, type: eventType(event), view: nextView }), focus);
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
    const date = setMonth(pickerDate, index);
    return {
      type: 'month',
      key: `${index}`,
      index,
      label: format({ date, format: 'shortMonth' }),
      isNavigated: false,
      isCurrent: navigatedYear === pickerYear && navigatedDate.getMonth() === index,
      isSelected:
        !!monthSelection && monthSelection.getMonth() === index && monthSelection.getFullYear() === pickerYear,
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

  const [yearRange, setYearRange] = React.useState({ anchor: pickerYear, from: pickerYear });
  if (yearRange.anchor !== pickerYear) {
    setYearRange({ anchor: pickerYear, from: pickerYear });
  }
  const fromYear = yearRange.anchor === pickerYear ? yearRange.from : pickerYear;
  const toYear = fromYear + YEAR_COUNT - 1;
  const minYear = minDate?.getFullYear();
  const maxYear = maxDate?.getFullYear();
  const focusYear = Math.min(
    allFocusable ? toYear : Math.min(toYear, maxYear ?? toYear),
    Math.max(allFocusable ? fromYear : Math.max(fromYear, minYear ?? fromYear), pickerYear),
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
      isCurrent: year === pickerYear,
      isSelected: year === selectedDate?.getFullYear(),
      isInBounds: !((minYear !== undefined && year < minYear) || (maxYear !== undefined && year > maxYear)),
    };
  });

  const toRows = (cells: (CalendarMonthCellData | CalendarYearCellData)[], columns: number) => {
    if (columns !== 3 && columns !== 4) {
      throw new RangeError(
        process.env.NODE_ENV !== 'production' ? 'Calendar picker columns must be 3 or 4.' : undefined,
      );
    }
    return Array.from({ length: YEAR_COUNT / columns }, (_, key) => ({
      type: cells[0].type,
      key,
      cells: cells.slice(key * columns, (key + 1) * columns),
    })) as CalendarRowData[];
  };

  // Shared cell, row and weekday props

  const tabStops: Partial<Record<CalendarView, string>> = {};
  /** Each visible grid's cells, so the tab stop can move to a rendered cell when a renderer omits it. */
  const grids: {
    view: CalendarView;
    resetKey: string;
    cells: CalendarCellData[];
    isFocusable: (cell: CalendarCellData) => boolean;
  }[] = [];
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
        'aria-current': isDay ? (cell.isToday ? 'date' : undefined) : cell.isCurrent ? 'true' : undefined,
        'aria-disabled': disabled,
        'aria-label':
          cell.type === 'month' ? format({ date: setMonth(pickerDate, cell.index), format: 'monthYear' }) : undefined,
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
          [CELL_KEY]: cell.key,
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
  const yearString = format({ date: pickerDate, format: 'year' });
  const selectedDateString = selectedDate
    ? formatters.selectedDateLabel({ date: selectedDate, formattedDate: formatDay(selectedDate) })
    : '';
  const todayDateString = formatters.todayDateLabel({ date: today, formattedDate: formatDay(today) });

  // Panels

  /** Wires activation of a header button, reporting Enter as a `keydown`. */
  const onActivate = <T,>(buttonSlot: T, enabled: boolean, activate: (event: CalendarEvent) => void): T => {
    const typed = buttonSlot as React.ButtonHTMLAttributes<HTMLElement>;
    typed.onClick = mergeCallbacks(typed.onClick, event => {
      if (enabled && !isPrevented(event)) {
        activate(event);
      }
    });
    typed.onKeyDown = mergeCallbacks(typed.onKeyDown, event => {
      if (enabled && !isPrevented(event) && event.key === Enter) {
        activate(event);
        event.preventDefault();
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
    const resetKey = isDay ? dayResetKey : `${isYear ? fromYear : pickerYear}:${columns}`;
    const isFocusable = (cell: CalendarCellData | undefined) =>
      !!cell && (cell.type === 'day' ? isDayFocusable(cell) : allFocusable || cell.isInBounds);
    const activeKey = isDay ? activeDayKey : getActiveKey(panelView, resetKey);
    const navigatedCell = cells.find(cell => cell.isNavigated);
    // The last focused cell stays programmatically focusable even after the grid shows other cells.
    activeKeys[panelView] = activeCells[panelView]?.split('|')[1];
    tabStops[panelView] = isDay
      ? dayTabStop?.key
      : activeKey ?? (isFocusable(navigatedCell) ? navigatedCell!.key : undefined);
    grids.push({ view: panelView, resetKey, cells, isFocusable });

    const getCell = (event: CalendarEvent): [HTMLElement, CalendarCellData] | undefined => {
      const element = getEventCell(event);
      const key = element?.getAttribute(CELL_KEY);
      const cell = cells.find(candidate => candidate.key === key);
      return element && cell && (cell.type !== 'day' || cell.originalDate) ? [element, cell] : undefined;
    };

    const periodStart = isDay ? getMonthStart(navigatedDate) : createDate(isYear ? fromYear : pickerYear, 0, 1);
    const periodEnd = isDay ? getMonthEnd(navigatedDate) : createDate((isYear ? toYear : pickerYear) + 1, 0, 0);
    /** Whether any of the previous or next period lies within the bounds. */
    const canPage = (direction: 1 | -1) =>
      direction < 0
        ? !minDate || compareDatePart(minDate, periodStart) < 0
        : !maxDate || compareDatePart(periodEnd, maxDate) < 0;
    /** Shows the previous or next period: a month, a picker year or a year range. */
    const page = (event: CalendarEvent, direction: 1 | -1, focus?: FocusRequest) => {
      if (isYear) {
        setYearRange({ anchor: pickerYear, from: fromYear + direction * YEAR_COUNT });
      } else if (!isDay && hasDayPanel) {
        setPickerYear(pickerYear + direction);
      } else {
        return navigate(event, isDay ? addMonths(navigatedDate, direction) : addYears(pickerDate, direction), focus);
      }
      return notifyChange(() => undefined, focus);
    };

    const activateCell = (event: CalendarEvent, cell: CalendarCellData) => {
      if (cell.type === 'day') {
        selectDate(event, cell.originalDate!);
        navigate(event, cell.originalDate!, 'first');
      } else if (cell.type === 'month') {
        let date = setMonth(pickerDate, cell.index);
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
        if (cell.year !== pickerYear) {
          // Keep the displayed month within the bounds of the new year.
          let date = addYears(pickerDate, cell.year - pickerYear);
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
          if (hasDayPanel) {
            setPickerYear(date.getFullYear());
          } else {
            navigate(event, date);
          }
        }
        changeView(event, 'month', 'month');
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
      const elements = getCellElements(gridElement);
      cells.forEach(candidate => {
        const date = candidate.type === 'day' && candidate.originalDate;
        if (date && range.some(rangeDate => compareDatePart(rangeDate, date) === 0)) {
          elements.get(candidate.key)?.toggleAttribute(attribute, on);
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
      if (!found || isPrevented(event) || (!isDay && event.target !== found[0])) {
        return;
      }
      const [, cell] = found;
      const index = cells.indexOf(cell);
      if ((event.key === PageUp || event.key === PageDown) && cell.type === 'day') {
        // Calendar pages from the focused day.
        setPagingDate(event, cell.originalDate!);
      } else if (event.key === PageUp || event.key === PageDown) {
        // Month and year grids page like their previous and next buttons, keeping focus on the same cell position.
        const direction = event.key === PageUp ? -1 : 1;
        event.preventDefault();
        if (canPage(direction)) {
          const target = cell.type === 'year' ? cell.year + direction * YEAR_COUNT : pickerYear + direction;
          const start = createDate(target, cell.type === 'month' ? cell.index : 0, 1);
          const end = cell.type === 'month' ? getMonthEnd(start) : createDate(target, 11, 31);
          // An unavailable target leaves the tab stop to the new grid's navigated or nearest available cell.
          if (
            allFocusable ||
            ((!minDate || compareDatePart(minDate, end) < 1) && (!maxDate || compareDatePart(start, maxDate) < 1))
          ) {
            setActiveCell(
              panelView,
              `${isYear ? fromYear + direction * YEAR_COUNT : target}:${columns}`,
              cell.type === 'year' ? `${target}` : cell.key,
            );
          }
          page(event, direction, 'month');
        }
      } else if ((event.key === Enter || event.key === Space) && cell.isInBounds) {
        activateCell(event, cell);
        event.preventDefault();
      } else if (isGridNavigationKey(event)) {
        // Cells a renderer omitted cannot take focus.
        const elements = getCellElements(event.currentTarget);
        const targetIndex = getTargetIndex(
          event.key,
          rtl,
          index,
          cells.length,
          columns,
          i => isFocusable(cells[i]) && elements.has(cells[i].key),
          isDay,
        );
        const target = targetIndex === undefined ? undefined : cells[targetIndex];
        if (target) {
          event.preventDefault();
          setActiveCell(panelView, resetKey, target.key);
          elements.get(target.key)?.focus();
          if (target.type === 'day' && !target.isInMonth && target.isInBounds) {
            navigate(event, target.originalDate!, 'first');
          }
          return;
        }
        if (cell.type === 'day' && event.key !== Home && event.key !== End && !event.altKey) {
          navigateBeyond(event, cell.originalDate!);
        }
        // Boundary keys are owned too, so the page does not scroll when focus cannot move further.
        event.preventDefault();
      }
    });
    gridSlot.onClick = mergeCallbacks(gridSlot.onClick, (event: React.MouseEvent<HTMLElement>) => {
      const found = getCell(event);
      if (found && !isPrevented(event)) {
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

    // A hidden year grid cannot be opened, so a day heading set to open it falls back to the default: the month grid
    // in the overlay layout, a static heading beside the visible month grid otherwise.
    const dayView = dayHeadingView === 'year' && yearPickerHidden ? undefined : dayHeadingView;
    const headingView: CalendarView | undefined = isDay
      ? hasMonthPanel
        ? dayView ?? (isOverlay ? 'month' : undefined)
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
            : formatters.monthPickerHeaderLabel({ date: pickerDate, formattedDate: yearString })
          : undefined,
        type: headingView ? 'button' : undefined,
      },
      elementType: headingView ? 'button' : 'div',
    });
    Object.assign(headingSlot, { 'data-fui-calendar-heading': '' });
    onActivate(headingSlot, !!headingView, event =>
      changeView(event, headingView!, headingView === 'day' ? 'first' : 'month'),
    );

    const unit = isDay ? 'Month' : isYear ? 'YearRange' : 'Year';
    const getNavButton = (button: ButtonSlot, direction: 1 | -1) => {
      const date = isDay ? addMonths(navigatedDate, direction) : addYears(pickerDate, direction);
      const from = fromYear + direction * YEAR_COUNT;
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
      return navButton(button, canPage(direction), label, event => page(event, direction));
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

  // A renderer may omit the tab-stop cell, or its whole row. Move the tab stop to the nearest rendered, focusable cell,
  // before paint and before focus requests run, so Tab and programmatic focus still reach the grid.
  useIsomorphicLayoutEffect(() => {
    for (const { view: gridView, resetKey, cells, isFocusable } of grids) {
      const gridElement = rootRef.current?.querySelector(`[data-view="${gridView}"] [data-fui-calendar-grid]`);
      const elements = gridElement ? getCellElements(gridElement) : new Map<string | null, HTMLElement>();
      if ([...elements.values()].some(element => element.getAttribute('tabindex') === '0')) {
        continue;
      }
      const from = cells.findIndex(cell => cell.key === tabStops[gridView]);
      let fallback: CalendarCellData | undefined;
      let closest = Infinity;
      cells.forEach((cell, index) => {
        // At equal distance the later cell wins, as moving forward is the likelier way to reach an available date.
        const distance = 2 * Math.abs(index - from) - (index > from ? 1 : 0);
        if (distance < closest && isFocusable(cell) && elements.has(cell.key)) {
          closest = distance;
          fallback = cell;
        }
      });
      if (fallback) {
        elements.get(fallback.key)!.tabIndex = 0;
        if (activeCells[gridView] !== `${resetKey}|${fallback.key}`) {
          setActiveCell(gridView, resetKey, fallback.key);
        }
      }
    }
  });

  // Go to today

  const resolvedToday = clamp(today);
  const goToTodayEnabled =
    navigatedYear !== resolvedToday.getFullYear() ||
    (hasMonthPanel && pickerYear !== resolvedToday.getFullYear()) ||
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
      if (!isPrevented(event) && goToTodayEnabled) {
        setPickerYear(resolvedToday.getFullYear());
        const keepsFocus = navigate(event, resolvedToday, 'first');
        if (isOverlay && view !== 'day') {
          changeView(event, 'day', keepsFocus ? 'first' : undefined);
        }
      }
    });
  }

  // Root

  const mergedRootRef = useMergedRefs(ref, rootRef);
  const onRootKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    const paging = pagingDate.current;
    pagingDate.current = undefined;
    const date = paging?.event === event.nativeEvent ? paging.date : navigatedDate;
    rootProps.onKeyDown?.(event);
    if (isPrevented(event)) {
      return;
    }
    const inYearPicker = (event.target as Element).closest('[data-view]')?.getAttribute('data-view') === 'year';
    if (event.key === Escape && ((isOverlay && view !== 'day') || (inYearPicker && monthPanelView === 'year'))) {
      event.preventDefault();
      event.stopPropagation();
      // Escape steps back one level: from the year grid to the month grid, then from an overlay month grid to days.
      const toDay = isOverlay && monthPanelView === 'month';
      changeView(event, toDay ? 'day' : 'month', toDay ? 'dayHeading' : 'monthHeading');
    } else if (event.key === Escape && onDismiss) {
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
    const { currentTarget, relatedTarget, target } = event;
    // Focus left the calendar: for another element, or for the page or window (no related target) while the blurred
    // element stays in the document. An element removed while focused does not count, so its focus can be restored.
    if (relatedTarget ? !currentTarget.contains(relatedTarget) : (target as Node).isConnected) {
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
