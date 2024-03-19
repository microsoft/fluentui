import * as React from 'react';
import {
  KeyCodes,
  classNamesFunction,
  getNativeProps,
  divProperties,
  css,
  format,
  getPropsWithDefaults,
} from '@fluentui/utilities';
import { Calendar } from '../../Calendar';
import { FirstWeekOfYear, getDatePartHashValue, compareDatePart, DayOfWeek } from '@fluentui/date-time-utilities';
import { Callout, DirectionalHint } from '../../Callout';
import { mergeStyles } from '../../Styling';
import { TextField } from '../../TextField';
import { FocusTrapZone } from '../../FocusTrapZone';
import { useId, useAsync, useControllableValue } from '@fluentui/react-hooks';
import { defaultDatePickerStrings } from './defaults';
import type { IDatePickerProps, IDatePickerStyleProps, IDatePickerStyles } from './DatePicker.types';
import type { IRenderFunction } from '@fluentui/utilities';
import type { ICalendar } from '../../Calendar';
import type { ITextField, ITextFieldProps } from '../../TextField';

const getClassNames = classNamesFunction<IDatePickerStyleProps, IDatePickerStyles>();

const DEFAULT_PROPS: IDatePickerProps = {
  allowTextInput: false,
  formatDate: (date: Date) => (date ? date.toDateString() : ''),
  parseDateFromString: (dateStr: string) => {
    //if dateStr is DATE ONLY ISO 8601 -> add time so Date.parse() won't convert it to UTC
    //See here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#date_time_string_format
    if (dateStr.match(/^\d{4}(-\d{2}){2}$/)) {
      dateStr += 'T12:00';
    }
    const date = Date.parse(dateStr);
    return date ? new Date(date) : null;
  },
  firstDayOfWeek: DayOfWeek.Sunday,
  initialPickerDate: new Date(),
  isRequired: false,
  isMonthPickerVisible: true,
  showMonthPickerAsOverlay: false,
  strings: defaultDatePickerStrings,
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
};

function useFocusLogic() {
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
    textField,
  }: IDatePickerProps,
  selectedDate: Date | undefined,
  setSelectedDate: (date: Date | undefined) => void,
  inputValue: string,
  isCalendarShown: boolean,
) {
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();
  const [statusMessage, setStatusMessage] = React.useState<string | undefined>();
  const isFirstLoadRef = React.useRef<boolean>(true);

  const validateOnLoad = textField?.validateOnLoad ?? true;

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
          // default the newer isResetStatusMessage string to invalidInputErrorMessage for legacy support
          const selectedText = formatDate ? formatDate(selectedDate) : '';
          const statusText = strings!.isResetStatusMessage
            ? format(strings!.isResetStatusMessage, inputValue, selectedText)
            : strings!.invalidInputErrorMessage || '';
          setStatusMessage(statusText);
        } else {
          // Check against optional date boundaries
          if (isDateOutOfBounds(date, minDate, maxDate)) {
            setErrorMessage(strings!.isOutOfBoundsErrorMessage || ' ');
          } else {
            setSelectedDate(date);
            setErrorMessage(undefined);
            setStatusMessage(undefined);
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
      // Cleanup the error message and status message
      setErrorMessage(undefined);
      setStatusMessage(undefined);
    }
  };

  React.useEffect(() => {
    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false;

      if (!validateOnLoad) {
        return;
      }
    }

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
    validateOnLoad,
  ]);

  return [
    isCalendarShown ? undefined : errorMessage,
    validateTextInput,
    setErrorMessage,
    isCalendarShown ? undefined : statusMessage,
    setStatusMessage,
  ] as const;
}

export const DatePickerBase: React.FunctionComponent<IDatePickerProps> = React.forwardRef<
  HTMLDivElement,
  IDatePickerProps
>((propsWithoutDefaults, forwardedRef) => {
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
    disableAutoFocus = true,
  } = props;

  const id = useId('DatePicker', props.id);
  const calloutId = useId('DatePicker-Callout');

  const calendar = React.useRef<ICalendar>(null);
  const datePickerDiv = React.useRef<HTMLDivElement>(null);

  const [textFieldRef, focus, preventFocusOpeningPicker, preventNextFocusOpeningPicker] = useFocusLogic();
  const [isCalendarShown, setIsCalendarShown] = useCalendarVisibility(props, focus);
  const [selectedDate, formattedDate, setSelectedDate, setFormattedDate] = useSelectedDate(props);
  const [errorMessage, validateTextInput, setErrorMessage, statusMessage, setStatusMessage] = useErrorMessage(
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
        setStatusMessage(undefined);
      },
      showDatePickerPopup,
    }),
    [focus, setErrorMessage, setIsCalendarShown, setSelectedDate, setStatusMessage, showDatePickerPopup],
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

  const onTextFieldChanged = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string): void => {
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
    // eslint-disable-next-line deprecation/deprecation
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
    // default openOnClick to !props.disableAutoFocus for legacy support of disableAutoFocus behavior
    const openOnClick = props.openOnClick || !props.disableAutoFocus;
    if (openOnClick && !isCalendarShown && !props.disabled) {
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
      if (!allowTextInput && newlySelectedDate) {
        setSelectedDate(newlySelectedDate);
      }
    }
  };

  const renderTextfieldDescription = (inputProps: ITextFieldProps, defaultRender: IRenderFunction<ITextFieldProps>) => {
    return (
      <>
        {inputProps.description || inputProps.onRenderDescription ? defaultRender(inputProps) : null}
        <div aria-live="assertive" className={classNames.statusMessage}>
          {statusMessage}
        </div>
      </>
    );
  };

  const renderReadOnlyInput: ITextFieldProps['onRenderInput'] = inputProps => {
    const divProps = getNativeProps(inputProps!, divProperties);
    // Need to merge styles so the provided styles win over the default ones. This is due to the classnames having the
    // same specificity.
    const readOnlyTextFieldClassName = mergeStyles(divProps.className, classNames.readOnlyTextField);

    // Talkback on Android treats readonly inputs as disabled, so swipe gestures to open the Calendar
    // don't register. Workaround is rendering a div with role="combobox" (passed in via TextField props).
    return (
      <div {...divProps} className={readOnlyTextFieldClassName} tabIndex={tabIndex || 0}>
        {formattedDate || (
          // Putting the placeholder in a separate span fixes specificity issues for the text color
          <span className={classNames.readOnlyPlaceholder}>{placeholder}</span>
        )}
      </div>
    );
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
    if (isCalendarShown) {
      ev.stopPropagation();
      calendarDismissed();
    }
  };

  const onCalendarDismissed = (ev?: React.MouseEvent<HTMLElement>): void => {
    calendarDismissed();
  };

  const classNames = getClassNames(styles, {
    theme: theme!,
    className,
    disabled,
    underlined,
    label: !!label,
    isDatePickerShown: isCalendarShown,
  });

  const nativeProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties, ['value']);
  const iconProps = textFieldProps && textFieldProps.iconProps;
  const textFieldId =
    textFieldProps && textFieldProps.id && textFieldProps.id !== id ? textFieldProps.id : id + '-label';
  const readOnly = !allowTextInput && !disabled;

  const dataIsFocusable = (textFieldProps as any)?.['data-is-focusable'] ?? (props as any)['data-is-focusable'] ?? true;

  // Props to create a semantic but non-focusable button when the datepicker has a text input
  // Used for voice control and touch screen reader accessibility
  const iconA11yProps: React.HTMLAttributes<HTMLSpanElement> = allowTextInput
    ? {
        role: 'button',
        'aria-expanded': isCalendarShown,
        'aria-label': ariaLabel ?? label,
        'aria-labelledby': textFieldProps && textFieldProps['aria-labelledby'],
      }
    : {};

  return (
    <div {...nativeProps} className={classNames.root} ref={forwardedRef}>
      <div ref={datePickerDiv} aria-owns={isCalendarShown ? calloutId : undefined} className={classNames.wrapper}>
        <TextField
          role="combobox"
          label={label}
          aria-expanded={isCalendarShown}
          ariaLabel={ariaLabel}
          aria-haspopup="dialog"
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
          data-is-focusable={dataIsFocusable}
          id={textFieldId}
          className={css(classNames.textField, textFieldProps && textFieldProps.className)}
          iconProps={{
            iconName: 'Calendar',
            ...iconA11yProps,
            ...iconProps,
            className: css(classNames.icon, iconProps && iconProps.className),
            onClick: onIconClick,
          }}
          // eslint-disable-next-line react/jsx-no-bind
          onRenderDescription={renderTextfieldDescription}
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
          onRenderInput={readOnly ? renderReadOnlyInput : undefined}
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
          <FocusTrapZone isClickableOutsideFocusTrap={true} disableFirstFocus={disableAutoFocus}>
            <CalendarType
              {...calendarProps}
              // eslint-disable-next-line react/jsx-no-bind
              onSelectDate={onSelectDate}
              // eslint-disable-next-line react/jsx-no-bind
              onDismiss={onCalendarDismissed}
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
});
DatePickerBase.displayName = 'DatePickerBase';

function isDateOutOfBounds(date: Date, minDate?: Date, maxDate?: Date): boolean {
  return (!!minDate && compareDatePart(minDate!, date) > 0) || (!!maxDate && compareDatePart(maxDate!, date) < 0);
}
