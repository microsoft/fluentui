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
    weeksToShow,
    today,
    onDateChange,
    formatMonthDayYear,
    formatMonthYear,
    shortDays,
  } = props;

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(DatepickerCalendar.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: DatepickerCalendar.displayName,
    actionHandlers: {},
    rtl: context.rtl,
  });
  const normalizedSelectedDate = selectedDate || today || new Date();

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

  /** Get days grid and slice it in case it contains additional weeks at the beginning and end. */
  const getSlicedGrid = () => {
    const dayGridOptions = {
      selectedDate: normalizedSelectedDate,
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
    if (!weeksToShow) {
      // Slicing because grid contains extra 1 week in the front and in the back.
      return grid.slice(1, grid.length - 1);
    }
    return grid;
  };

  const grid = getSlicedGrid();

  const changeMonth = (nextMonth: boolean) => {
    const updatedGridNavigatedDate = addMonths(gridNavigatedDate, nextMonth ? 1 : -1);
    setGridNavigatedDate(updatedGridNavigatedDate);
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
          {createShorthand(DatepickerCalendarHeader, header, {
            defaultProps: () => ({
              label: formatMonthYear(gridNavigatedDate),
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
          <Grid rows={grid.length + 1} columns={DAYS_IN_WEEK}>
            {_.times(DAYS_IN_WEEK, dayNumber =>
              createShorthand(DatepickerCalendarHeaderCell, calendarHeaderCell, {
                defaultProps: () =>
                  getA11yProps('calendarHeaderCell', {
                    content: shortDays[(dayNumber + firstDayOfWeek) % DAYS_IN_WEEK],
                    key: dayNumber,
                  }),
              }),
            )}
            {_.map(grid, week =>
              _.map(week, (day: IDay) =>
                createShorthand(DatepickerCalendarCell, calendarCell, {
                  defaultProps: () =>
                    getA11yProps('calendarCell', {
                      content: day.date,
                      key: day.key,
                      'aria-label': formatMonthDayYear(day.originalDate),
                      primary: day.isSelected,
                      disabled: !day.isInMonth,
                    }),
                  overrideProps: (predefinedProps: DatepickerCalendarCellProps): DatepickerCalendarCellProps => ({
                    onClick: e => {
                      onDateChange(e, { ...predefinedProps, value: day });
                      _.invoke(predefinedProps, 'onClick', e, { ...predefinedProps, value: day });
                    },
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
  firstDayOfWeek: DayOfWeek.Sunday,
  firstWeekOfYear: FirstWeekOfYear.FirstDay,
  dateRangeType: DateRangeType.Day,
  header: {},
  calendarCell: {},
  calendarHeaderCell: {},
  ...DEFAULT_CALENDAR_STRINGS,
};

DatepickerCalendar.handledProps = Object.keys(DatepickerCalendar.propTypes) as any;
