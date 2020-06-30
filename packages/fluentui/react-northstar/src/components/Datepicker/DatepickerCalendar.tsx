import { Accessibility, datepickerCalendarBehavior, DatepickerCalendarBehaviorProps } from '@fluentui/accessibility';
import { getElementType, useAccessibility, useStyles, useTelemetry, useUnhandledProps } from '@fluentui/react-bindings';
import { Ref } from '@fluentui/react-component-ref';
// import * as CustomPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';
import { FluentComponentStaticProps, ProviderContextPrepared, WithAsProp, withSafeTypeForAs } from '../../types';
import { commonPropTypes, createShorthandFactory, UIComponentProps } from '../../utils';
import Grid from '../Grid/Grid';
import { IDayGridOptions, getDayGrid, IDay, DAYS_IN_WEEK, IDateGridStrings } from '@fluentui/date-time-utilities';
import Text from '../Text/Text';
import Button from '../Button/Button';

export interface DatepickerCalendarProps extends UIComponentProps, IDayGridOptions {
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
    weeksToShow,
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
    // weeksToShow,
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

  const grid = getDayGrid(gridOptions);
  const element = (
    <Ref innerRef={datepickerCalendarRef}>
      {getA11yProps.unstable_wrapWithFocusZone(
        <ElementType
          {...getA11yProps('root', {
            className: classes.root,
            ...unhandledProps,
          })}
        >
          <Grid rows={weeksToShow + 1} columns={DAYS_IN_WEEK}>
            {_.times(DAYS_IN_WEEK, dayNumber => (
              <Text align="center" content={localizedStrings.shortDays[(dayNumber + firstDayOfWeek) % DAYS_IN_WEEK]} />
            ))}
            {_.map(grid, week =>
              _.map(week, (day: IDay) => {
                const buttonStyles = day.isSelected ? { 'background-color': '#EDEBE9' } : {};
                return (
                  <Button
                    key={day.key}
                    content={day.date}
                    aria-label={`Date ${day.originalDate.toString()}`}
                    onClick={() => {
                      onDaySelect(day);
                    }}
                    styles={buttonStyles}
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
