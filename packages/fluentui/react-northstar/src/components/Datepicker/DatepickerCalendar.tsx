import { Accessibility, datepickerCalendarBehavior, DatepickerCalendarBehaviorProps } from '@fluentui/accessibility';
import {
  addMonths,
  DateRangeType,
  DayOfWeek,
  DAYS_IN_WEEK,
  FirstWeekOfYear,
  getDayGrid,
  IDay,
  DEFAULT_CALENDAR_STRINGS,
  ICalendarStrings,
  IDayGridOptions,
  IAvailableDateOptions,
  findAvailableDate,
  compareDates,
  addDays,
  addWeeks,
  compareDatePart,
  getMonthStart,
  getMonthEnd,
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
import { Grid } from '../Grid/Grid';
import { DatepickerCalendarHeader, DatepickerCalendarHeaderProps } from './DatepickerCalendarHeader';
import { DatepickerCalendarCellProps, DatepickerCalendarCell } from './DatepickerCalendarCell';
import { DatepickerCalendarHeaderCellProps, DatepickerCalendarHeaderCell } from './DatepickerCalendarHeaderCell';
import { getCode, keyboardKey } from '@fluentui/keyboard-key';

export interface DatepickerCalendarProps extends UIComponentProps, Partial<ICalendarStrings>, Partial<IDayGridOptions> {
  /** Calendar can have header. */
  header?: ShorthandValue<DatepickerCalendarHeaderProps>;

  /** A render function to customize how cells are rendered in the Calendar. */
  calendarCell?: ShorthandValue<DatepickerCalendarCellProps>;

  /** A render function to customize how header cells are rendered in the Calendar. */
  calendarHeaderCell?: ShorthandValue<DatepickerCalendarHeaderCellProps>;

  /**
   * The currently selected date
   */
  selectedDate?: Date;
  /**
   * The currently navigated date
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
    header,
    selectedDate,
    navigatedDate,
    firstDayOfWeek,
    today,
    onDateChange,
    formatMonthDayYear,
    formatMonthYear,
    shortDays,
    days,
    minDate,
    maxDate,
    restrictedDates,
  } = props;

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(DatepickerCalendar.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: DatepickerCalendar.displayName,
    rtl: context.rtl,
  });

  // TODO: make new date instances, so they are less mutable
  const [gridNavigatedDate, setGridNavigatedDate] = React.useState<Date>(navigatedDate || today || new Date());

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
    selectedDate,
    navigatedDate: gridNavigatedDate,
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
  const visibledGrid = grid.slice(1, grid.length - 1); // slicing off first and last weeks, cause we don't use them for transitions

  const dateFormatting = {
    formatDay: props.formatDay,
    formatYear: props.formatYear,
    formatMonthDayYear: props.formatMonthDayYear,
    formatMonthYear: props.formatMonthYear,
    parseDate: props.parseDate,
    months: props.months,
    shortMonths: props.shortMonths,
    days: props.days,
    shortDays: props.shortDays,
    isRequiredErrorMessage: props.isRequiredErrorMessage,
    invalidInputErrorMessage: props.invalidInputErrorMessage,
    isOutOfBoundsErrorMessage: props.isOutOfBoundsErrorMessage,
    goToToday: props.goToToday,
    openCalendarTitle: props.openCalendarTitle,
    prevMonthAriaLabel: props.prevMonthAriaLabel,
    nextMonthAriaLabel: props.nextMonthAriaLabel,
    prevYearAriaLabel: props.prevYearAriaLabel,
    nextYearAriaLabel: props.nextYearAriaLabel,
    prevYearRangeAriaLabel: props.prevYearRangeAriaLabel,
    nextYearRangeAriaLabel: props.nextYearRangeAriaLabel,
    monthPickerHeaderAriaLabel: props.monthPickerHeaderAriaLabel,
    yearPickerHeaderAriaLabel: props.yearPickerHeaderAriaLabel,
    closeButtonAriaLabel: props.closeButtonAriaLabel,
    weekNumberFormatString: props.weekNumberFormatString,
    selectedDateFormatString: props.selectedDateFormatString,
    todayDateFormatString: props.todayDateFormatString,
  };

  const focusDateRef = React.useRef(null);

  const changeMonth = (nextMonth: boolean) => {
    const updatedGridNavigatedDate = addMonths(gridNavigatedDate, nextMonth ? 1 : -1);
    setGridNavigatedDate(updatedGridNavigatedDate);
  };

  const prevMonthOutOfBounds = minDate ? compareDatePart(minDate, getMonthStart(gridNavigatedDate)) >= 0 : false;
  const nextMonthOutOfBounds = maxDate ? compareDatePart(getMonthEnd(gridNavigatedDate), maxDate) >= 0 : false;

  const handleKeyDown = (e, day) => {
    const keyCode = getCode(e);
    const initialDate = day.originalDate;
    let targetDate: Date | null = null;
    const visuallyPleasingWeekJumpNavigation = false;
    let direction = 1; // by default search forward

    switch (keyCode) {
      case keyboardKey.ArrowDown: {
        targetDate = addWeeks(initialDate, 1);
        direction = visuallyPleasingWeekJumpNavigation ? 7 : 1;
        break;
      }
      case keyboardKey.ArrowUp: {
        targetDate = addWeeks(initialDate, -1);
        direction = visuallyPleasingWeekJumpNavigation ? -7 : -1;
        break;
      }
      case keyboardKey.ArrowLeft: {
        direction = -1;
        targetDate = addDays(initialDate, -1);
        break;
      }
      case keyboardKey.ArrowRight: {
        targetDate = addDays(initialDate, 1);
        break;
      }
      default:
        break;
    }

    if (!targetDate) {
      // if we couldn't find a target date at all, do nothing
      return;
    }

    const findAvailableDateOptions: IAvailableDateOptions = {
      initialDate,
      targetDate,
      direction,
      restrictedDates,
      minDate,
      maxDate,
    };

    let newNavigatedDate = findAvailableDate(findAvailableDateOptions);

    if (!newNavigatedDate) {
      // if no dates available in initial direction, try going backwards
      findAvailableDateOptions.direction = -direction;
      newNavigatedDate = findAvailableDate(findAvailableDateOptions);
    }

    if (!newNavigatedDate) {
      e.preventDefault();
    } else {
      setGridNavigatedDate(newNavigatedDate);
      e.preventDefault();
    }
  };

  React.useEffect(() => {
    focusDateRef.current?.focus();
  }, [grid]);

  const renderWeekRow = (week: IDay[]) =>
    _.map(week, (day: IDay) =>
      createShorthand(DatepickerCalendarCell, calendarCell, {
        defaultProps: () =>
          getA11yProps('calendarCell', {
            content: day.date,
            key: day.key,
            'aria-label': formatMonthDayYear(day.originalDate, dateFormatting),
            selected: day.isSelected,
            disabled: !day.isInBounds,
            quiet: !day.isInMonth,
            isToday: compareDates(day.originalDate, today ?? new Date()),
            ref: compareDates(gridNavigatedDate, day.originalDate) ? focusDateRef : null,
          }),
        overrideProps: (predefinedProps: DatepickerCalendarCellProps): DatepickerCalendarCellProps => ({
          onClick: e => {
            onDateChange(e, { ...predefinedProps, value: day });
            _.invoke(predefinedProps, 'onClick', e, { ...predefinedProps, value: day });
          },
          onKeyDown: e => {
            handleKeyDown(e, day);
            _.invoke(predefinedProps, 'onKeyDown', e, { ...predefinedProps, value: day });
          },
        }),
      }),
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
            label: formatMonthYear(gridNavigatedDate, dateFormatting),
            'aria-label': formatMonthYear(gridNavigatedDate, dateFormatting),
            disabledNextButton: nextMonthOutOfBounds,
            disabledPreviousButton: prevMonthOutOfBounds,
            ...dateFormatting,
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
        {createShorthand(
          Grid,
          {},
          {
            defaultProps: () =>
              getA11yProps('calendarGrid', {
                rows: visibledGrid.length + 1, // additional row for header
                columns: DAYS_IN_WEEK,
                content: (
                  <>
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
                    {_.map(visibledGrid, week => renderWeekRow(week))}
                  </>
                ),
              }),
          },
        )}
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
};

DatepickerCalendar.defaultProps = {
  accessibility: datepickerCalendarBehavior,
  firstDayOfWeek: DayOfWeek.Monday,
  firstWeekOfYear: FirstWeekOfYear.FirstDay,
  dateRangeType: DateRangeType.Day,
  header: {},
  calendarCell: {},
  calendarHeaderCell: {},
  ...DEFAULT_CALENDAR_STRINGS,
};

DatepickerCalendar.handledProps = Object.keys(DatepickerCalendar.propTypes) as any;
