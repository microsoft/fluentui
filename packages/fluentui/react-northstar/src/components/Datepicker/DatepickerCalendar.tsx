import { Accessibility, datepickerCalendarBehavior, DatepickerCalendarBehaviorProps } from '@fluentui/accessibility';
import {
  getElementType,
  useAccessibility,
  useStyles,
  useFluentContext,
  useTelemetry,
  useUnhandledProps,
  ComponentWithAs,
} from '@fluentui/react-bindings';
import { Ref } from '@fluentui/react-component-ref';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { FluentComponentStaticProps, ComponentEventHandler } from '../../types';
import { commonPropTypes, UIComponentProps } from '../../utils';
import { Grid } from '../Grid/Grid';
import {
  IDayGridOptions,
  getDayGrid,
  IDay,
  DAYS_IN_WEEK,
  DayOfWeek,
  FirstWeekOfYear,
  DateRangeType,
  IDateFormatting,
  DEFAULT_DATE_FORMATTING,
} from '@fluentui/date-time-utilities';
import { Text } from '../Text/Text';
import { Button } from '../Button/Button';

export interface DatepickerCalendarProps extends UIComponentProps, Partial<IDayGridOptions>, Partial<IDateFormatting> {
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

  const { className, design, styles, variables, formatMonthDayYear, shortDays, firstDayOfWeek } = props;

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(DatepickerCalendar.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: DatepickerCalendar.displayName,
    actionHandlers: {},
    rtl: context.rtl,
  });

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
    selectedDate: props.selectedDate ?? new Date(),
    navigatedDate: props.selectedDate ?? new Date(),
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
  } as IDayGridOptions;

  let grid = getDayGrid(dayGridOptions);
  // Slicing because grid contains extra 1 week in the front and in the back.
  grid = grid.slice(1, grid.length - 1);

  const element = (
    <Ref innerRef={datepickerCalendarRef}>
      {getA11yProps.unstable_wrapWithFocusZone(
        <ElementType
          {...getA11yProps('root', {
            className: classes.root,
            ...unhandledProps,
          })}
        >
          <Grid rows={grid.length + 1} columns={DAYS_IN_WEEK}>
            {_.times(DAYS_IN_WEEK, dayNumber => (
              <Text
                key={`header ${dayNumber}`}
                align="center"
                content={shortDays[(dayNumber + firstDayOfWeek) % DAYS_IN_WEEK]}
              />
            ))}
            {_.map(grid, week =>
              _.map(week, (day: IDay) => {
                return (
                  <Button
                    key={day.key}
                    content={day.date}
                    aria-label={`${formatMonthDayYear(day.originalDate)}`}
                    onClick={e => {
                      _.invoke(props, 'onDateChange', e, { ...props, value: day });
                    }}
                    primary={day.isSelected}
                    disabled={!day.isInMonth}
                    text
                  />
                );
              }),
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
  onDateChange: PropTypes.func,

  selectedDate: PropTypes.instanceOf(Date),
  navigatedDate: PropTypes.instanceOf(Date),
  weeksToShow: PropTypes.number,

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

  formatDay: PropTypes.func,
  formatYear: PropTypes.func,
  formatMonthDayYear: PropTypes.func,
  formatMonthYear: PropTypes.func,

  parseDate: PropTypes.func,

  months: PropTypes.arrayOf(PropTypes.string),
  shortMonths: PropTypes.arrayOf(PropTypes.string),
  days: PropTypes.arrayOf(PropTypes.string),
  shortDays: PropTypes.arrayOf(PropTypes.string),
};

DatepickerCalendar.defaultProps = {
  accessibility: datepickerCalendarBehavior,

  // IDayGridOptions
  firstDayOfWeek: DayOfWeek.Monday,
  firstWeekOfYear: FirstWeekOfYear.FirstDay,
  dateRangeType: DateRangeType.Day,

  ...DEFAULT_DATE_FORMATTING,
};

DatepickerCalendar.handledProps = Object.keys(DatepickerCalendar.propTypes) as any;
