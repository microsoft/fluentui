import { Accessibility, datepickerCalendarBehavior, DatepickerCalendarBehaviorProps } from '@fluentui/accessibility';
import {
  addMonths,
  DateRangeType,
  DayOfWeek,
  DAYS_IN_WEEK,
  FirstWeekOfYear,
  formatMonthDayYear,
  formatMonthYear,
  getDayGrid,
  IDateGridStrings,
  IDay,
  IRestrictedDatesOptions,
  findAvailableDate,
  compareDates,
  addDays,
  addWeeks,
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

// TODO: extract to date-time-utilities
export const DEFAULT_CALENDAR_LOCALIZED_STRINGS: IDateGridStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};

// TODO: extract to date-time-utilities
export interface IDateCalendarFormatting {
  /**
   * Format the date according to specified function.
   * Intended use case is localization.
   */
  format?: (date: Date) => string;

  /**
   * Parse date from string representation into Date type.
   */
  parse?: (date: string) => Date;
}

// TODO: extract to date-time-utilities
export interface IDatepickerCalendarOptions extends IRestrictedDatesOptions {
  /**
   * The first day of the week for your locale.
   */
  firstDayOfWeek?: DayOfWeek;

  /**
   * Defines when the first week of the year should start, FirstWeekOfYear.FirstDay,
   * FirstWeekOfYear.FirstFullWeek or FirstWeekOfYear.FirstFourDayWeek are the possible values
   */
  firstWeekOfYear?: FirstWeekOfYear;

  /**
   * The date range type indicating how  many days should be selected as the user
   * selects days
   */
  dateRangeType?: DateRangeType;

  /**
   * The number of days to select while dateRangeType === DateRangeType.Day. Used in order to have multi-day
   * views.
   */
  daysToSelectInDayView?: number;

  /**
   * Value of today. If null, current time in client machine will be used.
   */
  today?: Date;

  /**
   * Whether the calendar should show the week number (weeks 1 to 53) before each week row
   */
  showWeekNumbers?: boolean;

  /**
   * The days that are selectable when `dateRangeType` is WorkWeek.
   * If `dateRangeType` is not WorkWeek this property does nothing.
   */
  workWeekDays?: DayOfWeek[];
}

export interface DatepickerCalendarProps extends IDatepickerCalendarOptions, IDateCalendarFormatting, UIComponentProps {
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

  /** Localized labels */
  localizedStrings?: IDateGridStrings;
}

export type DatepickerCalendarStylesProps = never;

export const datepickerCalendarClassName = 'ui-datepicker__calendar';

const dayInGrid = (grid: IDay[][], findDate: Date) => {
  return _.flatten(grid).some(day => compareDates(day.originalDate, findDate));
};

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
    firstWeekOfYear,
    dateRangeType,
    localizedStrings,
    today,
    onDateChange,
  } = props;

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(DatepickerCalendar.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: DatepickerCalendar.displayName,
    rtl: context.rtl,
  });

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

  // /** Get days grid and slice it in case it contains additional weeks at the beginning and end. */
  // const getSlicedGrid = () => {
  //   const grid = getDayGrid(gridOptions);
  //   if (!weeksToShow) {
  //     // Slicing because grid contains extra 1 week in the front and in the back.
  //     return grid.slice(1, grid.length - 1);
  //   }
  //   return grid;
  // };

  const gridOptions = {
    selectedDate,
    navigatedDate: gridNavigatedDate,
    firstDayOfWeek,
    firstWeekOfYear,
    dateRangeType,
  };

  const grid = getDayGrid(gridOptions); // getSlicedGrid();
  const getInitialFocusDate = () => {
    if (selectedDate) {
      const normalizedSelectedDate = new Date(selectedDate.toString());
      normalizedSelectedDate.setHours(0);
      normalizedSelectedDate.setMinutes(0);
      normalizedSelectedDate.setSeconds(0);
      normalizedSelectedDate.setMilliseconds(0);
      return normalizedSelectedDate;
    }
    const todayDate = _.flatten(grid).find(day => day.isToday);
    return todayDate.originalDate;
  };
  const [focusedDate, setFocusedDate] = React.useState<Date>(getInitialFocusDate());

  const changeMonth = (nextMonth: boolean) => {
    const updatedGridNavigatedDate = addMonths(gridNavigatedDate, nextMonth ? 1 : -1);
    setGridNavigatedDate(updatedGridNavigatedDate);
    setFocusedDate(updatedGridNavigatedDate);
  };

  const itemRefs = React.useMemo<Map<string, React.RefObject<HTMLElement>>>(() => {
    const refs = new Map<string, React.RefObject<HTMLElement>>();
    _.map(grid, week => _.map(week, (day: IDay) => (refs[day.key] = React.createRef())));
    return refs;
  }, [grid]);

  // const handleFocus = (day: IDay, hiddenCell: boolean): void => {
  //   console.log(day, hiddenCell);
  // };

  const handleKeyDown = (e, day) => {
    const keyCode = getCode(e);
    const initialDate = day.originalDate;
    let targetDate: Date | null = null;
    let direction = 1; // by default search forward

    switch (keyCode) {
      case keyboardKey.ArrowDown: {
        targetDate = addWeeks(initialDate, 1);
        break;
      }
      case keyboardKey.ArrowUp: {
        targetDate = addWeeks(initialDate, -1);
        direction = -1;
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
    const newNavigateDate = findAvailableDate({
      initialDate,
      targetDate,
      direction,
    });
    if (!dayInGrid(grid.slice(1, grid.length - 1), newNavigateDate)) {
      setGridNavigatedDate(newNavigateDate);
      setFocusedDate(newNavigateDate);
      e.preventDefault();
    }
  };

  React.useEffect(() => {
    if (focusedDate) {
      const cellToFocus = itemRefs[focusedDate.toString()];
      if (cellToFocus?.current) {
        cellToFocus.current.focus();
      }
    }
  }, [focusedDate, itemRefs]);

  const renderWeekRow = week =>
    _.map(week, (day: IDay) =>
      createShorthand(DatepickerCalendarCell, calendarCell, {
        defaultProps: () =>
          getA11yProps('calendarCell', {
            label: day.date,
            key: day.key,
            'aria-label': formatMonthDayYear(day.originalDate, localizedStrings),
            selected: day.isSelected,
            disabled: !day.isInMonth,
            ref: itemRefs[day.key],
          }),
        overrideProps: (predefinedProps: DatepickerCalendarCellProps): DatepickerCalendarCellProps => ({
          onClick: e => {
            onDateChange(e, { ...predefinedProps, value: day });
            _.invoke(predefinedProps, 'onClick', e, { ...predefinedProps, value: day });
          },
          onFocus: e => {
            _.invoke(predefinedProps, 'onFocus', e, { ...predefinedProps, value: day });
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
      {getA11yProps.unstable_wrapWithFocusZone(
        <ElementType
          {...getA11yProps('root', {
            className: classes.root,
            ...unhandledProps,
          })}
        >
          {createShorthand(DatepickerCalendarHeader, header, {
            defaultProps: () => ({
              label: formatMonthYear(gridNavigatedDate, localizedStrings),
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
                  rows: grid.length - 1,
                  columns: DAYS_IN_WEEK,
                  content: (
                    <>
                      {_.times(DAYS_IN_WEEK, dayNumber =>
                        createShorthand(DatepickerCalendarHeaderCell, calendarHeaderCell, {
                          defaultProps: () =>
                            getA11yProps('calendarHeaderCell', {
                              content: localizedStrings.shortDays[(dayNumber + firstDayOfWeek) % DAYS_IN_WEEK],
                              key: dayNumber,
                            }),
                        }),
                      )}
                      {/* {renderWeekRow(grid[0], true)} */}
                      {_.map(grid.slice(1, grid.length - 1), week => renderWeekRow(week))}
                      {/* {renderWeekRow(grid[grid.length - 1], true)} */}
                    </>
                  ),
                }),
            },
          )}
        </ElementType>,
      )}
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
  localizedStrings: PropTypes.object as PropTypes.Validator<IDateGridStrings>,
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

  format: PropTypes.func,
  parse: PropTypes.func,
};

DatepickerCalendar.defaultProps = {
  accessibility: datepickerCalendarBehavior,
  firstDayOfWeek: DayOfWeek.Monday,
  firstWeekOfYear: FirstWeekOfYear.FirstDay,
  dateRangeType: DateRangeType.Day,
  header: {},
  calendarCell: {},
  calendarHeaderCell: {},
  localizedStrings: DEFAULT_CALENDAR_LOCALIZED_STRINGS,
};

DatepickerCalendar.handledProps = Object.keys(DatepickerCalendar.propTypes) as any;
