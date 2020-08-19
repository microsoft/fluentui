import { Accessibility } from '@fluentui/accessibility';
import {
  DateRangeType,
  DayOfWeek,
  FirstWeekOfYear,
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
import { validateDate } from './validateDate';

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

  /**
   * Called on error when changing the date.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onDateChangeError?: ComponentEventHandler<DatepickerProps & { error: string }>;

  /** Text placeholder for the input field. */
  placeholder?: string;

  /** Target dates can be also entered through the input field. */
  allowManualInput?: boolean;

  /** The component automatically overrides faulty manual input upon blur. */
  autoCorrectManualInput?: boolean;

  /** Should calendar be initially opened or closed. */
  defaultCalendarOpenState?: boolean;

  /** Controls the calendar's open state. */
  calendarOpenState?: boolean;
}

export type DatepickerStylesProps = Pick<DatepickerProps, 'allowManualInput'>;

export const datepickerClassName = 'ui-datepicker';

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

  const [openState, setOpenState] = useAutoControlled<boolean>({
    defaultValue: props.defaultCalendarOpenState,
    value: props.calendarOpenState,
    initialValue: false,
  });

  const [preventClosing, setPreventClosing] = React.useState<boolean>();
  const [preventOpeningOnClick, setPreventOpeningOnClick] = React.useState<boolean>();

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [formattedDate, setFormattedDate] = React.useState<string>('');
  const [error, setError] = React.useState<string>(() =>
    props.required && !selectedDate ? props.isRequiredErrorMessage : '',
  );

  const { calendar, popup, input, className, design, styles, variables, formatMonthDayYear, allowManualInput } = props;

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
    mapPropsToStyles: () => ({
      allowManualInput,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const overrideDatepickerCalendarProps = (predefinedProps: DatepickerCalendarProps): DatepickerCalendarProps => ({
    onDateChange: (e, itemProps) => {
      const targetDay = itemProps.value;
      setSelectedDate(targetDay.originalDate);
      setOpenState(false);
      setError('');
      setFormattedDate(valueFormatter(targetDay.originalDate));

      _.invoke(predefinedProps, 'onDateChange', e, { itemProps, value: targetDay.originalDate });
    },
  });

  const calendarElement = createShorthand(DatepickerCalendar, calendar, {
    defaultProps: () => getA11yProps('calendar', { ...calendarOptions, ...dateFormatting }),
    overrideProps: overrideDatepickerCalendarProps,
  });

  const overrideInputProps = (predefinedProps: InputProps): InputProps => ({
    onClick: (e): void => {
      if (preventOpeningOnClick && !openState) {
        setPreventOpeningOnClick(false);
      } else if (!openState) {
        setOpenState(true);
      } // Keep popup open in case we can only enter the date through calendar.
      else if (props.allowManualInput) {
        setOpenState(false);
      }

      _.invoke(predefinedProps, 'onClick', e, predefinedProps);
    },
    onChange: (e, target: { value: string }) => {
      const parsedDate = props.parseDate(target.value);
      const validationError = validateDate(parsedDate, target.value, calendarOptions, dateFormatting, props.required);
      setError(validationError);
      setFormattedDate(target.value);
      if (!validationError && !!parsedDate) {
        setSelectedDate(parsedDate);
        _.invoke(props, 'onDateChange', e, { ...props, value: parsedDate });
      }

      if (!!validationError) {
        _.invoke(props, 'onDateChangeError', e, { ...props, error: validationError });
      }

      _.invoke(predefinedProps, 'onChange', e, target);
    },
    onFocus: e => {
      if (!props.allowManualInput) {
        setOpenState(true);
        setPreventClosing(true);
        e.preventDefault();
      }

      _.invoke(predefinedProps, 'onFocus', e, predefinedProps);
    },
    onBlur: e => {
      if (props.autoCorrectManualInput && !!error) {
        const futureFormattedDate = valueFormatter(selectedDate);
        const validationError = validateDate(
          selectedDate,
          futureFormattedDate,
          calendarOptions,
          dateFormatting,
          props.required,
        );
        setError(validationError);
        setFormattedDate(futureFormattedDate);
        if (!!validationError) {
          _.invoke(props, 'onDateChangeError', e, { ...props, error: validationError });
        }
      }

      _.invoke(predefinedProps, 'onBlur', e, predefinedProps);
    },
  });

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
              disabled: props.disabled,
              error: !!error,
              value: formattedDate,
              readOnly: !props.allowManualInput,
              required: props.required,
            }),
            overrideProps: overrideInputProps,
          })}
          {createShorthand(Popup, popup, {
            defaultProps: () => ({
              open: openState && !props.disabled,
              content: calendarElement,
              trapFocus: {
                disableFirstFocus: true,
              },
              trigger: <Button icon={<CalendarIcon />} title="Open calendar" iconOnly disabled={props.disabled} />,
            }),
            overrideProps: (predefinedProps: PopupProps): PopupProps => ({
              onOpenChange: (e, { open }) => {
                if (preventClosing) {
                  setPreventClosing(false);

                  if (!open) {
                    return;
                  }
                }
                if (!open) {
                  setPreventOpeningOnClick(true);
                }

                setOpenState(open);
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
  onDateChangeError: PropTypes.func,
  placeholder: PropTypes.string,
  allowManualInput: PropTypes.bool,
  autoCorrectManualInput: PropTypes.bool,
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

  autoCorrectManualInput: true,
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
