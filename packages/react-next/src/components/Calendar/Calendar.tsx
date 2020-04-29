import * as React from 'react';
import {
  ICalendar,
  ICalendarProps,
  ICalendarStrings,
  ICalendarIconStrings,
  ICalendarFormatDateCallbacks,
} from './Calendar.types';
import { DayOfWeek, FirstWeekOfYear, DateRangeType } from '../../utilities/dateValues/DateValues';
import { CalendarDay, ICalendarDay } from './CalendarDay';
import { CalendarMonth, ICalendarMonth } from './CalendarMonth';
import { getDateRangeArray, compareDates } from '../../utilities/dateMath/DateMath';
import { css, KeyCodes, getNativeProps, divProperties, FocusRects, getPropsWithDefaults } from '../../Utilities';
import * as stylesImport from './Calendar.scss';
const styles: any = stylesImport;

const leftArrow = 'Up';
const rightArrow = 'Down';
const closeIcon = 'CalculatorMultiply';
const iconStrings: ICalendarIconStrings = {
  leftNavigation: leftArrow,
  rightNavigation: rightArrow,
  closeIcon: closeIcon,
};
const defaultWorkWeekDays: DayOfWeek[] = [
  DayOfWeek.Monday,
  DayOfWeek.Tuesday,
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday,
  DayOfWeek.Friday,
];

const dateTimeFormatterCallbacks: ICalendarFormatDateCallbacks = {
  formatMonthDayYear: (date: Date, strings: ICalendarStrings) =>
    strings.months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear(),
  formatMonthYear: (date: Date, strings: ICalendarStrings) =>
    strings.months[date.getMonth()] + ' ' + date.getFullYear(),
  formatDay: (date: Date) => date.getDate().toString(),
  formatYear: (date: Date) => date.getFullYear().toString(),
};

export interface ICalendarState {
  /** The currently focused date in the day picker, but not necessarily selected */
  navigatedDayDate?: Date;

  /** The currently focused date in the month picker, but not necessarily selected */
  navigatedMonthDate?: Date;

  /** The currently selected date in the calendar */
  selectedDate?: Date;

  /** State used to show/hide month picker */
  isMonthPickerVisible?: boolean;

  /** State used to show/hide day picker */
  isDayPickerVisible?: boolean;
}

const defaultProps: ICalendarProps = {
  onSelectDate: undefined,
  onDismiss: undefined,
  isMonthPickerVisible: true,
  isDayPickerVisible: true,
  showMonthPickerAsOverlay: false,
  value: undefined,
  today: new Date(),
  firstDayOfWeek: DayOfWeek.Sunday,
  dateRangeType: DateRangeType.Day,
  autoNavigateOnSelection: false,
  showGoToToday: true,
  strings: null,
  highlightCurrentMonth: false,
  highlightSelectedMonth: false,
  navigationIcons: iconStrings,
  showWeekNumbers: false,
  firstWeekOfYear: FirstWeekOfYear.FirstDay,
  dateTimeFormatter: dateTimeFormatterCallbacks,
  showSixWeeksByDefault: false,
  workWeekDays: defaultWorkWeekDays,
  showCloseButton: false,
  allFocusable: false,
};

export const Calendar = React.memo(
  React.forwardRef((propsWithoutDefaults: ICalendarProps, forwardedRef: React.Ref<HTMLDivElement>) => {
    const props = getPropsWithDefaults(defaultProps, propsWithoutDefaults);

    const {
      firstDayOfWeek,
      dateRangeType,
      strings,
      showMonthPickerAsOverlay,
      autoNavigateOnSelection,
      showGoToToday,
      highlightCurrentMonth,
      highlightSelectedMonth,
      navigationIcons,
      minDate,
      maxDate,
      restrictedDates,
      className,
      showCloseButton,
      allFocusable,
      yearPickerHidden,
      today,
    } = props;

    const _dayPicker = React.useRef<ICalendarDay | null>(null);
    const _monthPicker = React.useRef<ICalendarMonth | null>(null);

    const [focus, setFocusOnUpdate] = useFocusMethod(_dayPicker, _monthPicker);
    React.useImperativeHandle<ICalendar, ICalendar>(props.componentRef, () => ({ focus }), [focus]);

    const [
      selectedDate,
      navigatedDayDate,
      navigatedMonthDate,
      _onNavigateDayDate,
      _onNavigateMonthDate,
      _onSelectDate,
      _onGotoToday,
    ] = useNavigationState(props, setFocusOnUpdate);
    const [isMonthPickerVisible, isDayPickerVisible, _onHeaderSelect] = usePickerVisibility(props, setFocusOnUpdate);

    const _onGotoTodayKeyDown = React.useCallback(
      (ev: React.KeyboardEvent<HTMLElement>): void => {
        if (ev.which === KeyCodes.enter) {
          ev.preventDefault();
          _onGotoToday();
        }
      },
      [_onGotoToday],
    );

    const _onDatePickerPopupKeyDown = React.useCallback(
      (ev: React.KeyboardEvent<HTMLElement>): void => {
        switch (ev.which) {
          case KeyCodes.enter:
            ev.preventDefault();
            break;

          case KeyCodes.backspace:
            ev.preventDefault();
            break;

          case KeyCodes.escape:
            props.onDismiss?.();
            break;

          default:
            break;
        }
      },
      [props.onDismiss],
    );

    const rootClass = 'ms-DatePicker';
    const nativeProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties, ['value']);

    const onHeaderSelect = showMonthPickerAsOverlay ? _onHeaderSelect : undefined;
    const monthPickerOnly = !showMonthPickerAsOverlay && !isDayPickerVisible;
    const overlayedWithButton = showMonthPickerAsOverlay && showGoToToday;

    let goTodayEnabled = showGoToToday;

    if (goTodayEnabled && navigatedDayDate && navigatedMonthDate && today) {
      goTodayEnabled =
        navigatedDayDate.getFullYear() !== today.getFullYear() ||
        navigatedDayDate.getMonth() !== today.getMonth() ||
        navigatedMonthDate.getFullYear() !== today.getFullYear() ||
        navigatedMonthDate.getMonth() !== today.getMonth();
    }

    return (
      <div className={css(rootClass, styles.root, className)} role="application" ref={forwardedRef}>
        <div
          {...nativeProps}
          className={css(
            'ms-DatePicker-picker ms-DatePicker-picker--opened ms-DatePicker-picker--focused',
            styles.picker,
            styles.pickerIsOpened,
            styles.pickerIsFocused,
            isMonthPickerVisible && 'ms-DatePicker-monthPickerVisible ' + styles.monthPickerVisible,
            isMonthPickerVisible && isDayPickerVisible && 'ms-DatePicker-calendarsInline ' + styles.calendarsInline,
            monthPickerOnly && 'ms-DatePicker-monthPickerOnly ' + styles.monthPickerOnly,
            showMonthPickerAsOverlay && 'ms-DatePicker-monthPickerAsOverlay ' + styles.monthPickerAsOverlay,
          )}
        >
          <div
            className={css(
              'ms-DatePicker-holder ms-slideDownIn10',
              styles.holder,
              overlayedWithButton && styles.holderWithButton,
            )}
            onKeyDown={_onDatePickerPopupKeyDown}
          >
            <div className={css('ms-DatePicker-frame', styles.frame)}>
              <div className={css('ms-DatePicker-wrap', styles.wrap, showGoToToday && styles.goTodaySpacing)}>
                {isDayPickerVisible && (
                  <CalendarDay
                    selectedDate={selectedDate!}
                    navigatedDate={navigatedDayDate!}
                    today={props.today}
                    onSelectDate={_onSelectDate}
                    onNavigateDate={_onNavigateDayDate}
                    onDismiss={props.onDismiss}
                    firstDayOfWeek={firstDayOfWeek!}
                    dateRangeType={dateRangeType!}
                    autoNavigateOnSelection={autoNavigateOnSelection!}
                    strings={strings!}
                    onHeaderSelect={onHeaderSelect}
                    navigationIcons={navigationIcons!}
                    showWeekNumbers={props.showWeekNumbers}
                    firstWeekOfYear={props.firstWeekOfYear!}
                    dateTimeFormatter={props.dateTimeFormatter!}
                    showSixWeeksByDefault={props.showSixWeeksByDefault}
                    minDate={minDate}
                    maxDate={maxDate}
                    restrictedDates={restrictedDates}
                    workWeekDays={props.workWeekDays}
                    componentRef={_dayPicker}
                    showCloseButton={showCloseButton}
                    allFocusable={allFocusable}
                  />
                )}
                {isDayPickerVisible && isMonthPickerVisible && <div className={styles.divider} />}
                {isMonthPickerVisible && (
                  <CalendarMonth
                    navigatedDate={navigatedMonthDate!}
                    selectedDate={navigatedDayDate!}
                    strings={strings!}
                    onNavigateDate={_onNavigateMonthDate}
                    today={props.today}
                    highlightCurrentMonth={highlightCurrentMonth!}
                    highlightSelectedMonth={highlightSelectedMonth!}
                    onHeaderSelect={onHeaderSelect}
                    navigationIcons={navigationIcons!}
                    dateTimeFormatter={props.dateTimeFormatter!}
                    minDate={minDate}
                    maxDate={maxDate}
                    componentRef={_monthPicker}
                    yearPickerHidden={yearPickerHidden || showMonthPickerAsOverlay}
                  />
                )}

                {showGoToToday && (
                  <button
                    role="button"
                    className={css('ms-DatePicker-goToday js-goToday', styles.goToday, {
                      [styles.goTodayInlineMonth]: isMonthPickerVisible,
                      [styles.goToTodayIsDisabled]: !goTodayEnabled,
                    })}
                    onClick={_onGotoToday}
                    onKeyDown={_onGotoTodayKeyDown}
                    tabIndex={0}
                    disabled={!goTodayEnabled}
                    type="button"
                  >
                    {strings!.goToToday}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <FocusRects />
      </div>
    );
  }),
);
Calendar.displayName = 'Calendar';

function usePickerVisibility(props: ICalendarProps, setFocusOnUpdate: (shouldFocus: boolean) => void) {
  const [isMonthPickerVisible, setIsMonthPickerVisible] = React.useState<boolean>(
    props.showMonthPickerAsOverlay ? false : !!props.isMonthPickerVisible,
  );
  const [isDayPickerVisible, setIsDayPickerVisible] = React.useState<boolean>(
    props.showMonthPickerAsOverlay ? true : !!props.isDayPickerVisible,
  );

  const _onHeaderSelect = React.useCallback((shouldFocus: boolean): void => {
    setIsDayPickerVisible(!isDayPickerVisible);
    setIsMonthPickerVisible(!isMonthPickerVisible);

    setFocusOnUpdate(shouldFocus);
  }, []);

  return [isMonthPickerVisible, isDayPickerVisible, _onHeaderSelect] as const;
}

function useFocusMethod(
  _dayPicker: React.RefObject<ICalendarDay | null>,
  _monthPicker: React.RefObject<ICalendarMonth | null>,
) {
  const _focusOnUpdate = React.useRef<boolean>(false);
  const focus = React.useCallback(() => {
    if (_dayPicker.current) {
      _dayPicker.current.focus();
    } else if (_monthPicker.current) {
      _monthPicker.current.focus();
    }
  }, []);

  React.useEffect(() => {
    if (_focusOnUpdate.current) {
      focus();
      _focusOnUpdate.current = false;
    }
  });

  const setFocusOnUpdate = React.useCallback((shouldFocusOnUpdate: boolean) => {
    _focusOnUpdate.current = shouldFocusOnUpdate;
  }, []);

  return [focus, setFocusOnUpdate] as const;
}

function useNavigationState(props: ICalendarProps, setFocusOnUpdate: (shouldFocus: boolean) => void) {
  const currentDate = props.value && !isNaN(props.value.getTime()) ? props.value : props.today || new Date();
  const [selectedDate, setSelectedDate] = React.useState<Date>(currentDate);
  const [navigatedDayDate, setNavigateDayDate] = React.useState<Date | undefined>(currentDate);
  const [navigatedMonthDate, setNavigatedMonthDate] = React.useState<Date | undefined>(currentDate);
  useAutoNavigation(props, setNavigateDayDate, setNavigatedMonthDate, setSelectedDate);

  const _navigateDayPickerDay = React.useCallback((date: Date): void => {
    setNavigateDayDate(date);
    setNavigatedMonthDate(date);
  }, []);

  const _navigateMonthPickerDay = React.useCallback((date: Date): void => {
    setNavigatedMonthDate(date);
  }, []);

  const _onNavigateDayDate = React.useCallback(
    (date: Date, focusOnNavigatedDay: boolean): void => {
      _navigateDayPickerDay(date);
      setFocusOnUpdate(focusOnNavigatedDay);
    },
    [_navigateDayPickerDay, setFocusOnUpdate],
  );

  const _onNavigateMonthDate = React.useCallback(
    (date: Date, focusOnNavigatedDay: boolean): void => {
      if (!focusOnNavigatedDay) {
        _navigateMonthPickerDay(date);
        setFocusOnUpdate(focusOnNavigatedDay);
        return;
      }

      const monthPickerOnly = !props.showMonthPickerAsOverlay && !props.isDayPickerVisible;

      if (monthPickerOnly) {
        _onSelectDate(date);
      }

      _navigateDayPickerDay(date);
    },
    [_navigateMonthPickerDay, props.showMonthPickerAsOverlay, props.isDayPickerVisible],
  );

  const _onSelectDate = React.useCallback(
    (date: Date, selectedDateRangeArray?: Date[]): void => {
      const { onSelectDate } = props;

      setSelectedDate(date);

      if (onSelectDate) {
        onSelectDate(date, selectedDateRangeArray);
      }
    },
    [props.onSelectDate],
  );

  const _onGotoToday = React.useCallback((): void => {
    const { dateRangeType, firstDayOfWeek, today, workWeekDays, selectDateOnClick } = props;

    if (selectDateOnClick) {
      // When using Defaultprops, TypeScript doesn't know that React is going to inject defaults
      // so we use exclamation mark as a hint to the type checker (see link below)
      // https://decembersoft.com/posts/error-ts2532-optional-react-component-props-in-typescript/
      const dates = getDateRangeArray(today!, dateRangeType!, firstDayOfWeek!, workWeekDays!);
      _onSelectDate(today!, dates);
    }

    _navigateDayPickerDay(today!);
    setFocusOnUpdate(true);
  }, [
    props.dateRangeType,
    props.firstDayOfWeek,
    props.today,
    props.workWeekDays,
    props.selectDateOnClick,
    _onSelectDate,
    _navigateDayPickerDay,
  ]);

  return [
    selectedDate,
    navigatedDayDate,
    navigatedMonthDate,
    _onNavigateDayDate,
    _onNavigateMonthDate,
    _onSelectDate,
    _onGotoToday,
  ] as const;
}

function useAutoNavigation(
  props: ICalendarProps,
  setNavigateDayDate: React.Dispatch<React.SetStateAction<Date | undefined>>,
  setNavigatedMonthDate: React.Dispatch<React.SetStateAction<Date | undefined>>,
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>,
) {
  // Not using `usePrevious` here, as it doesn't update until the component render is flushed,
  // which is too late to prevent an infinite rerender loop.
  const oldProps = React.useRef<ICalendarProps | undefined>(undefined);

  if (oldProps.current && !compareDates(props.value!, oldProps.current.value!)) {
    const { autoNavigateOnSelection, value, today = new Date() } = props;
    // Make sure auto-navigation is supported for programmatic changes to selected date, i.e.,
    // if selected date is updated via props, we may need to modify the navigated date
    if (autoNavigateOnSelection) {
      setNavigateDayDate(value);
      setNavigatedMonthDate(value);
    }
    setSelectedDate(value || today);
  }

  oldProps.current = props;
}
