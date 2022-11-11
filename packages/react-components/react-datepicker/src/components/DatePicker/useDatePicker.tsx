import * as React from 'react';
// import { getNativeElementProps } from '@fluentui/react-utilities';
import { Calendar } from '@fluentui/react';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { InputField } from '@fluentui/react-field';
import { getNativeElementProps, resolveShorthand, useControllableState, useId } from '@fluentui/react-utilities';
import {
  // TODO: classNamesFunction,
  // divProperties,
  // getNativeProps,
  format,
  getPropsWithDefaults,
  Async,
  KeyCodes,
} from '@fluentui/utilities';
import { mergeClasses } from '@griffel/react';
import { compareDatePart, getDatePartHashValue, DayOfWeek, FirstWeekOfYear } from '../../utils';
import { defaultDatePickerStrings } from './defaults';
import { useDatePickerStyles_unstable } from './useDatePickerStyles';
import type { ICalendar, ITextField /*, ITextFieldProps */ } from '@fluentui/react';
import type { InputOnChangeData } from '@fluentui/react-input';
import type { InputFieldProps } from '@fluentui/react-field';
import type { OnOpenChangeData, OpenPopoverEvents } from '@fluentui/react-popover';
import type { DatePickerProps, DatePickerSlots, DatePickerState } from './DatePicker.types';

const DEFAULT_PROPS: Omit<DatePickerProps, keyof DatePickerSlots> = {
  allowTextInput: false,
  formatDate: (date?: Date) => (date ? date.toDateString() : ''),
  parseDateFromString: (dateStr: string) => {
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

function useSelectedDate({ formatDate, value, onSelectDate }: DatePickerProps) {
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
    isRequired,
    allowTextInput,
    strings,
    parseDateFromString,
    onSelectDate,
    formatDate,
    minDate,
    maxDate,
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

/**
 * Create the state required to render DatePicker.
 *
 * The returned state can be modified with hooks such as useDatePickerStyles_unstable,
 * before being passed to renderDatePicker_unstable.
 *
 * @param props - props from this instance of DatePicker
 * @param ref - reference to root HTMLElement of DatePicker
 */
// export const useDatePicker_unstable = (props: DatePickerProps, ref: React.Ref<HTMLElement>): DatePickerState => {
export const useDatePicker_unstable = (
  propsWithoutDefaults: DatePickerProps,
  forwardedRef: React.Ref<HTMLElement>,
): DatePickerState => {
  const props = getPropsWithDefaults(DEFAULT_PROPS, propsWithoutDefaults);

  const {
    firstDayOfWeek,
    strings,
    label,
    // TODO: theme,
    className,
    // TODO: styles,
    initialPickerDate,
    isMonthPickerVisible,
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
    calendarAs = Calendar,
    tabIndex,
    disableAutoFocus = true,
    showMonthPickerAsOverlay,
    today,
    highlightCurrentMonth,
    highlightSelectedMonth,
    showWeekNumbers,
    firstWeekOfYear,
    showGoToToday,
    dateTimeFormatter,
  } = props;

  const id = useId('DatePicker', props.id);
  const calloutId = useId('DatePicker-Callout');

  const calendar = React.useRef<ICalendar>(null);
  const datePickerDiv = React.useRef<HTMLDivElement>(null);

  const [, focus, preventFocusOpeningPicker, preventNextFocusOpeningPicker] = useFocusLogic();
  const [isCalendarShown, setIsCalendarShown] = useCalendarVisibility(props, focus);
  const [selectedDate, formattedDate, setSelectedDate, setFormattedDate] = useSelectedDate(props);
  const [errorMessage, validateTextInput, setErrorMessage, statusMessage, setStatusMessage] = useErrorMessage(
    props,
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

  const onTextFieldBlur = React.useCallback(
    (ev: React.FocusEvent<HTMLElement>): void => {
      validateTextInput();
    },
    [validateTextInput],
  );

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
    ref: forwardedRef,
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
      onBlur: onTextFieldBlur,
      onChange: onTextFieldChanged,
      onClick: onTextFieldClick,
      onFocus: onTextFieldFocus,
      onKeyDown: onTextFieldKeyDown,
      placeholder,
      readOnly: !allowTextInput,
      required: isRequired,
      role: 'combobox',
      tabIndex,
      validationMessage: errorMessage ?? statusMessage,
      validationState: errorMessage ? 'error' : undefined,
      value: formattedDate,
      ...(textFieldProps as InputFieldProps),
      className: mergeClasses(classNames.textField, textFieldProps?.className),
      id: textFieldId,
    },
    required: true,
  });
  const wrapperShorthand = resolveShorthand(props.wrapper, {
    defaultProps: {
      'aria-owns': isCalendarShown ? calloutId : undefined,
      className: classNames.wrapper,
      ref: datePickerDiv,
    },
    required: true,
  });

  const state: DatePickerState = {
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
      inputField: InputField,
      wrapper: 'div',
    },

    inputField: inputFieldShorthand,
    root,
    wrapper: wrapperShorthand,
  };

  return state;

  // return {
  //   // TODO add appropriate props/defaults
  //   components: {
  //     // TODO add each slot's element type or component
  //     root: 'div',
  //   },
  //   // TODO add appropriate slots, for example:
  //   // mySlot: resolveShorthand(props.mySlot),
  //   root: getNativeElementProps('div', {
  //     ref,
  //     ...props,
  //   }),
  // };
};
