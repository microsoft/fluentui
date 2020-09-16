import { Accessibility, datepickerCalendarBehavior, DatepickerCalendarBehaviorProps } from '@fluentui/accessibility';
import {
  DateRangeType,
  DayOfWeek,
  DAYS_IN_WEEK,
  FirstWeekOfYear,
  getDayGrid,
  IDay,
  DEFAULT_CALENDAR_STRINGS,
  ICalendarStrings,
  IDayGridOptions,
  IDateGridStrings,
  IRestrictedDatesOptions,
  compareDates,
  compareDatePart,
  getMonthStart,
  getMonthEnd,
  getStartDateOfWeek,
  getEndDateOfWeek,
} from '@fluentui/date-time-utilities';
import {
  ComponentWithAs,
  getElementType,
  useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
  useUnhandledProps,
} from '@fluentui/react-bindings';
import { Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ComponentEventHandler, FluentComponentStaticProps, ShorthandValue } from '../../types';
import { commonPropTypes, createShorthand, UIComponentProps } from '../../utils';
import { DatepickerCalendarGrid, DatepickerCalendarGridProps } from './DatepickerCalendarGrid';
import { DatepickerCalendarHeader, DatepickerCalendarHeaderProps } from './DatepickerCalendarHeader';
import { DatepickerCalendarCellProps, DatepickerCalendarCell } from './DatepickerCalendarCell';
import { DatepickerCalendarHeaderCellProps, DatepickerCalendarHeaderCell } from './DatepickerCalendarHeaderCell';
import { navigateToNewDate, contstraintNavigatedDate } from './navigateToNewDate';
import { format } from '@uifabric/utilities';

export interface DatepickerCalendarProps extends UIComponentProps, Partial<ICalendarStrings>, Partial<IDayGridOptions> {
  /** Calendar can have header. */
  header?: ShorthandValue<DatepickerCalendarHeaderProps>;

  /** A render function to customize how cells are rendered in the Calendar. */
  calendarCell?: ShorthandValue<DatepickerCalendarCellProps>;

  /** A render function to customize how header cells are rendered in the Calendar. */
  calendarHeaderCell?: ShorthandValue<DatepickerCalendarHeaderCellProps>;

  /** A render function to customize how the calendar grid is rendered. */
  calendarGrid?: ShorthandValue<DatepickerCalendarGridProps>;

  /**
   * The currently selected date.
   */
  selectedDate?: Date;
  /**
   * The currently navigated date.
   */
  navigatedDate?: Date;

  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<DatepickerCalendarBehaviorProps>;

  /**
   * Called on change of the date.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onDateChange?: ComponentEventHandler<DatepickerCalendarProps & { value: IDay }>;
}

export type DatepickerCalendarStylesProps = never;

export const datepickerCalendarClassName = 'ui-datepicker__calendar';

/**
 * A DatepickerCalendar is used to display dates in sematically grouped way.
 */
export const DatepickerCalendar: ComponentWithAs<'div', DatepickerCalendarProps> &
  FluentComponentStaticProps<DatepickerCalendarProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(DatepickerCalendar.displayName, context.telemetry);
  setStart();
  const datepickerCalendarRef = React.useRef<HTMLElement>();

  const {
    className,
    design,
    styles,
    variables,
    calendarHeaderCell,
    calendarCell,
    calendarGrid,
    header,
    selectedDate,
    navigatedDate,
    firstDayOfWeek,
    today,
    formatMonthDayYear,
    formatMonthYear,
    shortDays,
    days,
    minDate,
    maxDate,
    restrictedDates,
  } = props;

  const restrictedDatesOptions: IRestrictedDatesOptions = {
    minDate,
    maxDate,
    restrictedDates,
  };
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(DatepickerCalendar.handledProps, props);

  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: DatepickerCalendar.displayName,
    actionHandlers: {
      addWeek: e => {
        e.preventDefault();
        const newNavigatedDate = navigateToNewDate(gridNavigatedDate, 'Week', 1, restrictedDatesOptions);

        if (!!newNavigatedDate) {
          setShouldFocusInDayGrid(true);
          setGridNavigatedDate(newNavigatedDate);
        }
      },
      subtractWeek: e => {
        e.preventDefault();
        const newNavigatedDate = navigateToNewDate(gridNavigatedDate, 'Week', -1, restrictedDatesOptions);

        if (!!newNavigatedDate) {
          setShouldFocusInDayGrid(true);
          setGridNavigatedDate(newNavigatedDate);
        }
      },
      addDay: e => {
        e.preventDefault();
        const newNavigatedDate = navigateToNewDate(gridNavigatedDate, 'Day', 1, restrictedDatesOptions);

        if (!!newNavigatedDate) {
          setShouldFocusInDayGrid(true);
          setGridNavigatedDate(newNavigatedDate);
        }
      },
      subtractDay: e => {
        e.preventDefault();
        const newNavigatedDate = navigateToNewDate(gridNavigatedDate, 'Day', -1, restrictedDatesOptions);

        if (!!newNavigatedDate) {
          setShouldFocusInDayGrid(true);
          setGridNavigatedDate(newNavigatedDate);
        }
      },
      moveToStartOfWeek: e => {
        e.preventDefault();
        const targetDate = getStartDateOfWeek(gridNavigatedDate, firstDayOfWeek);
        const newNavigatedDate = contstraintNavigatedDate(gridNavigatedDate, targetDate, -1, restrictedDatesOptions);

        if (!!newNavigatedDate) {
          setShouldFocusInDayGrid(true);
          setGridNavigatedDate(newNavigatedDate);
        }
      },
      moveToEndOfWeek: e => {
        e.preventDefault();
        const targetDate = getEndDateOfWeek(gridNavigatedDate, firstDayOfWeek);
        const newNavigatedDate = contstraintNavigatedDate(gridNavigatedDate, targetDate, -1, restrictedDatesOptions);

        if (!!newNavigatedDate) {
          setShouldFocusInDayGrid(true);
          setGridNavigatedDate(newNavigatedDate);
        }
      },
      moveToStartOfColumn: e => {
        e.preventDefault();
        const targetDayOfWeek = gridNavigatedDate.getDay();
        const targetDate = _.find(visibleGrid[0], day => day.originalDate.getDay() === targetDayOfWeek)?.originalDate;

        const newNavigatedDate = contstraintNavigatedDate(gridNavigatedDate, targetDate, -1, restrictedDatesOptions);

        if (!!newNavigatedDate) {
          setShouldFocusInDayGrid(true);
          setGridNavigatedDate(newNavigatedDate);
        }
      },
      moveToEndOfColumn: e => {
        e.preventDefault();
        const targetDayOfWeek = gridNavigatedDate.getDay();
        const targetDate = _.find(
          visibleGrid[visibleGrid.length - 1],
          day => day.originalDate.getDay() === targetDayOfWeek,
        )?.originalDate;

        const newNavigatedDate = contstraintNavigatedDate(gridNavigatedDate, targetDate, -1, restrictedDatesOptions);

        if (!!newNavigatedDate) {
          setShouldFocusInDayGrid(true);
          setGridNavigatedDate(newNavigatedDate);
        }
      },
    },
    rtl: context.rtl,
  });

  const [gridNavigatedDate, setGridNavigatedDate] = React.useState<Date>(
    () => new Date((navigatedDate || today || new Date()).getTime()),
  );

  const normalizeDateInGrid = (date: Date): Date => {
    const result = new Date(date.getTime());
    result.setDate(1);
    return result;
  };

  const getRidOfSecondsMinutesHours = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const [normalizedGridDate, setNormalizedGridDate] = React.useState<Date>(() =>
    normalizeDateInGrid(gridNavigatedDate),
  );

  const [shouldFocusInDayGrid, setShouldFocusInDayGrid] = React.useState<boolean>(true);

  const { classes } = useStyles<DatepickerCalendarStylesProps>(DatepickerCalendar.displayName, {
    className: datepickerCalendarClassName,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const dayGridOptions = {
    selectedDate: getRidOfSecondsMinutesHours(selectedDate || today || new Date()),
    navigatedDate: normalizedGridDate,
    weeksToShow: props.weeksToShow,
    firstDayOfWeek: props.firstDayOfWeek,
    firstWeekOfYear: props.firstWeekOfYear,
    dateRangeType: props.dateRangeType,
    daysToSelectInDayView: props.daysToSelectInDayView,
    today: props.today,
    showWeekNumbers: props.showWeekNumbers,
    workWeekDays: props.workWeekDays,
    ...restrictedDatesOptions,
  };

  const visibleGrid = React.useMemo<IDay[][]>(() => {
    const grid = getDayGrid(dayGridOptions);
    return grid.slice(1, grid.length - 1); // slicing off first and last weeks, cause we don't use them for transitions
  }, [dayGridOptions]);

  React.useEffect(() => {
    const newNormalizedDate = normalizeDateInGrid(gridNavigatedDate);

    if (compareDatePart(newNormalizedDate, normalizedGridDate)) {
      // Do not change the grid immediately the month changes but only once the date stops being visible.
      const gridContainsNavigatedDate = visibleGrid.find(week =>
        week.find(day => compareDatePart(day.originalDate, gridNavigatedDate) === 0),
      );
      if (!gridContainsNavigatedDate) {
        setNormalizedGridDate(newNormalizedDate);
      }
    }
  }, [gridNavigatedDate, visibleGrid, normalizedGridDate]);

  const dateFormatting: IDateGridStrings = {
    months: props.months,
    shortMonths: props.shortMonths,
    days: props.days,
    shortDays: props.shortDays,
  };

  const focusDateRef = React.useRef(null);

  const changeMonth = (nextMonth: boolean) => {
    const newNavigatedDate = navigateToNewDate(normalizedGridDate, 'Month', nextMonth ? 1 : -1, restrictedDatesOptions);
    if (!!newNavigatedDate) {
      setGridNavigatedDate(newNavigatedDate);
      setShouldFocusInDayGrid(false);
      setNormalizedGridDate(normalizeDateInGrid(newNavigatedDate));
    }
  };

  const prevMonthOutOfBounds = minDate ? compareDatePart(minDate, getMonthStart(normalizedGridDate)) >= 0 : false;
  const nextMonthOutOfBounds = maxDate ? compareDatePart(getMonthEnd(normalizedGridDate), maxDate) >= 0 : false;
  React.useEffect(() => {
    if (shouldFocusInDayGrid) {
      focusDateRef.current?.focus();
    }
  }, [visibleGrid, shouldFocusInDayGrid]);

  const renderWeekRow = (week: IDay[], idx) => (
    <tr key={idx + 1}>
      {_.map(week, (day: IDay) =>
        createShorthand(DatepickerCalendarCell, calendarCell, {
          defaultProps: () =>
            getA11yProps('calendarCell', {
              content: day.date,
              key: day.key,
              'aria-label': format(
                props.calendarCellFormatString,
                formatMonthDayYear(day.originalDate, dateFormatting),
                days[day.originalDate.getDay()],
              ),
              selected: day.isSelected,
              disabled: !day.isInBounds,
              quiet: !day.isInMonth,
              today: compareDates(day.originalDate, props.today ?? new Date()),
              ref: compareDates(gridNavigatedDate, day.originalDate) ? focusDateRef : null,
              onFocus: () => setGridNavigatedDate(day.originalDate),
            }),
          overrideProps: (predefinedProps: DatepickerCalendarCellProps): DatepickerCalendarCellProps => ({
            onClick: e => {
              _.invoke(props, 'onDateChange', e, { ...props, value: day });
              _.invoke(predefinedProps, 'onClick', e, { ...predefinedProps, value: day });
            },
          }),
        }),
      )}
    </tr>
  );

  const element = (
    <Ref innerRef={datepickerCalendarRef}>
      <ElementType
        {...getA11yProps('root', {
          className: classes.root,
          ...unhandledProps,
        })}
      >
        {createShorthand(DatepickerCalendarHeader, header, {
          defaultProps: () => ({
            label: formatMonthYear(normalizedGridDate, dateFormatting),
            'aria-label': formatMonthYear(normalizedGridDate, dateFormatting),
            disabledNextButton: nextMonthOutOfBounds,
            disabledPreviousButton: prevMonthOutOfBounds,
            prevMonthAriaLabel: props.prevMonthAriaLabel,
            nextMonthAriaLabel: props.nextMonthAriaLabel,
          }),
          overrideProps: (predefinedProps: DatepickerCalendarHeaderProps): DatepickerCalendarHeaderProps => ({
            onPreviousClick: (e, data) => {
              changeMonth(false);
              _.invoke(predefinedProps, 'onPreviousClick', e, data);
            },
            onNextClick: (e, data) => {
              changeMonth(true);
              _.invoke(predefinedProps, 'onNextClick', e, data);
            },
          }),
        })}
        {createShorthand(DatepickerCalendarGrid, calendarGrid, {
          defaultProps: () =>
            getA11yProps('calendarGrid', {
              content: (
                <>
                  <thead>
                    <tr key={0}>
                      {_.times(DAYS_IN_WEEK, dayNumber =>
                        createShorthand(DatepickerCalendarHeaderCell, calendarHeaderCell, {
                          defaultProps: () =>
                            getA11yProps('calendarHeaderCell', {
                              'aria-label': days[(dayNumber + firstDayOfWeek) % DAYS_IN_WEEK],
                              content: shortDays[(dayNumber + firstDayOfWeek) % DAYS_IN_WEEK],
                              key: dayNumber,
                            }),
                        }),
                      )}
                    </tr>
                  </thead>
                  <tbody>{_.map(visibleGrid, (week, idx) => renderWeekRow(week, idx))}</tbody>
                </>
              ),
            }),
        })}
      </ElementType>
    </Ref>
  );
  setEnd();
  return element;
};

DatepickerCalendar.displayName = 'DatepickerCalendar';

DatepickerCalendar.propTypes = {
  ...commonPropTypes.createCommon(),
  calendarCell: customPropTypes.itemShorthand,
  calendarHeaderCell: customPropTypes.itemShorthand,
  header: customPropTypes.itemShorthand,
  calendarGrid: customPropTypes.itemShorthand,
  onDateChange: PropTypes.func,
  selectedDate: PropTypes.instanceOf(Date),
  navigatedDate: PropTypes.instanceOf(Date),

  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  restrictedDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),

  firstDayOfWeek: PropTypes.oneOf(Object.keys(DayOfWeek).map(name => DayOfWeek[name])),
  firstWeekOfYear: PropTypes.oneOf(Object.keys(FirstWeekOfYear).map(name => FirstWeekOfYear[name])),
  dateRangeType: PropTypes.oneOf(Object.keys(DateRangeType).map(name => DateRangeType[name])),
  daysToSelectInDayView: PropTypes.number,
  today: PropTypes.instanceOf(Date),
  showWeekNumbers: PropTypes.bool,
  workWeekDays: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(DayOfWeek).map(name => DayOfWeek[name]))),
  weeksToShow: PropTypes.number,

  formatDay: PropTypes.func,
  formatYear: PropTypes.func,
  formatMonthDayYear: PropTypes.func,
  formatMonthYear: PropTypes.func,

  parseDate: PropTypes.func,

  months: PropTypes.arrayOf(PropTypes.string),
  shortMonths: PropTypes.arrayOf(PropTypes.string),
  days: PropTypes.arrayOf(PropTypes.string),
  shortDays: PropTypes.arrayOf(PropTypes.string),

  isRequiredErrorMessage: PropTypes.string,
  invalidInputErrorMessage: PropTypes.string,
  isOutOfBoundsErrorMessage: PropTypes.string,
  goToToday: PropTypes.string,
  openCalendarTitle: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  prevMonthAriaLabel: PropTypes.string,
  nextMonthAriaLabel: PropTypes.string,
  prevYearAriaLabel: PropTypes.string,
  nextYearAriaLabel: PropTypes.string,
  prevYearRangeAriaLabel: PropTypes.string,
  nextYearRangeAriaLabel: PropTypes.string,
  monthPickerHeaderAriaLabel: PropTypes.string,
  yearPickerHeaderAriaLabel: PropTypes.string,
  closeButtonAriaLabel: PropTypes.string,
  weekNumberFormatString: PropTypes.string,
  selectedDateFormatString: PropTypes.string,
  todayDateFormatString: PropTypes.string,
  calendarCellFormatString: PropTypes.string,

  inputAriaLabel: PropTypes.string,
  inputBoundedFormatString: PropTypes.string,
  inputMinBoundedFormatString: PropTypes.string,
  inputMaxBoundedFormatString: PropTypes.string,
};

DatepickerCalendar.defaultProps = {
  accessibility: datepickerCalendarBehavior,
  firstDayOfWeek: DayOfWeek.Monday,
  firstWeekOfYear: FirstWeekOfYear.FirstDay,
  dateRangeType: DateRangeType.Day,
  header: {},
  calendarCell: {},
  calendarHeaderCell: {},
  calendarGrid: {},
  ...DEFAULT_CALENDAR_STRINGS,
};

DatepickerCalendar.handledProps = Object.keys(DatepickerCalendar.propTypes) as any;
