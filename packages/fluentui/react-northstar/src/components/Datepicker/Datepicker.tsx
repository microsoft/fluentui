import { Accessibility, datepickerBehavior, DatepickerBehaviorProps } from '@fluentui/accessibility';
import {
  DateRangeType,
  DayOfWeek,
  FirstWeekOfYear,
  isRestrictedDate,
  DEFAULT_CALENDAR_STRINGS,
  IDayGridOptions,
  ICalendarStrings,
  IDatepickerOptions,
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
import { CalendarIcon } from '@fluentui/react-icons-northstar';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ComponentEventHandler, FluentComponentStaticProps, ShorthandValue } from '../../types';
import { commonPropTypes, createShorthand, createShorthandFactory, UIComponentProps } from '../../utils';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Popup, PopupProps } from '../Popup/Popup';
import { DatepickerCalendar, DatepickerCalendarProps } from './DatepickerCalendar';
import { DatepickerCalendarCell } from './DatepickerCalendarCell';
import { DatepickerCalendarHeader } from './DatepickerCalendarHeader';
import { DatepickerCalendarHeaderAction } from './DatepickerCalendarHeaderAction';
import { DatepickerCalendarHeaderCell } from './DatepickerCalendarHeaderCell';

export interface DatepickerProps extends UIComponentProps, Partial<ICalendarStrings>, Partial<IDatepickerOptions> {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<DatepickerBehaviorProps>;

  /** Shorthand for the datepicker calendar. */
  calendar?: ShorthandValue<DatepickerCalendarProps>;

  /** Shorthand for the datepicker popup. */
  popup?: ShorthandValue<PopupProps>;

  /** Datepicker shows it is currently unable to be interacted with. */
  disabled?: boolean;

  /** Datepicker shows it is currently unable to be interacted with. */
  isRequired?: boolean;

  /**
   * Called on change of the date.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onDateChange?: ComponentEventHandler<DatepickerProps & { value: Date }>;

  /** Text placeholder for the input field. */
  placeholder?: string;

  /** Target dates can be also entered through the input field. */
  allowTextInput?: boolean;
}

export type DatepickerStylesProps = never;

export const datepickerClassName = 'ui-datepicker';

enum OpenState {
  Open,
  Closing,
  Closed,
}
/**
 * A Datepicker is used to display dates.
 * This component is currently UNSTABLE!
 */
export const Datepicker: ComponentWithAs<'div', DatepickerProps> &
  FluentComponentStaticProps<DatepickerProps> & {
    Calendar: typeof DatepickerCalendar;
    CalendarHeader: typeof DatepickerCalendarHeader;
    CalendarHeaderAction: typeof DatepickerCalendarHeaderAction;
    CalendarHeaderCell: typeof DatepickerCalendarHeaderCell;
    CalendarCell: typeof DatepickerCalendarCell;
  } = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Datepicker.displayName, context.telemetry);
  setStart();
  const datepickerRef = React.useRef<HTMLElement>();
  const [open, setOpen] = React.useState<OpenState>(OpenState.Closed);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [formattedDate, setFormattedDate] = React.useState<string>('');
  const [error, setError] = React.useState<string>(() =>
    props.isRequired && !selectedDate ? 'A date selection is required' : '',
  );

  const { calendar, popup, className, design, styles, variables, formatMonthDayYear } = props;
  const valueFormatter = date => (date ? formatMonthDayYear(date) : '');

  const nonNullSelectedDate = selectedDate ?? props.today ?? new Date();

  const calendarOptions = {
    selectedDate: nonNullSelectedDate,
    navigatedDate: nonNullSelectedDate,
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

  const dateFormatting = {
    formatDay: props.formatDay,
    formatYear: props.formatYear,
    formatMonthDayYear: props.formatMonthDayYear,
    formatMonthYear: props.formatMonthYear,
    parseDate: props.parseDate,
  };

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Datepicker.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: Datepicker.displayName,
    actionHandlers: {},
    rtl: context.rtl,
  });

  const { classes } = useStyles<DatepickerStylesProps>(Datepicker.displayName, {
    className: datepickerClassName,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const overrideDatepickerCalendarProps = (predefinedProps: DatepickerCalendarProps): DatepickerCalendarProps => ({
    ...calendarOptions,
    ...dateFormatting,
    onDateChange: (e, itemProps) => {
      const targetDay = itemProps.value;
      setSelectedDate(targetDay.originalDate);
      setOpen(OpenState.Closing);
      setError('');
      setFormattedDate(valueFormatter(targetDay.originalDate));

      _.invoke(props, 'onDateChange', e, { ...props, value: targetDay.originalDate });
    },
  });

  const calendarElement = createShorthand(DatepickerCalendar, calendar, {
    defaultProps: () => getA11yProps('calendar', {}),
    overrideProps: overrideDatepickerCalendarProps,
  });

  const openStateToKnob = (openState: OpenState): boolean => {
    return openState === OpenState.Open;
  };

  const element = (
    <Ref innerRef={datepickerRef}>
      {getA11yProps.unstable_wrapWithFocusZone(
        <ElementType
          {...getA11yProps('root', {
            className: classes.root,
            ...unhandledProps,
          })}
        >
          <Input
            disabled={props.disabled}
            error={!!error}
            readOnly={!props.allowTextInput}
            onClick={() => {
              if (open === OpenState.Closed) {
                setOpen(OpenState.Open);
              } else if (open === OpenState.Open || open === OpenState.Closing) {
                // Keep popup open in case we can only enter the date through calendar.
                if (props.allowTextInput) {
                  setOpen(OpenState.Closed);
                } else {
                  setOpen(OpenState.Open);
                }
              }
            }}
            value={formattedDate}
            onChange={(e, { value }) => {
              const parsedDate = props.parseDate(value);

              setFormattedDate(value);
              if (parsedDate) {
                if (isRestrictedDate(parsedDate, calendarOptions)) {
                  setError('The selected date is from the restricted range.');
                } else {
                  setError('');
                  setSelectedDate(parsedDate);
                  _.invoke(props, 'onDateChange', e, { ...props, value: parsedDate });
                }
              } else if (value) {
                setError('Manually entered date is not in correct format.');
              } else if (props.isRequired && !selectedDate) {
                setError('A date selection is required');
              } else {
                setError('');
              }
            }}
          />
          {createShorthand(Popup, popup, {
            defaultProps: () => ({
              open: openStateToKnob(open) && !props.disabled,
              content: calendarElement,
              trapFocus: true,
              trigger: <Button icon={<CalendarIcon />} title="Open calendar" iconOnly />,
            }),
            overrideProps: (predefinedProps: PopupProps): PopupProps => ({
              onOpenChange: (e, { open }) => {
                setOpen(open ? OpenState.Open : OpenState.Closing);
                _.invoke(predefinedProps, 'onOpenChange', e, { open });
              },
            }),
          })}
        </ElementType>,
      )}
    </Ref>
  );
  setEnd();
  return element;
};

Datepicker.displayName = 'Datepicker';

Datepicker.propTypes = {
  ...commonPropTypes.createCommon(),
  calendar: customPropTypes.itemShorthand,
  popup: customPropTypes.itemShorthand,

  disabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  onDateChange: PropTypes.func,
  placeholder: PropTypes.string,
  allowTextInput: PropTypes.bool,

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

Datepicker.defaultProps = {
  accessibility: datepickerBehavior,
  calendar: {},
  popup: {},

  firstDayOfWeek: DayOfWeek.Sunday,
  firstWeekOfYear: FirstWeekOfYear.FirstDay,
  dateRangeType: DateRangeType.Day,

  allowTextInput: true,

  ...DEFAULT_CALENDAR_STRINGS,
};

Datepicker.handledProps = Object.keys(Datepicker.propTypes) as any;

Datepicker.create = createShorthandFactory({ Component: Datepicker });

Datepicker.Calendar = DatepickerCalendar;
Datepicker.CalendarHeader = DatepickerCalendarHeader;
Datepicker.CalendarHeaderAction = DatepickerCalendarHeaderAction;
Datepicker.CalendarHeaderCell = DatepickerCalendarHeaderCell;
Datepicker.CalendarCell = DatepickerCalendarCell;
