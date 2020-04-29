import * as React from 'react';
import { KeyCodes, css, getRTL, getRTLSafeKeyCode, format, IRefObject, findIndex, find } from '../../Utilities';
import { ICalendarStrings, ICalendarIconStrings, ICalendarFormatDateCallbacks } from './Calendar.types';
import { DayOfWeek, FirstWeekOfYear, DateRangeType } from '../../utilities/dateValues/DateValues';
import { FocusZone } from '../../FocusZone';
import { Icon } from '../../Icon';
import {
  addDays,
  addWeeks,
  addMonths,
  compareDates,
  compareDatePart,
  getDateRangeArray,
  isInDateRangeArray,
  getWeekNumber,
  getWeekNumbersInMonth,
  getMonthStart,
  getMonthEnd,
} from '../../utilities/dateMath/DateMath';

import * as stylesImport from './Calendar.scss';
import { useId } from '@uifabric/react-hooks';

const styles: any = stylesImport;

const DAYS_IN_WEEK = 7;

export interface IDayInfo {
  key: string;
  date: string;
  originalDate: Date;
  isInMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isInBounds: boolean;
  onSelected: (ev: React.SyntheticEvent<HTMLElement>) => void;
}

export interface ICalendarDay {
  focus(): void;
}

export interface ICalendarDayProps {
  componentRef?: IRefObject<ICalendarDay>;
  strings: ICalendarStrings;
  selectedDate: Date;
  navigatedDate: Date;
  onSelectDate: (date: Date, selectedDateRangeArray?: Date[]) => void;
  onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;
  onDismiss?: () => void;
  firstDayOfWeek: DayOfWeek;
  dateRangeType: DateRangeType;
  autoNavigateOnSelection: boolean;
  navigationIcons: ICalendarIconStrings;
  today?: Date;
  onHeaderSelect?: (focus: boolean) => void;
  showWeekNumbers?: boolean;
  firstWeekOfYear: FirstWeekOfYear;
  dateTimeFormatter: ICalendarFormatDateCallbacks;
  showSixWeeksByDefault?: boolean;
  minDate?: Date;
  maxDate?: Date;
  restrictedDates?: Date[];
  workWeekDays?: DayOfWeek[];
  showCloseButton?: boolean;
  allFocusable?: boolean;
}

interface IWeekCorners {
  [key: string]: string;
}

//#region CalendarDay
function useDayRefs(weeks: IDayInfo[][]) {
  const days = React.useRef<Record<string, HTMLElement | null>>({});

  const _setDayCellRef = React.useCallback((element: HTMLElement | null, { key }: IDayInfo) => {
    if (element) {
      days.current[key] = element;
    } else {
      delete days.current[key];
    }
  }, []);

  const _applyFunctionToDayRefs = React.useCallback(
    (func: (ref: HTMLElement | null, day: IDayInfo, weekIndex?: number) => void) => () => {
      weeks.map((week: IDayInfo[], weekIndex: number) => {
        week.map(day => {
          const ref = days.current[day.key];
          func(ref, day, weekIndex);
        });
      });
    },
    [weeks],
  );

  return [_setDayCellRef, _applyFunctionToDayRefs] as const;
}

function useTableEventHandlers(
  { dateRangeType }: ICalendarDayProps,
  applyFunctionToDayRefs: (func: (ref: HTMLElement | null, day: IDayInfo, weekIndex?: number) => void) => void,
) {
  const removeClasses = React.useCallback(
    (classesToRemove: string[]) => (ev: React.MouseEvent<HTMLElement>): void => {
      if (
        (ev.target as HTMLElement).contains &&
        ev.relatedTarget &&
        (ev.target as HTMLElement).contains(ev.relatedTarget as HTMLElement)
      ) {
        return;
      }

      applyFunctionToDayRefs((ref, day) => {
        if (ref) {
          classesToRemove.forEach(className => ref.classList.remove(className));
        }
      });
    },
    [applyFunctionToDayRefs],
  );
  const _onTableMouseLeave = React.useCallback(removeClasses([styles.dayPress, styles.dayHover]), [removeClasses]);
  const _onTableMouseUp = React.useCallback(removeClasses([styles.dayPress]), [removeClasses]);

  return dateRangeType !== DateRangeType.Day
    ? ([_onTableMouseLeave, _onTableMouseUp] as const)
    : (([] as unknown) as [undefined, undefined]);
}

function useHeaderEventHandlers({ onHeaderSelect }: ICalendarDayProps) {
  const _onHeaderSelect = React.useCallback(() => onHeaderSelect?.(true), [onHeaderSelect]);
  const _onHeaderKeyDown = React.useCallback(_onKeyDown(_onHeaderSelect), [_onHeaderSelect]);

  return [_onHeaderSelect, _onHeaderKeyDown] as const;
}

function useMonthNavigationHandlers({ onNavigateDate, navigatedDate }: ICalendarDayProps) {
  const _onSelectPrevMonth = React.useCallback(() => onSelectPrevMonth({ onNavigateDate, navigatedDate }), [
    onNavigateDate,
    navigatedDate,
  ]);
  const _onSelectNextMonth = React.useCallback(() => onSelectNextMonth({ onNavigateDate, navigatedDate }), [
    onNavigateDate,
    navigatedDate,
  ]);
  const _onPrevMonthKeyDown = _onKeyDown(_onSelectPrevMonth);
  const _onNextMonthKeyDown = _onKeyDown(_onSelectNextMonth);

  return [_onSelectPrevMonth, _onSelectNextMonth, _onPrevMonthKeyDown, _onNextMonthKeyDown] as const;
}

function useCloseHandlers({ onDismiss }: ICalendarDayProps) {
  const _onClose = React.useCallback(() => onDismiss?.(), [onDismiss]);
  const _onCloseButtonKeyDown = _onKeyDown(_onClose);

  return [_onClose, _onCloseButtonKeyDown] as const;
}

function useComponentRef({ componentRef }: ICalendarDayProps, navigatedDay: React.RefObject<HTMLButtonElement | null>) {
  React.useImperativeHandle(
    componentRef,
    () => ({
      focus() {
        navigatedDay.current?.focus?.();
      },
    }),
    [],
  );
}

export const CalendarDay = React.memo(
  React.forwardRef((props: ICalendarDayProps, ref: React.Ref<HTMLDivElement>) => {
    const _navigatedDay = React.useRef<HTMLButtonElement>(null);
    const activeDescendantId = useId('DatePickerDay-active');
    const dayPickerId = useId('DatePickerDay-dayPicker');
    const monthAndYearId = useId('DatePickerDay-monthAndYear');

    useComponentRef(props, _navigatedDay);

    const weeks = React.useMemo(() => _getWeeks(props), [props]);
    const [_setDayCellRef, _applyFunctionToDayRefs] = useDayRefs(weeks);
    const [_onTableMouseLeave, _onTableMouseUp] = useTableEventHandlers(props, _applyFunctionToDayRefs);
    const [_onHeaderSelect, _onHeaderKeyDown] = useHeaderEventHandlers(props);
    const [
      _onSelectPrevMonth,
      _onSelectNextMonth,
      _onPrevMonthKeyDown,
      _onNextMonthKeyDown,
    ] = useMonthNavigationHandlers(props);
    const [_onClose, _onCloseButtonKeyDown] = useCloseHandlers(props);

    const {
      firstDayOfWeek,
      strings,
      navigatedDate,
      selectedDate,
      dateRangeType,
      navigationIcons: {
        leftNavigation: leftNavigationIcon,
        rightNavigation: rightNavigationIcon,
        closeIcon: closeNavigationIcon,
      },
      showWeekNumbers,
      firstWeekOfYear,
      dateTimeFormatter,
      minDate,
      maxDate,
      showCloseButton,
      allFocusable,
      onHeaderSelect,
    } = props;
    const weekNumbers = showWeekNumbers
      ? getWeekNumbersInMonth(weeks!.length, firstDayOfWeek, firstWeekOfYear, navigatedDate)
      : null;
    const selectedDateWeekNumber = showWeekNumbers
      ? getWeekNumber(selectedDate, firstDayOfWeek, firstWeekOfYear)
      : undefined;

    // When the month is highlighted get the corner dates so that styles can be added to them
    const weekCorners: IWeekCorners = _getWeekCornerStyles(weeks!, dateRangeType);

    // determine if previous/next months are in bounds
    const prevMonthInBounds = minDate ? compareDatePart(minDate, getMonthStart(navigatedDate)) < 0 : true;
    const nextMonthInBounds = maxDate ? compareDatePart(getMonthEnd(navigatedDate), maxDate) < 0 : true;

    return (
      <div
        className={css(
          'ms-DatePicker-dayPicker',
          styles.dayPicker,
          showWeekNumbers &&
            'ms-DatePicker-showWeekNumbers' &&
            (getRTL() ? styles.showWeekNumbersRTL : styles.showWeekNumbers),
        )}
        id={dayPickerId}
      >
        <div className={css('ms-DatePicker-header', styles.header)}>
          <div
            aria-live="polite"
            aria-relevant="text"
            aria-atomic="true"
            id={monthAndYearId}
            className={styles.monthAndYear}
          >
            {onHeaderSelect ? (
              <div
                className={css('ms-DatePicker-monthAndYear js-showMonthPicker', styles.headerToggleView)}
                onClick={_onHeaderSelect}
                onKeyDown={_onHeaderKeyDown}
                aria-label={dateTimeFormatter.formatMonthYear(navigatedDate, strings)}
                role="button"
                tabIndex={0}
              >
                {dateTimeFormatter.formatMonthYear(navigatedDate, strings)}
              </div>
            ) : (
              <div className={css('ms-DatePicker-monthAndYear', styles.monthAndYear)}>
                {dateTimeFormatter.formatMonthYear(navigatedDate, strings)}
              </div>
            )}
          </div>
          <div className={css('ms-DatePicker-monthComponents', styles.monthComponents)}>
            <div className={css('ms-DatePicker-navContainer', styles.navContainer)}>
              <button
                className={css('ms-DatePicker-prevMonth js-prevMonth', styles.prevMonth, {
                  ['ms-DatePicker-prevMonth--disabled ' + styles.prevMonthIsDisabled]: !prevMonthInBounds,
                })}
                disabled={!allFocusable && !prevMonthInBounds}
                aria-disabled={!prevMonthInBounds}
                onClick={prevMonthInBounds ? _onSelectPrevMonth : undefined}
                onKeyDown={prevMonthInBounds ? _onPrevMonthKeyDown : undefined}
                aria-controls={dayPickerId}
                title={
                  strings.prevMonthAriaLabel
                    ? strings.prevMonthAriaLabel + ' ' + strings.months[addMonths(navigatedDate, -1).getMonth()]
                    : undefined
                }
                role="button"
                type="button"
              >
                <Icon iconName={leftNavigationIcon} />
              </button>
              <button
                className={css('ms-DatePicker-nextMonth js-nextMonth', styles.nextMonth, {
                  ['ms-DatePicker-nextMonth--disabled ' + styles.nextMonthIsDisabled]: !nextMonthInBounds,
                })}
                disabled={!allFocusable && !nextMonthInBounds}
                aria-disabled={!nextMonthInBounds}
                onClick={nextMonthInBounds ? _onSelectNextMonth : undefined}
                onKeyDown={nextMonthInBounds ? _onNextMonthKeyDown : undefined}
                aria-controls={dayPickerId}
                title={
                  strings.nextMonthAriaLabel
                    ? strings.nextMonthAriaLabel + ' ' + strings.months[addMonths(navigatedDate, 1).getMonth()]
                    : undefined
                }
                role="button"
                type="button"
              >
                <Icon iconName={rightNavigationIcon} />
              </button>
              {showCloseButton && (
                <button
                  className={css('ms-DatePicker-closeButton js-closeButton', styles.closeButton)}
                  onClick={_onClose}
                  onKeyDown={_onCloseButtonKeyDown}
                  title={strings.closeButtonAriaLabel}
                  role="button"
                  type="button"
                >
                  <Icon iconName={closeNavigationIcon} />
                </button>
              )}
            </div>
          </div>
        </div>
        <FocusZone>
          <table
            className={css('ms-DatePicker-table', styles.table)}
            aria-readonly="true"
            aria-multiselectable="false"
            aria-labelledby={monthAndYearId}
            aria-activedescendant={activeDescendantId}
            role="grid"
          >
            <thead>
              <tr>
                {showWeekNumbers && <th className={css('ms-DatePicker-weekday', styles.weekday)} />}
                {strings.shortDays.map((val, index) => (
                  <th
                    className={css('ms-DatePicker-weekday', styles.weekday)}
                    role="columnheader"
                    scope="col"
                    key={index}
                    title={strings.days[(index + firstDayOfWeek) % DAYS_IN_WEEK]}
                    aria-label={strings.days[(index + firstDayOfWeek) % DAYS_IN_WEEK]}
                    data-is-focusable={allFocusable ? true : undefined}
                  >
                    {strings.shortDays[(index + firstDayOfWeek) % DAYS_IN_WEEK]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody onMouseLeave={_onTableMouseLeave} onMouseUp={_onTableMouseUp}>
              {weeks!.map((week, weekIndex) => (
                <tr key={weekNumbers ? weekNumbers[weekIndex] : weekIndex}>
                  {showWeekNumbers && weekNumbers && (
                    <th
                      className={css(
                        'ms-DatePicker-weekNumbers',
                        'ms-DatePicker-weekday',
                        styles.weekday,
                        styles.weekNumbers,
                      )}
                      key={weekIndex}
                      title={
                        weekNumbers &&
                        strings.weekNumberFormatString &&
                        format(strings.weekNumberFormatString, weekNumbers[weekIndex])
                      }
                      aria-label={
                        weekNumbers &&
                        strings.weekNumberFormatString &&
                        format(strings.weekNumberFormatString, weekNumbers[weekIndex])
                      }
                      scope="row"
                    >
                      <div
                        className={css('ms-DatePicker-day', styles.day, {
                          ['ms-DatePicker-week--highlighted ' + styles.weekIsHighlighted]:
                            selectedDateWeekNumber === weekNumbers[weekIndex],
                        })}
                      >
                        <span>{weekNumbers[weekIndex]}</span>
                      </div>
                    </th>
                  )}
                  {week.map((day, dayIndex) => (
                    <CalendarDayGridCell
                      key={day.key}
                      {...props}
                      weeks={weeks}
                      day={day}
                      weekCorners={weekCorners}
                      dayIndex={dayIndex}
                      weekIndex={weekIndex}
                      setDayCellRef={_setDayCellRef}
                      activeDescendantId={activeDescendantId}
                      navigatedDay={_navigatedDay}
                      applyFunctionToDayRefs={_applyFunctionToDayRefs}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </FocusZone>
      </div>
    );
  }),
);
//#endregion CalendarDay

//#region CalendarDayGridCell

interface ICalendarDayGridCellProps extends ICalendarDayProps {
  weeks: IDayInfo[][];
  day: IDayInfo;
  weekCorners: IWeekCorners;
  dayIndex: number;
  weekIndex: number;
  setDayCellRef: (element: HTMLElement | null, { key }: IDayInfo) => void;
  activeDescendantId: string;
  navigatedDay: React.Ref<HTMLButtonElement>;
  applyFunctionToDayRefs(func: (ref: HTMLElement | null, day: IDayInfo, weekIndex?: number) => void): void;
}

function useDayCellEventHandlers(props: ICalendarDayGridCellProps) {
  const {
    dateRangeType,
    day,
    day: { originalDate },
    weekIndex,
    applyFunctionToDayRefs,
    dayIndex,
    minDate,
    maxDate,
    weeks,
    onNavigateDate,
  } = props;

  const navigateMonthEdge = React.useCallback(
    (ev: React.KeyboardEvent<HTMLElement>): void => {
      let targetDate: Date | undefined = undefined;

      if (weekIndex === 0 && ev.which === KeyCodes.up) {
        targetDate = addWeeks(originalDate, -1);
      } else if (weekIndex === weeks!.length - 1 && ev.which === KeyCodes.down) {
        targetDate = addWeeks(originalDate, 1);
      } else if (dayIndex === 0 && ev.which === getRTLSafeKeyCode(KeyCodes.left)) {
        targetDate = addDays(originalDate, -1);
      } else if (dayIndex === DAYS_IN_WEEK - 1 && ev.which === getRTLSafeKeyCode(KeyCodes.right)) {
        targetDate = addDays(originalDate, 1);
      }

      // Don't navigate to out-of-bounds date
      if (
        targetDate &&
        (minDate ? compareDatePart(minDate, targetDate) < 1 : true) &&
        (maxDate ? compareDatePart(targetDate, maxDate) < 1 : true)
      ) {
        onNavigateDate(targetDate, true);
        ev.preventDefault();
      }
    },
    [weekIndex, dayIndex, weeks, originalDate, minDate, maxDate, onNavigateDate],
  );

  const getChangeCellStylesCallback = React.useCallback(
    (stylesToAdd: string[] | undefined, stylesToRemove?: string[] | undefined) => () => {
      if (stylesToRemove) {
        applyFunctionToDayRefs(ref => {
          stylesToRemove.forEach(styleToRemove => ref && ref.classList.remove(styleToRemove));
        });
      }
      if (stylesToAdd) {
        applyFunctionToDayRefs((ref, refDay, dayWeekIndex) => {
          if (dateRangeType === DateRangeType.Month) {
            if (ref && refDay.originalDate.getMonth() === originalDate.getMonth() && refDay.isInBounds) {
              stylesToAdd.forEach(styleToAdd => ref && ref.classList.add(styleToAdd));
            }
          } else if (ref && dayWeekIndex === weekIndex && refDay.isInBounds) {
            stylesToAdd.forEach(styleToAdd => ref && ref.classList.add(styleToAdd));
          }
        });
      }
    },
    [applyFunctionToDayRefs, dateRangeType, originalDate, weekIndex],
  );

  const _onDayMouseDown = React.useCallback(
    getChangeCellStylesCallback([styles.dayPress, styles.dayIsHighlighted], [styles.dayIsHighlighted]),
    [getChangeCellStylesCallback],
  );

  const _onDayMouseUp = React.useCallback(getChangeCellStylesCallback([styles.dayPress]), [
    getChangeCellStylesCallback,
  ]);

  const _onDayMouseOver = React.useCallback(getChangeCellStylesCallback([styles.dayHover]), [
    getChangeCellStylesCallback,
  ]);

  const _onDayMouseLeave = React.useCallback(getChangeCellStylesCallback(undefined, [styles.dayHover]), [
    getChangeCellStylesCallback,
  ]);

  const _onDayKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLElement>): void => {
      if (ev.which === KeyCodes.enter) {
        _onSelectDate(props, originalDate, ev);
        ev.preventDefault();
      } else {
        navigateMonthEdge(ev);
      }
    },
    [props, navigateMonthEdge, originalDate, weekIndex, dayIndex],
  );

  return dateRangeType !== DateRangeType.Day && day.isInBounds
    ? ([_onDayKeyDown, _onDayMouseDown, _onDayMouseUp, _onDayMouseOver, _onDayMouseLeave] as const)
    : (([_onDayKeyDown] as unknown) as [
        (ev: React.KeyboardEvent<HTMLElement>) => void,
        undefined,
        undefined,
        undefined,
        undefined,
      ]);
}

const CalendarDayGridCell = React.memo((props: ICalendarDayGridCellProps) => {
  const {
    navigatedDate,
    day,
    weekCorners,
    dayIndex,
    weekIndex,
    dateRangeType,
    setDayCellRef,
    dateTimeFormatter,
    strings,
    activeDescendantId,
    allFocusable,
    navigatedDay,
  } = props;

  const [_onDayKeyDown, _onDayMouseDown, _onDayMouseUp, _onDayMouseOver, _onDayMouseLeave] = useDayCellEventHandlers(
    props,
  );
  const isNavigatedDate = compareDates(navigatedDate, day.originalDate);
  return (
    <td
      onClick={day.isInBounds ? day.onSelected : undefined}
      className={css(
        styles.dayWrapper,
        'ms-DatePicker-day',
        _getHighlightedCornerStyle(weekCorners, dayIndex, weekIndex),
        {
          ['ms-DatePicker-weekBackground ' + styles.weekBackground]:
            day.isSelected && (dateRangeType === DateRangeType.Week || dateRangeType === DateRangeType.WorkWeek),
          ['ms-DatePicker-dayBackground ' + styles.dayBackground]: dateRangeType === DateRangeType.Day,
          ['ms-DatePicker-day--highlighted ' + styles.dayIsHighlighted]:
            day.isSelected && dateRangeType === DateRangeType.Day,
          ['ms-DatePicker-day--infocus ' + styles.dayIsFocused]: day.isInBounds && day.isInMonth,
          ['ms-DatePicker-day--outfocus ' + styles.dayIsUnfocused]: day.isInBounds && !day.isInMonth,
          [styles.daySelection]: dateRangeType === DateRangeType.Day,
          [styles.weekSelection]: dateRangeType === DateRangeType.Week || dateRangeType === DateRangeType.WorkWeek,
          [styles.monthSelection]: dateRangeType === DateRangeType.Month,
        },
      )}
      ref={element => setDayCellRef(element, day)}
      onMouseOver={_onDayMouseOver}
      onMouseLeave={_onDayMouseLeave}
      onMouseDown={_onDayMouseDown}
      onMouseUp={_onDayMouseUp}
      role={'gridcell'}
    >
      <button
        key={day.key + 'button'}
        onClick={day.isInBounds ? day.onSelected : undefined}
        className={css(styles.day, 'ms-DatePicker-day-button', {
          ['ms-DatePicker-day--disabled ' + styles.dayIsDisabled]: !day.isInBounds,
          ['ms-DatePicker-day--today ' + styles.dayIsToday]: day.isToday,
        })}
        onKeyDown={_onDayKeyDown}
        aria-label={dateTimeFormatter.formatMonthDayYear(day.originalDate, strings)}
        id={isNavigatedDate ? activeDescendantId : undefined}
        aria-readonly={true}
        aria-selected={day.isInBounds ? day.isSelected : undefined}
        data-is-focusable={allFocusable || (day.isInBounds ? true : undefined)}
        ref={isNavigatedDate ? navigatedDay : undefined}
        disabled={!allFocusable && !day.isInBounds}
        aria-disabled={!day.isInBounds}
        type="button"
      >
        <span aria-hidden="true">{dateTimeFormatter.formatDay(day.originalDate)}</span>
      </button>
    </td>
  );
});

//#endregion CalendarDayGridCell

const onSelectNextMonth = ({
  onNavigateDate,
  navigatedDate,
}: Pick<ICalendarDayProps, 'onNavigateDate' | 'navigatedDate'>): void => {
  onNavigateDate(addMonths(navigatedDate, 1), false);
};

const onSelectPrevMonth = ({
  onNavigateDate,
  navigatedDate,
}: Pick<ICalendarDayProps, 'onNavigateDate' | 'navigatedDate'>): void => {
  onNavigateDate(addMonths(navigatedDate, -1), false);
};

function _getIsRestrictedDate(date: Date, { restrictedDates }: ICalendarDayProps): boolean {
  if (!restrictedDates) {
    return false;
  }
  const restrictedDate = find(restrictedDates, rd => {
    return compareDates(rd, date);
  });
  return restrictedDate ? true : false;
}

function _getWeeks(propsToUse: ICalendarDayProps): IDayInfo[][] {
  const {
    navigatedDate,
    selectedDate,
    dateRangeType,
    firstDayOfWeek,
    today,
    minDate,
    maxDate,
    showSixWeeksByDefault,
    workWeekDays,
  } = propsToUse;
  const date = new Date(navigatedDate.getFullYear(), navigatedDate.getMonth(), 1);
  const todaysDate = today || new Date();
  const weeks: IDayInfo[][] = [];

  // Cycle the date backwards to get to the first day of the week.
  while (date.getDay() !== firstDayOfWeek) {
    date.setDate(date.getDate() - 1);
  }

  // a flag to indicate whether all days of the week are in the month
  let isAllDaysOfWeekOutOfMonth = false;

  // in work week view we want to select the whole week
  const selectedDateRangeType = dateRangeType === DateRangeType.WorkWeek ? DateRangeType.Week : dateRangeType;
  let selectedDates = getDateRangeArray(selectedDate, selectedDateRangeType, firstDayOfWeek, workWeekDays);
  if (dateRangeType !== DateRangeType.Day) {
    selectedDates = _getBoundedDateRange(selectedDates, minDate, maxDate);
  }

  let shouldGetWeeks = true;

  for (let weekIndex = 0; shouldGetWeeks; weekIndex++) {
    const week: IDayInfo[] = [];

    isAllDaysOfWeekOutOfMonth = true;

    for (let dayIndex = 0; dayIndex < DAYS_IN_WEEK; dayIndex++) {
      const originalDate = new Date(date.toString());
      const dayInfo: IDayInfo = {
        key: date.toString(),
        date: date.getDate().toString(),
        originalDate: originalDate,
        isInMonth: date.getMonth() === navigatedDate.getMonth(),
        isToday: compareDates(todaysDate, date),
        isSelected: isInDateRangeArray(date, selectedDates),
        onSelected: _onSelectDate.bind(null, propsToUse, originalDate),
        isInBounds:
          (minDate ? compareDatePart(minDate, date) < 1 : true) &&
          (maxDate ? compareDatePart(date, maxDate) < 1 : true) &&
          !_getIsRestrictedDate(date, propsToUse),
      };

      week.push(dayInfo);

      if (dayInfo.isInMonth) {
        isAllDaysOfWeekOutOfMonth = false;
      }

      date.setDate(date.getDate() + 1);
    }

    // We append the condition of the loop depending upon the showSixWeeksByDefault prop.
    shouldGetWeeks = showSixWeeksByDefault ? !isAllDaysOfWeekOutOfMonth || weekIndex <= 5 : !isAllDaysOfWeekOutOfMonth;
    if (shouldGetWeeks) {
      weeks.push(week);
    }
  }

  return weeks;
}

function _getBoundedDateRange(dateRange: Date[], minDate?: Date, maxDate?: Date): Date[] {
  let boundedDateRange = [...dateRange];
  if (minDate) {
    boundedDateRange = boundedDateRange.filter(date => compareDatePart(date, minDate as Date) >= 0);
  }
  if (maxDate) {
    boundedDateRange = boundedDateRange.filter(date => compareDatePart(date, maxDate as Date) <= 0);
  }
  return boundedDateRange;
}

function _onSelectDate(props: ICalendarDayProps, selectedDate: Date, ev: React.SyntheticEvent<HTMLElement>): void {
  const {
    onSelectDate,
    dateRangeType,
    firstDayOfWeek,
    navigatedDate,
    autoNavigateOnSelection,
    minDate,
    maxDate,
    workWeekDays,
  } = props;

  if (ev) {
    ev.stopPropagation();
  }

  let dateRange = getDateRangeArray(selectedDate, dateRangeType, firstDayOfWeek, workWeekDays);
  if (dateRangeType !== DateRangeType.Day) {
    dateRange = _getBoundedDateRange(dateRange, minDate, maxDate);
  }
  dateRange = dateRange.filter(d => {
    return !_getIsRestrictedDate(d, props);
  });

  if (onSelectDate) {
    onSelectDate(selectedDate, dateRange);
  }

  // Navigate to next or previous month if needed
  if (autoNavigateOnSelection && selectedDate.getMonth() !== navigatedDate.getMonth()) {
    const compareResult = compareDatePart(selectedDate, navigatedDate);
    if (compareResult < 0) {
      onSelectPrevMonth(props);
    } else if (compareResult > 0) {
      onSelectNextMonth(props);
    }
  }
}

function _getHighlightedCornerStyle(weekCorners: IWeekCorners, dayIndex: number, weekIndex: number): string {
  const cornerStyle = weekCorners[weekIndex + '_' + dayIndex] ? weekCorners[weekIndex + '_' + dayIndex] : '';
  return cornerStyle;
}

const _onKeyDown = (callback: () => void) => (ev: React.KeyboardEvent<HTMLElement>): void => {
  if (ev.which === KeyCodes.enter) {
    callback();
  }
};

/**
 * Returns the index of the last element in the array where the predicate is true, and -1
 * otherwise
 * @param items Array of items to be iterated over using the predicate
 * @param predicate find calls predicate once for each element of the array, in descending
 * order, until it finds one where predicate returns true if such an element is found.
 */
function _findLastIndex<T>(items: T[], predicate: (item: T) => boolean): number {
  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];

    if (predicate(item)) {
      return i;
    }
  }

  return -1;
}

function _getWeekCornerStyles(weeks: IDayInfo[][], dateRangeType: DateRangeType): IWeekCorners {
  const weekCornersStyled: any = {};

  switch (dateRangeType) {
    case DateRangeType.Month:
      /* need to handle setting all of the corners on arbitrarily shaped blobs
            __
         __|A |
        |B |C |__
        |D |E |F |

        in this case, A needs top left rounded, top right rounded
        B needs top left rounded
        C doesn't need any rounding
        D needs bottom left rounded
        E doesn't need any rounding
        F needs top right rounding
      */

      // if there's an item above, lose both top corners. Item below, lose both bottom corners, etc.
      weeks.forEach((week: IDayInfo[], weekIndex: number) => {
        week.forEach((day: IDayInfo, dayIndex: number) => {
          const above =
            weeks[weekIndex - 1] &&
            weeks[weekIndex - 1][dayIndex] &&
            weeks[weekIndex - 1][dayIndex].originalDate.getMonth() ===
              weeks[weekIndex][dayIndex].originalDate.getMonth();
          const below =
            weeks[weekIndex + 1] &&
            weeks[weekIndex + 1][dayIndex] &&
            weeks[weekIndex + 1][dayIndex].originalDate.getMonth() ===
              weeks[weekIndex][dayIndex].originalDate.getMonth();
          const left =
            weeks[weekIndex][dayIndex - 1] &&
            weeks[weekIndex][dayIndex - 1].originalDate.getMonth() ===
              weeks[weekIndex][dayIndex].originalDate.getMonth();
          const right =
            weeks[weekIndex][dayIndex + 1] &&
            weeks[weekIndex][dayIndex + 1].originalDate.getMonth() ===
              weeks[weekIndex][dayIndex].originalDate.getMonth();

          const roundedTopLeft = !above && !left;
          const roundedTopRight = !above && !right;
          const roundedBottomLeft = !below && !left;
          const roundedBottomRight = !below && !right;

          let style = '';
          if (roundedTopLeft) {
            style = getRTL()
              ? style.concat(styles.topRightCornerDate + ' ')
              : style.concat(styles.topLeftCornerDate + ' ');
          }
          if (roundedTopRight) {
            style = getRTL()
              ? style.concat(styles.topLeftCornerDate + ' ')
              : style.concat(styles.topRightCornerDate + ' ');
          }
          if (roundedBottomLeft) {
            style = getRTL()
              ? style.concat(styles.bottomRightCornerDate + ' ')
              : style.concat(styles.bottomLeftCornerDate + ' ');
          }
          if (roundedBottomRight) {
            style = getRTL()
              ? style.concat(styles.bottomLeftCornerDate + ' ')
              : style.concat(styles.bottomRightCornerDate + ' ');
          }

          if (!above) {
            style = style.concat(styles.topDate + ' ');
          }

          if (!below) {
            style = style.concat(styles.bottomDate + ' ');
          }

          if (!right) {
            style = style.concat(styles.rightDate + ' ');
          }

          if (!left) {
            style = style.concat(styles.leftdate + ' ');
          }

          weekCornersStyled[weekIndex + '_' + dayIndex] = style;
        });
      });
      break;
    case DateRangeType.Week:
    case DateRangeType.WorkWeek:
      weeks.forEach((week: IDayInfo[], weekIndex: number) => {
        const minIndex = findIndex(week, (item: IDayInfo) => {
          return item.isInBounds;
        });
        const maxIndex = _findLastIndex(week, (item: IDayInfo) => {
          return item.isInBounds;
        });

        const leftStyle = styles.topLeftCornerDate + ' ' + styles.bottomLeftCornerDate;
        const rightStyle = styles.topRightCornerDate + ' ' + styles.bottomRightCornerDate;
        weekCornersStyled[weekIndex + '_' + minIndex] = getRTL() ? rightStyle : leftStyle;
        weekCornersStyled[weekIndex + '_' + maxIndex] = getRTL() ? leftStyle : rightStyle;
      });
      break;
  }

  return weekCornersStyled;
}
