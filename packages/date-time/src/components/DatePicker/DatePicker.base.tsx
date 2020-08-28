import * as React from 'react';
import { IDatePickerProps, IDatePickerStrings, IDatePickerStyleProps, IDatePickerStyles } from './DatePicker.types';
import {
  KeyCodes,
  classNamesFunction,
  getNativeProps,
  divProperties,
  css,
  getPropsWithDefaults,
} from '@uifabric/utilities';
import { Calendar, ICalendar, DayOfWeek } from '../../Calendar';
import { FirstWeekOfYear, getDatePartHashValue, compareDatePart } from '@fluentui/date-time-utilities';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { DirectionalHint } from 'office-ui-fabric-react/lib/common/DirectionalHint';
import { TextField, ITextField } from 'office-ui-fabric-react/lib/TextField';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { useId, useAsync, useControllableValue } from '@uifabric/react-hooks';

const getClassNames = classNamesFunction<IDatePickerStyleProps, IDatePickerStyles>();

const DEFAULT_STRINGS: IDatePickerStrings = {
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
  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  prevYearRangeAriaLabel: 'Previous year range',
  nextYearRangeAriaLabel: 'Next year range',
  closeButtonAriaLabel: 'Close date picker',
  weekNumberFormatString: 'Week number {0}',
};

const DEFAULT_PROPS = {
  allowTextInput: false,
  formatDate: (date: Date) => {
    if (date) {
      return date.toDateString();
    }

    return '';
  },
  parseDateFromString: (dateStr: string) => {
    const date = Date.parse(dateStr);
    if (date) {
      return new Date(date);
    }

    return null;
  },
  firstDayOfWeek: DayOfWeek.Sunday,
  initialPickerDate: new Date(),
  isRequired: false,
  isMonthPickerVisible: true,
  showMonthPickerAsOverlay: false,
  strings: DEFAULT_STRINGS,
  highlightCurrentMonth: false,
  highlightSelectedMonth: false,
  borderless: false,
  pickerAriaLabel: 'Calendar',
  showWeekNumbers: false,
  firstWeekOfYear: FirstWeekOfYear.FirstDay,
  showGoToToday: true,
  showCloseButton: false,
  underlined: false,
  allFocusable: false,
} as const;

function useFocusLogic({ disableAutoFocus, allowTextInput }: IDatePickerProps) {
  const textFieldRef = React.useRef<ITextField>(null);
  const preventFocusOpeningPicker = React.useRef(false);

  const focus = () => {
    textFieldRef.current?.focus?.();
  };

  const preventNextFocusOpeningPicker = () => {
    preventFocusOpeningPicker.current = true;
  };

  return [textFieldRef, focus, preventFocusOpeningPicker, preventNextFocusOpeningPicker] as const;
}

function useCalendarVisibility({ allowTextInput, onAfterMenuDismiss }: IDatePickerProps, focus: () => void) {
  const [isCalendarShown, setIsCalendarShown] = React.useState(false);
  const isMounted = React.useRef(false);
  const async = useAsync();

  React.useEffect(() => {
    if (isMounted.current && !isCalendarShown) {
      // In browsers like IE, textfield gets unfocused when datepicker is collapsed
      if (allowTextInput) {
        async.requestAnimationFrame(focus);
      }

      // If DatePicker's menu (Calendar) is closed, run onAfterMenuDismiss
      onAfterMenuDismiss?.();
    }
    isMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCalendarShown]);

  return [isCalendarShown, setIsCalendarShown] as const;
}

function useSelectedDate({ formatDate, value, onSelectDate }: IDatePickerProps) {
  const [selectedDate, setSelectedDateState] = useControllableValue(value, undefined, (ev, newValue) =>
    onSelectDate?.(newValue),
  );
  const [formattedDate, setFormattedDate] = React.useState(() => (value && formatDate ? formatDate(value) : ''));

  const setSelectedDate = (newDate: Date | undefined) => {
    setSelectedDateState(newDate);
    setFormattedDate(newDate && formatDate ? formatDate(newDate) : '');
  };

  React.useEffect(() => {
    setFormattedDate(value && formatDate ? formatDate(value) : '');
  }, [formatDate, value]);

  return [selectedDate, formattedDate, setSelectedDate, setFormattedDate] as const;
}

function useErrorMessage(
  {
    isRequired,
    allowTextInput,
    strings,
    parseDateFromString,
    onSelectDate,
    formatDate,
    minDate,
    maxDate,
  }: IDatePickerProps,
  selectedDate: Date | undefined,
  setSelectedDate: (date: Date | undefined) => void,
  inputValue: string,
  isCalendarShown: boolean,
) {
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();

  const validateTextInput = (date: Date | null = null): void => {
    if (allowTextInput) {
      if (inputValue || date) {
        // Don't parse if the selected date has the same formatted string as what we're about to parse.
        // The formatted string might be ambiguous (ex: "1/2/3" or "New Year Eve") and the parser might
        // not be able to come up with the exact same date.
        if (selectedDate && !errorMessage && formatDate && formatDate(date ?? selectedDate) === inputValue) {
          return;
        }
        date = date || parseDateFromString!(inputValue);

        // Check if date is null, or date is Invalid Date
        if (!date || isNaN(date.getTime())) {
          // Reset invalid input field, if formatting is available
          setSelectedDate(selectedDate);
          setErrorMessage(strings!.invalidInputErrorMessage || ' ');
        } else {
          // Check against optional date boundaries
          if (isDateOutOfBounds(date, minDate, maxDate)) {
            setErrorMessage(strings!.isOutOfBoundsErrorMessage || ' ');
          } else {
            setSelectedDate(date);
            setErrorMessage(undefined);
          }
        }
      } else {
        // Only show error for empty inputValue if it is a required field
        setErrorMessage(isRequired ? strings!.isRequiredErrorMessage || ' ' : undefined);

        // If no input date string or input date string is invalid
        // date variable will be null, callback should expect null value for this case
        onSelectDate?.(date);
      }
    } else if (isRequired && !inputValue) {
      // Check when DatePicker is a required field but has NO input value
      setErrorMessage(strings!.isRequiredErrorMessage || ' ');
    } else {
      // Cleanup the error message
      setErrorMessage(undefined);
    }
  };

  React.useEffect(() => {
    if (isRequired && !selectedDate) {
      setErrorMessage(strings!.isRequiredErrorMessage || ' ');
    } else if (selectedDate && isDateOutOfBounds(selectedDate, minDate, maxDate)) {
      setErrorMessage(strings!.isOutOfBoundsErrorMessage || ' ');
    } else {
      setErrorMessage(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // We don't want to compare the date itself, since two instances of date at the same time are not equal
    // eslint-disable-next-line react-hooks/exhaustive-deps
    minDate && getDatePartHashValue(minDate),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    maxDate && getDatePartHashValue(maxDate),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    selectedDate && getDatePartHashValue(selectedDate),
    isRequired,
  ]);

  return [isCalendarShown ? undefined : errorMessage, validateTextInput, setErrorMessage] as const;
}

export const DatePickerBase = React.forwardRef(
  (propsWithoutDefaults: IDatePickerProps, forwardedRef: React.Ref<HTMLDivElement>) => {
    const props = getPropsWithDefaults(DEFAULT_PROPS, propsWithoutDefaults);

    const {
      firstDayOfWeek,
      strings,
      label,
      theme,
      className,
      styles,
      initialPickerDate,
      isRequired,
      disabled,
      ariaLabel,
      pickerAriaLabel,
      placeholder,
      allowTextInput,
      borderless,
      minDate,
      maxDate,
      showCloseButton,
      calendarProps,
      calloutProps,
      textField: textFieldProps,
      underlined,
      allFocusable,
      calendarAs: CalendarType = Calendar,
      tabIndex,
      disableAutoFocus,
    } = props;

    const id = useId('DatePicker', props.id);
    const calloutId = useId('DatePicker-Callout');

    const calendar = React.useRef<ICalendar>(null);
    const datePickerDiv = React.useRef<HTMLDivElement>(null);

    const [textFieldRef, focus, preventFocusOpeningPicker, preventNextFocusOpeningPicker] = useFocusLogic(props);
    const [isCalendarShown, setIsCalendarShown] = useCalendarVisibility(props, focus);
    const [selectedDate, formattedDate, setSelectedDate, setFormattedDate] = useSelectedDate(props);
    const [errorMessage, validateTextInput, setErrorMessage] = useErrorMessage(
      props,
      selectedDate,
      setSelectedDate,
      formattedDate,
      isCalendarShown,
    );

    const showDatePickerPopup = React.useCallback((): void => {
      if (!isCalendarShown) {
        preventNextFocusOpeningPicker();
        setIsCalendarShown(true);
      }
    }, [isCalendarShown, preventNextFocusOpeningPicker, setIsCalendarShown]);

    React.useImperativeHandle(
      props.componentRef,
      () => ({
        focus,
        reset() {
          setIsCalendarShown(false);
          setSelectedDate(undefined);
          setErrorMessage(undefined);
        },
        showDatePickerPopup,
      }),
      [focus, setErrorMessage, setIsCalendarShown, setSelectedDate, showDatePickerPopup],
    );

    const onTextFieldFocus = (): void => {
      if (disableAutoFocus) {
        return;
      }

      if (!allowTextInput) {
        if (!preventFocusOpeningPicker.current) {
          showDatePickerPopup();
        }
        preventFocusOpeningPicker.current = false;
      }
    };

    const onSelectDate = (date: Date): void => {
      if (props.calendarProps && props.calendarProps.onSelectDate) {
        props.calendarProps.onSelectDate(date);
      }

      calendarDismissed(date);
    };

    const onCalloutPositioned = (): void => {
      let shouldFocus = true;
      // If the user has specified that the callout shouldn't use initial focus, then respect
      // that and don't attempt to set focus. That will default to true within the callout
      // so we need to check if it's undefined here.
      if (props.calloutProps && props.calloutProps.setInitialFocus !== undefined) {
        shouldFocus = props.calloutProps.setInitialFocus;
      }
      if (calendar.current && shouldFocus) {
        calendar.current.focus();
      }
    };

    const onTextFieldBlur = (ev: React.FocusEvent<HTMLElement>): void => {
      validateTextInput();
    };

    const onTextFieldChanged = (
      ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue: string,
    ): void => {
      const { textField } = props;

      if (allowTextInput) {
        if (isCalendarShown) {
          dismissDatePickerPopup();
        }

        setFormattedDate(newValue);
      }

      textField?.onChange?.(ev, newValue);
    };

    const onTextFieldKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
      switch (ev.which) {
        case KeyCodes.enter:
          ev.preventDefault();
          ev.stopPropagation();
          if (!isCalendarShown) {
            validateTextInput();
            showDatePickerPopup();
          } else {
            // When DatePicker allows input date string directly,
            // it is expected to hit another enter to close the popup
            if (props.allowTextInput) {
              dismissDatePickerPopup();
            }
          }
          break;

        case KeyCodes.escape:
          handleEscKey(ev);
          break;

        case KeyCodes.down:
          if (ev.altKey && !isCalendarShown) {
            showDatePickerPopup();
          }
          break;

        default:
          break;
      }
    };

    const onTextFieldClick = (ev: React.MouseEvent<HTMLElement>): void => {
      if (!props.disableAutoFocus && !isCalendarShown && !props.disabled) {
        showDatePickerPopup();
        return;
      }
      if (props.allowTextInput) {
        dismissDatePickerPopup();
      }
    };

    const onIconClick = (ev: React.MouseEvent<HTMLElement>): void => {
      ev.stopPropagation();
      if (!isCalendarShown && !props.disabled) {
        showDatePickerPopup();
      } else if (props.allowTextInput) {
        dismissDatePickerPopup();
      }
    };

    const dismissDatePickerPopup = (newlySelectedDate?: Date): void => {
      if (isCalendarShown) {
        setIsCalendarShown(false);

        validateTextInput(newlySelectedDate);
        if (!allowTextInput) {
          setSelectedDate(newlySelectedDate);
        }
      }
    };

    /**
     * Callback for closing the calendar callout
     */
    const calendarDismissed = (newlySelectedDate?: Date): void => {
      preventNextFocusOpeningPicker();
      dismissDatePickerPopup(newlySelectedDate);
      // don't need to focus the text box, if necessary the focusTrapZone will do it
    };

    const calloutDismissed = (ev: React.MouseEvent<HTMLElement>): void => {
      calendarDismissed();
    };

    const handleEscKey = (ev: React.KeyboardEvent<HTMLElement>): void => {
      ev.stopPropagation();
      calendarDismissed();
    };

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      disabled,
      label: !!label,
      isDatePickerShown: isCalendarShown,
    });

    const nativeProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties, ['value']);
    const iconProps = textFieldProps && textFieldProps.iconProps;

    return (
      <div {...nativeProps} className={classNames.root} ref={forwardedRef}>
        <div ref={datePickerDiv} aria-haspopup="true" aria-owns={isCalendarShown ? calloutId : undefined}>
          <TextField
            role="combobox"
            label={label}
            aria-expanded={isCalendarShown}
            ariaLabel={ariaLabel}
            aria-controls={isCalendarShown ? calloutId : undefined}
            required={isRequired}
            disabled={disabled}
            errorMessage={errorMessage}
            placeholder={placeholder}
            borderless={borderless}
            value={formattedDate}
            componentRef={textFieldRef}
            underlined={underlined}
            tabIndex={tabIndex}
            readOnly={!allowTextInput}
            {...textFieldProps}
            id={id + '-label'}
            className={css(classNames.textField, textFieldProps && textFieldProps.className)}
            iconProps={{
              iconName: 'Calendar',
              ...iconProps,
              className: css(classNames.icon, iconProps && iconProps.className),
              onClick: onIconClick,
            }}
            // eslint-disable-next-line react/jsx-no-bind
            onKeyDown={onTextFieldKeyDown}
            // eslint-disable-next-line react/jsx-no-bind
            onFocus={onTextFieldFocus}
            // eslint-disable-next-line react/jsx-no-bind
            onBlur={onTextFieldBlur}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={onTextFieldClick}
            // eslint-disable-next-line react/jsx-no-bind
            onChange={onTextFieldChanged}
          />
        </div>
        {isCalendarShown && (
          <Callout
            id={calloutId}
            role="dialog"
            ariaLabel={pickerAriaLabel}
            isBeakVisible={false}
            gapSpace={0}
            doNotLayer={false}
            target={datePickerDiv.current}
            directionalHint={DirectionalHint.bottomLeftEdge}
            {...calloutProps}
            className={css(classNames.callout, calloutProps && calloutProps.className)}
            // eslint-disable-next-line react/jsx-no-bind
            onDismiss={calloutDismissed}
            // eslint-disable-next-line react/jsx-no-bind
            onPositioned={onCalloutPositioned}
          >
            <FocusTrapZone isClickableOutsideFocusTrap={true} disableFirstFocus={props.disableAutoFocus}>
              <CalendarType
                {...calendarProps}
                // eslint-disable-next-line react/jsx-no-bind
                onSelectDate={onSelectDate}
                // eslint-disable-next-line react/jsx-no-bind
                onDismiss={calendarDismissed}
                isMonthPickerVisible={props.isMonthPickerVisible}
                showMonthPickerAsOverlay={props.showMonthPickerAsOverlay}
                today={props.today}
                value={selectedDate || initialPickerDate}
                firstDayOfWeek={firstDayOfWeek}
                strings={strings!}
                highlightCurrentMonth={props.highlightCurrentMonth}
                highlightSelectedMonth={props.highlightSelectedMonth}
                showWeekNumbers={props.showWeekNumbers}
                firstWeekOfYear={props.firstWeekOfYear}
                showGoToToday={props.showGoToToday}
                dateTimeFormatter={props.dateTimeFormatter}
                minDate={minDate}
                maxDate={maxDate}
                componentRef={calendar}
                showCloseButton={showCloseButton}
                allFocusable={allFocusable}
              />
            </FocusTrapZone>
          </Callout>
        )}
      </div>
    );
  },
);
DatePickerBase.displayName = 'DatePickerBase';

function isDateOutOfBounds(date: Date, minDate?: Date, maxDate?: Date): boolean {
  return (!!minDate && compareDatePart(minDate!, date) > 0) || (!!maxDate && compareDatePart(maxDate!, date) < 0);
}
