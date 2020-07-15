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

export interface DatepickerCalendarProps extends UIComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<DatepickerCalendarBehaviorProps>;

  /**
   * Called on change of the date.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onDateChange?: ComponentEventHandler<DatepickerCalendarProps & { value: IDay }>;

  /** Options to change how the daygrid looks like */
  dayGridOptions?: IDayGridOptions;

  /** Opportunity to override how the dates are formatted. */
  dateFormatting?: IDateFormatting;
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

  const { className, design, styles, variables, dayGridOptions, dateFormatting } = props;

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
                content={
                  dateFormatting.dateGridStrings.shortDays[(dayNumber + dayGridOptions.firstDayOfWeek) % DAYS_IN_WEEK]
                }
              />
            ))}
            {_.map(grid, week =>
              _.map(week, (day: IDay) => {
                return (
                  <Button
                    key={day.key}
                    content={day.date}
                    aria-label={`${dateFormatting.formatMonthDayYear(day.originalDate)}`}
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

  dayGridOptions: PropTypes.object as PropTypes.Validator<IDayGridOptions>,

  dateFormatting: PropTypes.object as PropTypes.Validator<IDateFormatting>,
};

DatepickerCalendar.defaultProps = {
  accessibility: datepickerCalendarBehavior,
  dayGridOptions: {
    firstDayOfWeek: DayOfWeek.Monday,
    firstWeekOfYear: FirstWeekOfYear.FirstDay,
    dateRangeType: DateRangeType.Day,
    selectedDate: new Date(),
    navigatedDate: new Date(),
  },
  dateFormatting: DEFAULT_DATE_FORMATTING,
};

DatepickerCalendar.handledProps = Object.keys(DatepickerCalendar.propTypes) as any;
