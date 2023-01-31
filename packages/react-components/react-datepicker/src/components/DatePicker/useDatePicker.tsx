import * as React from 'react';
import { ArrowDown, Enter, Escape } from '@fluentui/keyboard-keys';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { InputField_unstable as InputField } from '@fluentui/react-input';
import { getNativeElementProps, resolveShorthand, useControllableState, useId } from '@fluentui/react-utilities';
import { Async } from '@fluentui/utilities';
import { mergeClasses } from '@griffel/react';
import { compareDatePart, getDatePartHashValue, DayOfWeek, FirstWeekOfYear } from '../../utils';
import { Calendar } from '../Calendar/Calendar';
import { defaultDatePickerStrings } from './defaults';
import { useDatePickerStyles_unstable } from './useDatePickerStyles';
import type { ITextField } from '@fluentui/react';
import type { InputOnChangeData, InputFieldProps_unstable as InputFieldProps } from '@fluentui/react-input';
import type { OnOpenChangeData, OpenPopoverEvents } from '@fluentui/react-popover';
import type { ICalendar } from '../Calendar/Calendar.types';
import type { DatePickerProps, DatePickerState } from './DatePicker.types';

function isDateOutOfBounds(date: Date, minDate?: Date, maxDate?: Date): boolean {
  return (!!minDate && compareDatePart(minDate!, date) > 0) || (!!maxDate && compareDatePart(maxDate!, date) < 0);
}

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

function useCalendarVisibility({ allowTextInput, onAfterMenuDismiss }: DatePickerProps, focus: () => void) {
  const [isCalendarShown, setIsCalendarShown] = React.useState(false);
  const isMounted = React.useRef(false);
  const asyncRef = React.useRef<Async>();
  if (!asyncRef.current) {
    asyncRef.current = new Async();
  }

  React.useEffect(
    () => {
      if (isMounted.current && !isCalendarShown) {
        // In browsers like IE, textfield gets unfocused when datepicker is collapsed
        if (allowTextInput) {
          asyncRef.current?.requestAnimationFrame(focus);
        }

        // If DatePicker's menu (Calendar) is closed, run onAfterMenuDismiss
        onAfterMenuDismiss?.();
      }
      isMounted.current = true;
    },
    // Should only run on allowTextInput or isCalendarShown change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allowTextInput, isCalendarShown],
  );

  React.useEffect(() => {
    return () => {
      asyncRef.current?.dispose();
      asyncRef.current = undefined;
    };
  }, []);

  return [isCalendarShown, setIsCalendarShown] as const;
}

function useSelectedDate({ formatDate, onSelectDate, value }: DatePickerProps) {
  const [selectedDate, setSelectedDateState] = useControllableState({
    initialState: undefined,
    state: value,
  });
  const [formattedDate, setFormattedDate] = React.useState(() => (value && formatDate ? formatDate(value) : ''));

  const setSelectedDate = (newDate: Date | undefined) => {
    if (
      (selectedDate === undefined && newDate !== undefined) ||
      (selectedDate !== undefined && newDate === undefined) ||
      (newDate && selectedDate && (newDate > selectedDate || newDate < selectedDate))
    ) {
      onSelectDate?.(newDate);
    }

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
    allowTextInput,
    formatDate,
    isRequired,
    maxDate,
    minDate,
    onSelectDate,
    parseDateFromString,
    strings,
  }: DatePickerProps,
  selectedDate: Date | undefined,
  setSelectedDate: (date: Date | undefined) => void,
  inputValue: string,
  isCalendarShown: boolean,
) {
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();
  const [statusMessage, setStatusMessage] = React.useState<string | undefined>();

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
            ? strings!.isResetStatusMessage.replace('{0}', inputValue).replace('{1}', selectedText)
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

  const minDatePartHashValue = minDate && getDatePartHashValue(minDate);
  const maxDatePartHashValue = maxDate && getDatePartHashValue(maxDate);
  const selectedDatePartHashValue = selectedDate && getDatePartHashValue(selectedDate);
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
    minDatePartHashValue,
    maxDatePartHashValue,
    selectedDatePartHashValue,
    isRequired,
  ]);

  return [
    isCalendarShown ? undefined : errorMessage,
    validateTextInput,
    setErrorMessage,
    isCalendarShown ? undefined : statusMessage,
    setStatusMessage,
  ] as const;
}

const defaultFormatDate = (date?: Date) => (date ? date.toDateString() : '');
const defaultParseDateFromString = (dateStr: string) => {
  const date = Date.parse(dateStr);
  return date ? new Date(date) : null;
};

/**
 * Create the state required to render DatePicker.
 *
 * The returned state can be modified with hooks such as useDatePickerStyles_unstable,
 * before being passed to renderDatePicker_unstable.
 *
 * @param props - props from this instance of DatePicker
 * @param ref - reference to root HTMLElement of DatePicker
 */
export const useDatePicker_unstable = (props: DatePickerProps, ref: React.Ref<HTMLElement>): DatePickerState => {
  const {
    allowTextInput = false,
    allFocusable = false,
    ariaLabel,
    borderless = false,
    calendarAs = Calendar,
    calendarProps,
    calloutProps,
    className,
    dateTimeFormatter,
    disabled,
    disableAutoFocus = true,
    firstDayOfWeek = DayOfWeek.Sunday,
    firstWeekOfYear = FirstWeekOfYear.FirstDay,
    formatDate = defaultFormatDate,
    highlightCurrentMonth = false,
    highlightSelectedMonth = false,
    initialPickerDate = new Date(),
    isMonthPickerVisible = true,
    isRequired = false,
    label,
    maxDate,
    minDate,
    onAfterMenuDismiss,
    onSelectDate: onUserSelectDate,
    parseDateFromString = defaultParseDateFromString,
    pickerAriaLabel = 'Calendar',
    placeholder,
    showCloseButton = false,
    showGoToToday = true,
    showMonthPickerAsOverlay = false,
    showWeekNumbers = false,
    strings = defaultDatePickerStrings,
    tabIndex,
    textField: textFieldProps,
    today,
    underlined = false,
    value,
  } = props;

  const id = useId('DatePicker', props.id);
  const calloutId = useId('DatePicker-Callout');

  const calendar = React.useRef<ICalendar>(null);

  const [, focus, preventFocusOpeningPicker, preventNextFocusOpeningPicker] = useFocusLogic();
  const [isCalendarShown, setIsCalendarShown] = useCalendarVisibility({ allowTextInput, onAfterMenuDismiss }, focus);
  const [selectedDate, formattedDate, setSelectedDate, setFormattedDate] = useSelectedDate({
    formatDate,
    onSelectDate: onUserSelectDate,
    value,
  });
  const [errorMessage, validateTextInput, setErrorMessage, statusMessage, setStatusMessage] = useErrorMessage(
    {
      allowTextInput,
      formatDate,
      isRequired,
      maxDate,
      minDate,
      onSelectDate: onUserSelectDate,
      parseDateFromString,
      strings,
    },
    selectedDate,
    setSelectedDate,
    formattedDate,
    isCalendarShown,
  );

  const dismissDatePickerPopup = React.useCallback(
    (newlySelectedDate?: Date): void => {
      if (isCalendarShown) {
        setIsCalendarShown(false);

        validateTextInput(newlySelectedDate);
        if (!allowTextInput && newlySelectedDate) {
          setSelectedDate(newlySelectedDate);
        }
      }
    },
    [allowTextInput, isCalendarShown, setIsCalendarShown, setSelectedDate, validateTextInput],
  );

  const showDatePickerPopup = React.useCallback((): void => {
    if (!isCalendarShown) {
      preventNextFocusOpeningPicker();
      setIsCalendarShown(true);
    }
  }, [isCalendarShown, preventNextFocusOpeningPicker, setIsCalendarShown]);

  /**
   * Callback for closing the calendar callout
   */
  const calendarDismissed = React.useCallback(
    (newlySelectedDate?: Date): void => {
      preventNextFocusOpeningPicker();
      dismissDatePickerPopup(newlySelectedDate);
      // don't need to focus the text box, if necessary the focusTrapZone will do it
    },
    [dismissDatePickerPopup, preventNextFocusOpeningPicker],
  );

  const handleEscKey = React.useCallback(
    (ev: React.KeyboardEvent<HTMLElement>): void => {
      if (isCalendarShown) {
        ev.stopPropagation();
        calendarDismissed();
      }
    },
    [calendarDismissed, isCalendarShown],
  );

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

  const onTextFieldFocus = React.useCallback((): void => {
    if (disableAutoFocus) {
      return;
    }

    if (!allowTextInput) {
      if (!preventFocusOpeningPicker.current) {
        showDatePickerPopup();
      }
      preventFocusOpeningPicker.current = false;
    }
  }, [allowTextInput, disableAutoFocus, preventFocusOpeningPicker, showDatePickerPopup]);

  const onSelectDate = React.useCallback(
    (date: Date): void => {
      if (props.calendarProps && props.calendarProps.onSelectDate) {
        props.calendarProps.onSelectDate(date);
      }

      calendarDismissed(date);
    },
    [calendarDismissed, props.calendarProps],
  );

  // const onCalloutPositioned = React.useCallback((): void => {
  //   let shouldFocus = true;
  //   // If the user has specified that the callout shouldn't use initial focus, then respect
  //   // that and don't attempt to set focus. That will default to true within the callout
  //   // so we need to check if it's undefined here.
  //   if (props.calloutProps && props.calloutProps.setInitialFocus !== undefined) {
  //     shouldFocus = props.calloutProps.setInitialFocus;
  //   }
  //   if (calendar.current && shouldFocus) {
  //     calendar.current.focus();
  //   }
  // }, [props.calloutProps]);

  const onTextFieldBlur = React.useCallback((): void => {
    validateTextInput();
  }, [validateTextInput]);

  const onTextFieldChanged = React.useCallback(
    (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, data: InputOnChangeData): void => {
      const { value: newValue } = data;

      if (allowTextInput) {
        if (isCalendarShown) {
          dismissDatePickerPopup();
        }

        if (newValue) {
          setFormattedDate(newValue);
        }
      }

      props.textField?.onChange?.(ev, newValue);
    },
    [allowTextInput, dismissDatePickerPopup, isCalendarShown, props.textField, setFormattedDate],
  );

  const onTextFieldKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLElement>): void => {
      switch (ev.key) {
        case Enter:
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

        case Escape:
          handleEscKey(ev);
          break;

        case ArrowDown:
          if (ev.altKey && !isCalendarShown) {
            showDatePickerPopup();
          }
          break;

        default:
          break;
      }
    },
    [
      dismissDatePickerPopup,
      handleEscKey,
      isCalendarShown,
      props.allowTextInput,
      showDatePickerPopup,
      validateTextInput,
    ],
  );

  const onTextFieldClick = React.useCallback((): void => {
    // default openOnClick to !props.disableAutoFocus for legacy support of disableAutoFocus behavior
    const openOnClick = props.openOnClick || !props.disableAutoFocus;
    if (openOnClick && !isCalendarShown && !props.disabled) {
      showDatePickerPopup();
      return;
    }
    if (props.allowTextInput) {
      dismissDatePickerPopup();
    }
  }, [
    dismissDatePickerPopup,
    isCalendarShown,
    props.allowTextInput,
    props.disabled,
    props.disableAutoFocus,
    props.openOnClick,
    showDatePickerPopup,
  ]);

  const onIconClick = (ev: React.MouseEvent<HTMLElement>): void => {
    ev.stopPropagation();
    if (!isCalendarShown && !props.disabled) {
      showDatePickerPopup();
    } else if (props.allowTextInput) {
      dismissDatePickerPopup();
    }
  };

  // const renderTextfieldDescription = (
  //   inputProps?: ITextFieldProps,
  //   defaultRender?: (
  //     props?: ITextFieldProps,
  //     defaultRender?: (props: ITextFieldProps) => JSX.Element | null,
  //   ) => JSX.Element | null,
  // ) => {
  //   return (
  //     <>
  //       {inputProps?.description ? defaultRender?.(inputProps) : null}
  //       <div aria-live="assertive" className={classNames.statusMessage}>
  //         {statusMessage}
  //       </div>
  //     </>
  //   );
  // };

  // const renderReadOnlyInput: ITextFieldProps['onRenderInput'] = inputProps => {
  //   const divProps = getNativeProps(inputProps!, divProperties);

  //   // Talkback on Android treats readonly inputs as disabled, so swipe gestures to open the Calendar
  //   // don't register. Workaround is rendering a div with role="combobox" (passed in via TextField props).
  //   return (
  //    <div {...divProps} className={css(divProps.className, classNames.readOnlyTextField)} tabIndex={tabIndex || 0}>
  //       {formattedDate || (
  //         // Putting the placeholder in a separate span fixes specificity issues for the text color
  //         <span className={classNames.readOnlyPlaceholder}>{placeholder}</span>
  //       )}
  //     </div>
  //   );
  // };

  const classNames = useDatePickerStyles_unstable({
    className,
    disabled,
    underlined,
    label: !!label,
    isDatePickerShown: isCalendarShown,
  });

  // const nativeProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties, ['value']);
  // // const iconProps = textFieldProps && textFieldProps.iconProps;
  const textFieldId =
    textFieldProps && textFieldProps.id && textFieldProps.id !== id ? textFieldProps.id : id + '-label';
  // // const readOnly = !allowTextInput && !disabled;

  // const dataIsFocusable =
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   (textFieldProps as any)?.['data-is-focusable'] ?? (props as any)['data-is-focusable'] ?? true;

  // eslint-disable-next-line deprecation/deprecation -- https://github.com/microsoft/fluentui/issues/26505
  const inputAppearance: InputFieldProps['appearance'] = underlined
    ? 'underline'
    : borderless
    ? 'filled-lighter'
    : 'outline';

  const onPopoverOpenChange = React.useCallback(
    (ev: OpenPopoverEvents, data: OnOpenChangeData) => {
      if (!data.open) {
        calendarDismissed();
      }
    },
    [calendarDismissed],
  );

  const root = getNativeElementProps('div', {
    ref,
    ...props,
    className: classNames.root,
  });

  const inputFieldShorthand = resolveShorthand(props.inputField, {
    defaultProps: {
      appearance: inputAppearance,
      'aria-controls': isCalendarShown ? calloutId : undefined,
      'aria-expanded': isCalendarShown,
      'aria-haspopup': 'dialog',
      'aria-label': ariaLabel,
      contentAfter: (
        <CalendarMonthRegular
          // className={mergeClasses(classNames.icon, iconProps?.className)}
          onClick={(onIconClick as unknown) as React.MouseEventHandler<SVGElement>}
        />
      ),
      disabled,
      label,
      placeholder,
      readOnly: !allowTextInput,
      required: isRequired,
      role: 'combobox',
      tabIndex,
      validationMessage: errorMessage ?? statusMessage,
      validationState: errorMessage ? 'error' : undefined,
      // eslint-disable-next-line deprecation/deprecation -- https://github.com/microsoft/fluentui/issues/26505
      ...(textFieldProps as InputFieldProps),
      className: mergeClasses(classNames.textField, textFieldProps?.className),
      id: textFieldId,
    },
    required: true,
  });
  inputFieldShorthand.onBlur = onTextFieldBlur;
  inputFieldShorthand.onChange = onTextFieldChanged;
  inputFieldShorthand.onClick = onTextFieldClick;
  inputFieldShorthand.onFocus = onTextFieldFocus;
  inputFieldShorthand.onKeyDown = onTextFieldKeyDown;
  inputFieldShorthand.value = formattedDate;

  const wrapperShorthand = resolveShorthand(props.wrapper, {
    defaultProps: {
      'aria-owns': isCalendarShown ? calloutId : undefined,
      className: classNames.wrapper,
    },
    required: true,
  });

  return {
    calendarAs,

    calendar: {
      ...calendarProps,
      allFocusable,
      componentRef: calendar,
      dateTimeFormatter,
      firstDayOfWeek,
      firstWeekOfYear,
      highlightCurrentMonth,
      highlightSelectedMonth,
      isMonthPickerVisible,
      maxDate,
      minDate,
      onDismiss: calendarDismissed,
      onSelectDate,
      showCloseButton,
      showGoToToday,
      showMonthPickerAsOverlay,
      showWeekNumbers,
      strings,
      today,
      value: selectedDate || initialPickerDate,
    },
    popover: {
      onOpenChange: onPopoverOpenChange,
      open: isCalendarShown,
      positioning: 'below-start',
      trapFocus: true,
    },
    popoverSurface: {
      'aria-label': pickerAriaLabel,
      className: mergeClasses(classNames.callout, calloutProps?.className),
      id: calloutId,
      role: 'dialog',
    },

    // Slots definition
    components: {
      root: 'div',
      // eslint-disable-next-line deprecation/deprecation -- https://github.com/microsoft/fluentui/issues/26505
      inputField: InputField,
      wrapper: 'div',
    },

    inputField: inputFieldShorthand,
    root,
    wrapper: wrapperShorthand,
  };
};
