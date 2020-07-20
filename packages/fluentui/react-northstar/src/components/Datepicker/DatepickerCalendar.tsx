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
  IDayGridOptions,
  IRestrictedDatesOptions,
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
import {
  DatepickerCalendarCellProps,
  datepickerCalendarCellClassName,
  DatepickerCalendarCell,
} from './DatepickerCalendarCell';
import {
  DatepickerCalendarHeaderCellProps,
  DatepickerCalendarHeaderCell,
  datepickerCalendarHeaderCellClassName,
} from './DatepickerCalendarHeaderCell';

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
    showWeekNumbers,
  } = props;

  const localizedStrings = props.localizedStrings || DEFAULT_CALENDAR_LOCALIZED_STRINGS;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(DatepickerCalendar.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: DatepickerCalendar.displayName,
    actionHandlers: {},
    rtl: context.rtl,
  });

  const [gridOptions, setGridOptions] = React.useState<IDayGridOptions>({
    selectedDate: selectedDate || props.today || new Date(),
    navigatedDate: navigatedDate || props.today || new Date(),
    firstDayOfWeek,
    firstWeekOfYear,
    dateRangeType,
  });

  const { classes, styles: resolvedStyles } = useStyles<DatepickerCalendarStylesProps>(DatepickerCalendar.displayName, {
    className: datepickerCalendarClassName,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const grid = React.useMemo(() => {
    const grid = getDayGrid(gridOptions);
    if (!showWeekNumbers) {
      // Slicing because grid contains extra 1 week in the front and in the back.
      return grid.slice(1, grid.length - 1);
    }
    return grid;
  }, [gridOptions, showWeekNumbers]);

  const renderHeader = () => {
    return createShorthand(DatepickerCalendarHeader, header, {
      defaultProps: () => ({
        styles: resolvedStyles.header,
        content: formatMonthYear(gridOptions.navigatedDate, localizedStrings),
      }),
      overrideProps: {
        onPreviousClick,
        onNextClick,
      },
    });
  };

  const onPreviousClick = () => {
    changeMonth(false);
  };
  const onNextClick = () => {
    changeMonth(true);
  };

  const changeMonth = (nextMonth: boolean) => {
    const updatedGridNavigatedDate = addMonths(gridOptions.navigatedDate, nextMonth ? 1 : -1);
    setGridOptions({ ...gridOptions, navigatedDate:  updatedGridNavigatedDate });
  };

  const element = (
    <Ref innerRef={datepickerCalendarRef}>
      {getA11yProps.unstable_wrapWithFocusZone(
        <ElementType
          {...getA11yProps('root', {
            className: classes.root,
            ...unhandledProps,
          })}
        >
          {renderHeader()}
          <Grid rows={grid.length + 1} columns={DAYS_IN_WEEK}>
            {_.times(DAYS_IN_WEEK, dayNumber =>
              createShorthand(DatepickerCalendarHeaderCell, calendarHeaderCell, {
                defaultProps: () =>
                  getA11yProps('calendarHeaderCell', {
                    className: datepickerCalendarHeaderCellClassName,
                    content: localizedStrings.shortDays[(dayNumber + firstDayOfWeek) % DAYS_IN_WEEK],
                    key: `header_${dayNumber}`,
                  }),
              }),
            )}
            {_.map(grid, week =>
              _.map(
                week,
                (day: IDay) =>
                  createShorthand(DatepickerCalendarCell, calendarCell, {
                    defaultProps: () =>
                      getA11yProps('calendarCell', {
                        className: datepickerCalendarCellClassName,
                        content: day.date,
                        key: day.key,
                        'aria-label': formatMonthDayYear(day.originalDate, localizedStrings),
                        onClick: e => {
                          _.invoke(props, 'onDateChange', e, { ...props, value: day });
                        },
                        primary: day.isSelected,
                        disabled: !day.isInMonth,
                      }),
                  }),
              ),
            )}
          </Grid>
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
};

DatepickerCalendar.handledProps = Object.keys(DatepickerCalendar.propTypes) as any;
