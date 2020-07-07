import { Accessibility, datepickerCalendarBehavior, DatepickerCalendarBehaviorProps } from '@fluentui/accessibility';
import { getElementType, useAccessibility, useStyles, useTelemetry, useUnhandledProps } from '@fluentui/react-bindings';
import { Ref } from '@fluentui/react-component-ref';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';
import { FluentComponentStaticProps, ProviderContextPrepared, WithAsProp, withSafeTypeForAs } from '../../types';
import { commonPropTypes, createShorthandFactory, UIComponentProps } from '../../utils';
import Grid from '../Grid/Grid';
import {
  IDayGridOptions,
  getDayGrid,
  IDay,
  DAYS_IN_WEEK,
  IDateGridStrings,
  DayOfWeek,
  FirstWeekOfYear,
  DateRangeType,
  formatMonthDayYear,
} from '@fluentui/date-time-utilities';
import Text from '../Text/Text';
import Button from '../Button/Button';
import { IDatepickerOptions } from './Datepicker';

export interface IDateFormatting {
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

export interface DatepickerCalendarProps extends IDatepickerOptions, IDateFormatting, UIComponentProps {
  /**
   * The currently selected date
   */
  selectedDate: Date;
  /**
   * The currently navigated date
   */
  navigatedDate: Date;
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<DatepickerCalendarBehaviorProps>;
  /** Callback on date cell selection */
  onDaySelect?: (IDay) => void;
  /** Localized labels */
  localizedStrings?: IDateGridStrings;
}

export type DatepickerCalendarStylesProps = never;

export const datepickerCalendarClassName = 'ui-datepickerCalendar';

const DatepickerCalendar: React.FC<WithAsProp<DatepickerCalendarProps>> &
  FluentComponentStaticProps<DatepickerCalendarProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(DatepickerCalendar.displayName, context.telemetry);
  setStart();
  const datepickerCalendarRef = React.useRef<HTMLElement>();
  const {
    className,
    design,
    styles,
    variables,
    selectedDate,
    navigatedDate,
    firstDayOfWeek,
    firstWeekOfYear,
    dateRangeType,
    onDaySelect,
    localizedStrings,
  } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(DatepickerCalendar.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: DatepickerCalendar.displayName,
    actionHandlers: {},
    rtl: context.rtl,
  });
  const gridOptions: IDayGridOptions = {
    selectedDate,
    navigatedDate,
    firstDayOfWeek,
    firstWeekOfYear,
    dateRangeType,
  };

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

  let grid = getDayGrid(gridOptions);
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
                content={localizedStrings.shortDays[(dayNumber + firstDayOfWeek) % DAYS_IN_WEEK]}
              />
            ))}
            {_.map(grid, week =>
              _.map(week, (day: IDay) => {
                return (
                  <Button
                    key={day.key}
                    content={day.date}
                    aria-label={`${formatMonthDayYear(day.originalDate, localizedStrings)}`}
                    onClick={() => {
                      onDaySelect(day);
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
  onDaySelect: PropTypes.func,
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
};

DatepickerCalendar.handledProps = Object.keys(DatepickerCalendar.propTypes) as any;

DatepickerCalendar.create = createShorthandFactory({ Component: DatepickerCalendar });

/**
 * A DatepickerCalendar is used to display dates in sematically grouped way.
 */
export default withSafeTypeForAs<typeof DatepickerCalendar, DatepickerCalendarProps, 'div'>(DatepickerCalendar);
