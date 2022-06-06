import {
  Accessibility,
  datepickerBehavior,
  DatepickerBehaviorProps,
  AccessibilityAttributes,
} from '@fluentui/accessibility';
import {
  DateRangeType,
  DayOfWeek,
  FirstWeekOfYear,
  DEFAULT_CALENDAR_STRINGS,
  IDayGridOptions,
  ICalendarStrings,
  IDatepickerOptions,
  IRestrictedDatesOptions,
} from '../../utils/date-time-utilities';

import {
  getElementType,
  useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
  useUnhandledProps,
  useAutoControlled,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';

import { CalendarIcon } from '@fluentui/react-icons-northstar';
import * as customPropTypes from '@fluentui/react-proptypes';
import { handleRef } from '@fluentui/react-component-ref';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ComponentEventHandler, FluentComponentStaticProps, ShorthandValue } from '../../types';
import { commonPropTypes, createShorthand, createShorthandFactory, UIComponentProps, format } from '../../utils';
import { Button } from '../Button/Button';
import { Input, InputProps } from '../Input/Input';
import { Popup, PopupProps } from '../Popup/Popup';
import { DatepickerCalendar, DatepickerCalendarProps } from './DatepickerCalendar';
import { DatepickerCalendarCell } from './DatepickerCalendarCell';
import { DatepickerCalendarCellButton } from './DatepickerCalendarCellButton';
import { DatepickerCalendarHeader } from './DatepickerCalendarHeader';
import { DatepickerCalendarHeaderAction } from './DatepickerCalendarHeaderAction';
import { DatepickerCalendarHeaderCell } from './DatepickerCalendarHeaderCell';
import { DatepickerCalendarGrid } from './DatepickerCalendarGrid';
import { DatepickerCalendarGridRow } from './DatepickerCalendarGridRow';
import { validateDate } from './validateDate';

export interface DatepickerProps extends UIComponentProps, Partial<ICalendarStrings>, Partial<IDatepickerOptions> {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<DatepickerBehaviorProps>;

  /** Identifies the element (or elements) that labels the current element. Will be passed to `input` with usage accessibibility behavior. */
  'aria-labelledby'?: AccessibilityAttributes['aria-labelledby'];

  /** Indicates the entered value does not conform to the format expected by the application. Will be passed to `input` with usage accessibibility behavior. */
  'aria-invalid'?: AccessibilityAttributes['aria-invalid'];

  /** Shorthand for the datepicker calendar. */
  calendar?: ShorthandValue<DatepickerCalendarProps>;

  /** Shorthand for the datepicker popup. */
  popup?: ShorthandValue<PopupProps>;

  /** Shorthand for the date text input. */
  input?: ShorthandValue<InputProps>;

  /** Datepicker shows it is currently unable to be interacted with. */
  disabled?: boolean;

  /** Date needs to be entered, otherwise datepicker produces an error state. */
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

  /** Target dates can be also entered through the input field. */
  allowManualInput?: boolean;

  /** The component automatically overrides faulty manual input upon blur. */
  fallbackToLastCorrectDateOnBlur?: boolean;

  /** Initial 'calendarOpenState' value. */
  defaultCalendarOpenState?: boolean;

  /** Controls the calendar's open state. */
  calendarOpenState?: boolean;

  /** Initial 'selectedDate' value. */
  defaultSelectedDate?: Date;

  /** Controls the calendar's 'selectedDate'. */
  selectedDate?: Date;

  /** Marks that the datepicker should only render the input field and not the trigger button with an icon. */
  inputOnly?: boolean;

  /** Marks that the datepicker should only render the trigger button with an icon and not the input field. */
  buttonOnly?: boolean;
}

export type DatepickerStylesProps = Pick<DatepickerProps, 'allowManualInput'>;

export const datepickerClassName = 'ui-datepicker';

const formatRestrictedInput = (restrictedOptions: IRestrictedDatesOptions, localizationStrings: ICalendarStrings) => {
  let formattedString = '';
  if (!!restrictedOptions.minDate && !!restrictedOptions.maxDate) {
    formattedString = format(
      localizationStrings.inputBoundedFormatString,
      localizationStrings.formatMonthDayYear(restrictedOptions.minDate, localizationStrings),
      localizationStrings.formatMonthDayYear(restrictedOptions.maxDate, localizationStrings),
    );
  } else if (!!restrictedOptions.minDate) {
    formattedString = format(
      localizationStrings.inputMinBoundedFormatString,
      localizationStrings.formatMonthDayYear(restrictedOptions.minDate, localizationStrings),
    );
  } else if (!!restrictedOptions.maxDate) {
    formattedString = format(
      localizationStrings.inputMaxBoundedFormatString,
      localizationStrings.formatMonthDayYear(restrictedOptions.maxDate, localizationStrings),
    );
  } else {
    formattedString = localizationStrings.inputAriaLabel;
  }

  return formattedString;
};

/**
 * A Datepicker is a control which is used to display dates grid and allow user to select them.
 *
 * @accessibilityIssues
 * [NVDA - Aria-selected is not narrated for the gridcell](https://github.com/nvaccess/nvda/issues/11986)
 */
export const Datepicker = (React.forwardRef<HTMLDivElement, DatepickerProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Datepicker.displayName, context.telemetry);
  setStart();
  const inputRef = React.useRef<HTMLElement>();

  // FIXME: This object is created every render, causing a cascade of useCallback/useEffect re-runs.
  // Needs to be reworked by someone who understands the intent for when various updates ought to happen.
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    inputPlaceholder: props.inputPlaceholder,
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
    inputAriaLabel: props.inputAriaLabel,
    inputBoundedFormatString: props.inputBoundedFormatString,
    inputMinBoundedFormatString: props.inputMinBoundedFormatString,
    inputMaxBoundedFormatString: props.inputMaxBoundedFormatString,
  };

  const {
    calendar,
    popup,
    input,
    className,
    design,
    styles,
    variables,
    formatMonthDayYear,
    allowManualInput,
    'aria-labelledby': ariaLabelledby,
    'aria-invalid': ariaInvalid,
  } = props;

  const valueFormatter = React.useCallback(
    date =>
      date
        ? formatMonthDayYear(date, {
            months: dateFormatting.months,
            shortMonths: dateFormatting.shortMonths,
            days: dateFormatting.days,
            shortDays: dateFormatting.shortDays,
          })
        : '',
    [
      dateFormatting.days,
      dateFormatting.months,
      dateFormatting.shortDays,
      dateFormatting.shortMonths,
      formatMonthDayYear,
    ],
  );

  const [openState, setOpenState] = useAutoControlled<boolean>({
    defaultValue: props.defaultCalendarOpenState,
    value: props.calendarOpenState,
    initialValue: false,
  });

  const [selectedDate, setSelectedDate] = useAutoControlled<Date | undefined>({
    defaultValue: props.defaultSelectedDate,
    value: props.selectedDate,
    initialValue: undefined,
  });

  const [formattedDate, setFormattedDate] = React.useState<string>(valueFormatter(selectedDate));

  React.useEffect(() => {
    setFormattedDate(valueFormatter(selectedDate));
  }, [selectedDate, valueFormatter]);

  const restrictedDatesOptions: IRestrictedDatesOptions = {
    minDate: props.minDate,
    maxDate: props.maxDate,
    restrictedDates: props.restrictedDates,
  };

  const [error, setError] = React.useState<string>(() =>
    !!props.selectedDate || !!props.defaultSelectedDate
      ? validateDate(selectedDate, formattedDate, restrictedDatesOptions, dateFormatting, props.required)
      : '',
  );

  const calendarOptions: IDayGridOptions = {
    selectedDate,
    navigatedDate: !!selectedDate && !error ? selectedDate : props.today ?? new Date(),
    firstDayOfWeek: props.firstDayOfWeek,
    firstWeekOfYear: props.firstWeekOfYear,
    dateRangeType: props.dateRangeType,
    daysToSelectInDayView: props.daysToSelectInDayView,
    today: props.today,
    showWeekNumbers: props.showWeekNumbers,
    workWeekDays: props.workWeekDays,
    ...restrictedDatesOptions,
  };

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Datepicker.handledProps, props);

  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: Datepicker.displayName,
    actionHandlers: {
      open: e => {
        if (allowManualInput) {
          setOpenState(!openState);
        } else {
          // Keep popup open in case we can only enter the date through calendar.
          setOpenState(true);
        }

        e.preventDefault();
      },
    },
    mapPropsToBehavior: () => ({
      'aria-invalid': ariaInvalid,
      'aria-labelledby': ariaLabelledby,
      allowManualInput,
    }),
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

      _.invoke(props, 'onDateChange', e, { itemProps, value: targetDay.originalDate });
    },
  });

  const calendarElement = createShorthand(DatepickerCalendar, calendar, {
    defaultProps: () => getA11yProps('calendar', { ...calendarOptions, ...dateFormatting }),
    overrideProps: overrideDatepickerCalendarProps,
  });

  const overrideInputProps = (predefinedProps: InputProps): InputProps => ({
    onClick: (e): void => {
      if (allowManualInput) {
        setOpenState(!openState);
      } else {
        // Keep popup open in case we can only enter the date through calendar.
        setOpenState(true);
      }

      _.invoke(predefinedProps, 'onClick', e, predefinedProps);
    },
    onChange: (e, target: { value: string }) => {
      const parsedDate = props.parseDate(target.value);
      const validationError = validateDate(parsedDate, target.value, calendarOptions, dateFormatting, props.required);
      setError(validationError);
      setFormattedDate(target.value);
      if (!!validationError) {
        _.invoke(props, 'onDateChangeError', e, { ...props, error: validationError });
      } else {
        setSelectedDate(parsedDate);
        _.invoke(props, 'onDateChange', e, { ...props, value: parsedDate });
      }

      _.invoke(predefinedProps, 'onChange', e, predefinedProps);
    },
    onBlur: e => {
      if (props.fallbackToLastCorrectDateOnBlur && !!error) {
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

    inputRef: (node: HTMLInputElement) => {
      handleRef(predefinedProps.inputRef, node);
      inputRef.current = node;
    },
  });

  const triggerButtonElement = props.inputOnly ? null : (
    <Button icon={<CalendarIcon />} title={props.openCalendarTitle} iconOnly disabled={props.disabled} type="button" />
  );

  const element = getA11yProps.unstable_wrapWithFocusZone(
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        ref,
        ...unhandledProps,
      })}
    >
      {!props.buttonOnly &&
        createShorthand(Input, input, {
          defaultProps: () =>
            getA11yProps('input', {
              placeholder: props.inputPlaceholder,
              disabled: props.disabled,
              error: !!error,
              value: formattedDate,
              readOnly: !allowManualInput,
              required: props.required,
              'aria-label': formatRestrictedInput(restrictedDatesOptions, dateFormatting),
            }),
          overrideProps: overrideInputProps,
        })}
      {createShorthand(Popup, popup, {
        defaultProps: () => ({
          open: openState && !props.disabled,
          trapFocus: {
            disableFirstFocus: true,
          },
          position: 'below' as const,
          align: 'start' as const,
        }),
        overrideProps: (predefinedProps: PopupProps): PopupProps => ({
          trigger: predefinedProps.trigger ?? triggerButtonElement,
          target: props.buttonOnly ? null : inputRef.current,
          content: calendarElement,
          onOpenChange: (e, { open }) => {
            // In case the event is a click on input, we ignore such events as it should be directly handled by input.
            if (!(e.type === 'click' && e.target === inputRef?.current)) {
              setOpenState(open);
              _.invoke(predefinedProps, 'onOpenChange', e, { open });
            }
          },
        }),
      })}
    </ElementType>,
  );
  setEnd();
  return element;
}) as unknown) as ForwardRefWithAs<'div', HTMLDivElement, DatepickerProps> &
  FluentComponentStaticProps<DatepickerProps> & {
    Calendar: typeof DatepickerCalendar;
    CalendarHeader: typeof DatepickerCalendarHeader;
    CalendarHeaderAction: typeof DatepickerCalendarHeaderAction;
    CalendarHeaderCell: typeof DatepickerCalendarHeaderCell;
    CalendarCell: typeof DatepickerCalendarCell;
    CalendarCellButton: typeof DatepickerCalendarCellButton;
    CalendarGrid: typeof DatepickerCalendarGrid;
    CalendarGridRow: typeof DatepickerCalendarGridRow;
    Input: typeof Input;
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
  allowManualInput: PropTypes.bool,
  fallbackToLastCorrectDateOnBlur: PropTypes.bool,
  defaultCalendarOpenState: PropTypes.bool,
  calendarOpenState: PropTypes.bool,

  selectedDate: PropTypes.instanceOf(Date),
  defaultSelectedDate: PropTypes.instanceOf(Date),

  inputOnly: PropTypes.bool,
  buttonOnly: PropTypes.bool,

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
  inputPlaceholder: PropTypes.string,
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

  inputAriaLabel: PropTypes.string,
  inputBoundedFormatString: PropTypes.string,
  inputMinBoundedFormatString: PropTypes.string,
  inputMaxBoundedFormatString: PropTypes.string,

  'aria-labelledby': PropTypes.string,
  'aria-invalid': PropTypes.bool,
};

Datepicker.defaultProps = {
  accessibility: datepickerBehavior,

  inputOnly: false,
  buttonOnly: false,
  calendar: {},
  popup: {},
  input: {},

  firstDayOfWeek: DayOfWeek.Monday,
  firstWeekOfYear: FirstWeekOfYear.FirstDay,
  dateRangeType: DateRangeType.Day,

  fallbackToLastCorrectDateOnBlur: true,
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
Datepicker.CalendarCellButton = DatepickerCalendarCellButton;
Datepicker.CalendarGrid = DatepickerCalendarGrid;
Datepicker.CalendarGridRow = DatepickerCalendarGridRow;
Datepicker.Input = Input;
