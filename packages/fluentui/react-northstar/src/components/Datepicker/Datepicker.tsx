import { Accessibility } from '@fluentui/accessibility';
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
  useAutoControlled,
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
import { Input, InputProps } from '../Input/Input';
import { Popup, PopupProps } from '../Popup/Popup';
import { DatepickerCalendar, DatepickerCalendarProps } from './DatepickerCalendar';
import { DatepickerCalendarCell } from './DatepickerCalendarCell';
import { DatepickerCalendarHeader } from './DatepickerCalendarHeader';
import { DatepickerCalendarHeaderAction } from './DatepickerCalendarHeaderAction';
import { DatepickerCalendarHeaderCell } from './DatepickerCalendarHeaderCell';

export interface DatepickerProps extends UIComponentProps, Partial<ICalendarStrings>, Partial<IDatepickerOptions> {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<never>;

  /** Shorthand for the datepicker calendar. */
  calendar?: ShorthandValue<DatepickerCalendarProps>;

  /** Shorthand for the datepicker popup. */
  popup?: ShorthandValue<PopupProps>;

  /** Shorthand for the date text input. */
  input?: ShorthandValue<InputProps>;

  /** Datepicker shows it is currently unable to be interacted with. */
  disabled?: boolean;

  /** Datepicker shows it is currently unable to be interacted with. */
  required?: boolean;

  /**
   * Called on change of the date.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onDateChange?: ComponentEventHandler<DatepickerProps & { value: Date }>;

  /** Target dates can be also entered through the input field. */
  allowManualInput?: boolean;

  /** Should calendar be initially opened or closed. */
  defaultCalendarOpenState?: boolean;

  /** Controls the calendar's open state. */
  calendarOpenState?: boolean;
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
    Input: typeof Input;
  } = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Datepicker.displayName, context.telemetry);
  setStart();
  const datepickerRef = React.useRef<HTMLElement>();
  const convertBoolToOpenState = (flag: boolean): OpenState => {
    if (flag === undefined || flag === null) {
      return undefined;
    }
    return flag ? OpenState.Open : OpenState.Closed;
  };
  const [openState, setOpenState] = useAutoControlled<OpenState>({
    defaultValue: convertBoolToOpenState(props.defaultCalendarOpenState),
    value: convertBoolToOpenState(props.calendarOpenState),
    initialValue: OpenState.Closed,
  });
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [formattedDate, setFormattedDate] = React.useState<string>('');
  const [error, setError] = React.useState<string>(() =>
    props.required && !selectedDate ? props.isRequiredErrorMessage : '',
  );

  const { calendar, popup, input, className, design, styles, variables, formatMonthDayYear } = props;

  const nonNullSelectedDate = selectedDate ?? props.today ?? new Date();

  const calendarOptions: IDayGridOptions = {
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
  };

  const dateFormatting: ICalendarStrings = {
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

  const valueFormatter = date => (date ? formatMonthDayYear(date, dateFormatting) : '');

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
      setOpenState(OpenState.Closing);
      setError('');
      setFormattedDate(valueFormatter(targetDay.originalDate));

      _.invoke(props, 'onDateChange', e, { ...props, value: targetDay.originalDate });
    },
  });

  const calendarElement = createShorthand(DatepickerCalendar, calendar, {
    defaultProps: () => getA11yProps('calendar', {}),
    overrideProps: overrideDatepickerCalendarProps,
  });

  const openStateToBooleanKnob = (openState: OpenState): boolean => {
    return openState === OpenState.Open;
  };

  const onInputClick = (): void => {
    if (openState === OpenState.Closed) {
      setOpenState(OpenState.Open);
    } else if (openState === OpenState.Open || openState === OpenState.Closing) {
      // Keep popup open in case we can only enter the date through calendar.
      if (props.allowManualInput) {
        setOpenState(OpenState.Closed);
      } else {
        setOpenState(OpenState.Open);
      }
    }
  };

  const onInputChange = (e, target: { value: string }) => {
    const parsedDate = props.parseDate(target.value);

    setFormattedDate(target.value);
    if (parsedDate) {
      if (isRestrictedDate(parsedDate, calendarOptions)) {
        setError(props.isOutOfBoundsErrorMessage);
      } else {
        setError('');
        setSelectedDate(parsedDate);
        _.invoke(props, 'onDateChange', e, { ...props, value: parsedDate });
      }
    } else if (target.value) {
      setError(props.invalidInputErrorMessage);
    } else if (props.required && !selectedDate) {
      setError(props.isRequiredErrorMessage);
    } else {
      setError('');
    }
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
          {createShorthand(Input, input, {
            defaultProps: () => ({
              placeholder: props.inputPlaceholder,
              disabled: props.disabled,
              error: !!error,
              value: formattedDate,
            }),
            overrideProps: (predefinedProps: InputProps): InputProps => ({
              onClick: onInputClick,
              onChange: onInputChange,
            }),
          })}
          {createShorthand(Popup, popup, {
            defaultProps: () => ({
              open: openStateToBooleanKnob(openState) && !props.disabled,
              content: calendarElement,
              trapFocus: {
                disableFirstFocus: true,
              },
              trigger: <Button icon={<CalendarIcon />} title="Open calendar" iconOnly disabled={props.disabled} />,
            }),
            overrideProps: (predefinedProps: PopupProps): PopupProps => ({
              onOpenChange: (e, { open }) => {
                setOpenState(open ? OpenState.Open : OpenState.Closing);
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
  input: customPropTypes.itemShorthand,

  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onDateChange: PropTypes.func,
  placeholder: PropTypes.string,
  allowManualInput: PropTypes.bool,
  defaultCalendarOpenState: PropTypes.bool,
  calendarOpenState: PropTypes.bool,

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

Datepicker.defaultProps = {
  calendar: {},
  popup: {},
  input: {},

  firstDayOfWeek: DayOfWeek.Monday,
  firstWeekOfYear: FirstWeekOfYear.FirstDay,
  dateRangeType: DateRangeType.Day,

  allowManualInput: true,
  required: false,

  ...DEFAULT_CALENDAR_STRINGS,
};

Datepicker.handledProps = Object.keys(Datepicker.propTypes) as any;

Datepicker.create = createShorthandFactory({ Component: Datepicker });

Datepicker.Calendar = DatepickerCalendar;
Datepicker.CalendarHeader = DatepickerCalendarHeader;
Datepicker.CalendarHeaderAction = DatepickerCalendarHeaderAction;
Datepicker.CalendarHeaderCell = DatepickerCalendarHeaderCell;
Datepicker.CalendarCell = DatepickerCalendarCell;
Datepicker.Input = Input;
