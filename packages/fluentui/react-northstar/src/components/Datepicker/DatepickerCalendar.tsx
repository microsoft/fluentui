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
} from '../../utils/date-time-utilities';
import {
  ForwardRefWithAs,
  getElementType,
  useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
  useUnhandledProps,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ComponentEventHandler, FluentComponentStaticProps, ShorthandValue } from '../../types';
import { commonPropTypes, createShorthand, UIComponentProps } from '../../utils';
import { DatepickerCalendarGrid, DatepickerCalendarGridProps } from './DatepickerCalendarGrid';
import { DatepickerCalendarGridRow, DatepickerCalendarGridRowProps } from './DatepickerCalendarGridRow';
import { DatepickerCalendarHeader, DatepickerCalendarHeaderProps } from './DatepickerCalendarHeader';
import { DatepickerCalendarCellProps, DatepickerCalendarCell } from './DatepickerCalendarCell';
import { DatepickerCalendarCellButtonProps, DatepickerCalendarCellButton } from './DatepickerCalendarCellButton';
import { DatepickerCalendarHeaderCellProps, DatepickerCalendarHeaderCell } from './DatepickerCalendarHeaderCell';
import { navigateToNewDate, contstraintNavigatedDate } from './navigateToNewDate';

export interface DatepickerCalendarProps extends UIComponentProps, Partial<ICalendarStrings>, Partial<IDayGridOptions> {
  /** Calendar can have header. */
  header?: ShorthandValue<DatepickerCalendarHeaderProps>;

  /** A render function to customize how cells are rendered in the Calendar. */
  calendarCell?: ShorthandValue<DatepickerCalendarCellProps>;

  /** A render function to customize how cell's buttons are rendered in the Calendar. */
  calendarCellButton?: ShorthandValue<DatepickerCalendarCellButtonProps>;

  /** A render function to customize how header cells are rendered in the Calendar. */
  calendarHeaderCell?: ShorthandValue<DatepickerCalendarHeaderCellProps>;

  /** A render function to customize how the calendar grid is rendered. */
  calendarGrid?: ShorthandValue<DatepickerCalendarGridProps>;

  /** A render function to customize how the calendar grid row is rendered. */
  calendarGridRow?: ShorthandValue<DatepickerCalendarGridRowProps>;

  /**
   * The currently selected date range, currently only supports week.
   */
  selectedDateRange?: Date[];

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

const normalizeDateInGrid = (date: Date): Date => {
  const result = new Date(date.getTime());
  result.setDate(1);
  return result;
};

/**
 * A DatepickerCalendar is used to display dates in sematically grouped way.
 */
export const DatepickerCalendar = React.forwardRef<HTMLDivElement, DatepickerCalendarProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(DatepickerCalendar.displayName, context.telemetry);
  setStart();

  const {
    className,
    design,
    styles,
    variables,
    calendarHeaderCell,
    calendarCell,
    calendarCellButton,
    calendarGrid,
    calendarGridRow,
    dateRangeType,
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

  const updateNavigatedDate = (date: Date) => {
    if (!!date) {
      if (!shouldFocusInDayGrid) {
        setShouldFocusInDayGrid(true);
      }
      setGridNavigatedDate(date);
    }
  };
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: DatepickerCalendar.displayName,
    actionHandlers: {
      addWeek: e => {
        e.preventDefault();
        const newNavigatedDate = navigateToNewDate(gridNavigatedDate, 'Week', 1, restrictedDatesOptions, true);
        updateNavigatedDate(newNavigatedDate);
      },
      subtractWeek: e => {
        e.preventDefault();
        const newNavigatedDate = navigateToNewDate(gridNavigatedDate, 'Week', -1, restrictedDatesOptions, true);
        updateNavigatedDate(newNavigatedDate);
      },
      addDay: e => {
        e.preventDefault();
        const newNavigatedDate = navigateToNewDate(gridNavigatedDate, 'Day', 1, restrictedDatesOptions, true);
        updateNavigatedDate(newNavigatedDate);
      },
      subtractDay: e => {
        e.preventDefault();
        const newNavigatedDate = navigateToNewDate(gridNavigatedDate, 'Day', -1, restrictedDatesOptions, true);
        updateNavigatedDate(newNavigatedDate);
      },
      moveToStartOfWeek: e => {
        e.preventDefault();
        const targetDate = getStartDateOfWeek(gridNavigatedDate, firstDayOfWeek);
        const newNavigatedDate = contstraintNavigatedDate(
          gridNavigatedDate,
          targetDate,
          -1,
          restrictedDatesOptions,
          true,
        );

        updateNavigatedDate(newNavigatedDate);
      },
      moveToEndOfWeek: e => {
        e.preventDefault();
        const targetDate = getEndDateOfWeek(gridNavigatedDate, firstDayOfWeek);
        const newNavigatedDate = contstraintNavigatedDate(
          gridNavigatedDate,
          targetDate,
          -1,
          restrictedDatesOptions,
          true,
        );

        updateNavigatedDate(newNavigatedDate);
      },
      moveToStartOfColumn: e => {
        e.preventDefault();
        const targetDayOfWeek = gridNavigatedDate.getDay();
        const targetDate = _.find(visibleGrid[0], day => day.originalDate.getDay() === targetDayOfWeek)?.originalDate;

        const newNavigatedDate = contstraintNavigatedDate(
          gridNavigatedDate,
          targetDate,
          -1,
          restrictedDatesOptions,
          true,
        );

        updateNavigatedDate(newNavigatedDate);
      },
      moveToEndOfColumn: e => {
        e.preventDefault();
        const targetDayOfWeek = gridNavigatedDate.getDay();
        const targetDate = _.find(
          visibleGrid[visibleGrid.length - 1],
          day => day.originalDate.getDay() === targetDayOfWeek,
        )?.originalDate;

        const newNavigatedDate = contstraintNavigatedDate(
          gridNavigatedDate,
          targetDate,
          -1,
          restrictedDatesOptions,
          true,
        );

        updateNavigatedDate(newNavigatedDate);
      },
    },
    rtl: context.rtl,
  });

  const [gridNavigatedDate, setGridNavigatedDate] = React.useState<Date>(
    () => new Date((navigatedDate || today || new Date()).getTime()),
  );
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

  const visibleGrid = React.useMemo<IDay[][]>(() => {
    const dayGridOptions: IDayGridOptions = {
      selectedDate,
      navigatedDate: normalizedGridDate,
      weeksToShow: props.weeksToShow,
      firstDayOfWeek: props.firstDayOfWeek,
      firstWeekOfYear: props.firstWeekOfYear,
      dateRangeType: props.dateRangeType,
      daysToSelectInDayView: props.daysToSelectInDayView,
      today: props.today,
      showWeekNumbers: props.showWeekNumbers,
      workWeekDays: props.workWeekDays,
      minDate: props.minDate,
      maxDate: props.maxDate,
      restrictedDates: props.restrictedDates,
    };
    const grid = getDayGrid(dayGridOptions);
    return grid.slice(1, grid.length - 1); // slicing off first and last weeks, cause we don't use them for transitions
  }, [selectedDate, normalizedGridDate, props]);

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
    const newNavigatedDate = navigateToNewDate(
      normalizedGridDate,
      'Month',
      nextMonth ? 1 : -1,
      restrictedDatesOptions,
      true,
    );
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
  }, [gridNavigatedDate, normalizedGridDate, shouldFocusInDayGrid]);

  const renderCell = (day: IDay, content) =>
    createShorthand(DatepickerCalendarCell, calendarCell, {
      defaultProps: () =>
        getA11yProps('calendarCell', {
          content,
          key: day.key,
          selected: day.isSelected,
          disabled: !day.isInBounds,
          quiet: !day.isInMonth,
          today: compareDates(day.originalDate, props.today ?? new Date()),
        }),
    });

  const renderCellButton = (day: IDay, dateRange: IDay[]) =>
    createShorthand(DatepickerCalendarCellButton, calendarCellButton, {
      defaultProps: () =>
        getA11yProps('calendarCell', {
          content: day.date,
          'aria-label': formatMonthDayYear(day.originalDate, dateFormatting),
          selected: day.isSelected,
          disabled: !day.isInBounds,
          quiet: !day.isInMonth,
          today: compareDates(day.originalDate, props.today ?? new Date()),
        }),
      overrideProps: (
        predefinedProps: DatepickerCalendarCellButtonProps & { ref: React.Ref<HTMLButtonElement> },
      ): DatepickerCalendarCellButtonProps & { ref: React.Ref<HTMLButtonElement> } => ({
        onFocus: e => {
          setGridNavigatedDate(day.originalDate);
          _.invoke(predefinedProps, 'onFocus', e, predefinedProps);
        },
        onClick: e => {
          _.invoke(props, 'onDateChange', e, {
            ...props,
            value: day,
            selectedDateRange: dateRangeType !== DateRangeType.Day ? dateRange : [day],
          });
          _.invoke(predefinedProps, 'onClick', e, predefinedProps);
        },
        ref: compareDates(gridNavigatedDate, day.originalDate) ? focusDateRef : null,
      }),
    });
  const renderWeekRow = (week: IDay[]) => _.map(week, (day: IDay) => renderCell(day, renderCellButton(day, week)));

  const element = (
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        ref,
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
                  {createShorthand(DatepickerCalendarGridRow, calendarGridRow, {
                    defaultProps: () =>
                      getA11yProps('calendarGridRow', {
                        children: _.times(DAYS_IN_WEEK, dayNumber =>
                          createShorthand(DatepickerCalendarHeaderCell, calendarHeaderCell, {
                            defaultProps: () =>
                              getA11yProps('calendarHeaderCell', {
                                'aria-label': days[(dayNumber + firstDayOfWeek) % DAYS_IN_WEEK],
                                content: shortDays[(dayNumber + firstDayOfWeek) % DAYS_IN_WEEK],
                                key: dayNumber,
                              }),
                          }),
                        ),
                      }),
                  })}
                </thead>
                <tbody>
                  {_.map(visibleGrid, week =>
                    createShorthand(DatepickerCalendarGridRow, calendarGridRow, {
                      defaultProps: () =>
                        getA11yProps('calendarGridRow', {
                          children: renderWeekRow(week),
                          isRowSelectionActive: dateRangeType === DateRangeType.Week,
                          key: week[0].key,
                        }),
                    }),
                  )}
                </tbody>
              </>
            ),
          }),
      })}
    </ElementType>
  );
  setEnd();
  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, DatepickerCalendarProps> &
  FluentComponentStaticProps<DatepickerCalendarProps>;

DatepickerCalendar.displayName = 'DatepickerCalendar';

DatepickerCalendar.propTypes = {
  ...commonPropTypes.createCommon(),
  calendarCell: customPropTypes.itemShorthand,
  calendarCellButton: customPropTypes.itemShorthand,
  calendarHeaderCell: customPropTypes.itemShorthand,
  header: customPropTypes.itemShorthand,
  calendarGrid: customPropTypes.itemShorthand,
  calendarGridRow: customPropTypes.itemShorthand,
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
  calendarCellButton: {},
  calendarHeaderCell: {},
  calendarGrid: {},
  calendarGridRow: {},
  ...DEFAULT_CALENDAR_STRINGS,
};

DatepickerCalendar.handledProps = Object.keys(DatepickerCalendar.propTypes) as any;
