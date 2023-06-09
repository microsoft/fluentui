import * as React from 'react';
import { ArrowDown, Enter, Escape } from '@fluentui/keyboard-keys';
import { Calendar } from '../Calendar/Calendar';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { compareDatePart, DayOfWeek, FirstWeekOfYear } from '../../utils';
import { defaultDatePickerStrings } from './defaults';
import { Input } from '@fluentui/react-input';
import {
  mergeCallbacks,
  resolveShorthand,
  useControllableState,
  useFirstMount,
  useId,
  useMergedRefs,
  useOnClickOutside,
  useOnScrollOutside,
} from '@fluentui/react-utilities';
import { useFieldContext_unstable as useFieldContext } from '@fluentui/react-field';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useModalAttributes } from '@fluentui/react-tabster';
import { usePopupPositioning } from '../../utils/usePopupPositioning';
import type { CalendarProps, ICalendar } from '../Calendar/Calendar.types';
import type { DatePickerProps, DatePickerState, DatePickerValidationResultData } from './DatePicker.types';
import type { InputProps, InputOnChangeData } from '@fluentui/react-input';

function isDateOutOfBounds(date: Date, minDate?: Date, maxDate?: Date): boolean {
  return (!!minDate && compareDatePart(minDate!, date) > 0) || (!!maxDate && compareDatePart(maxDate!, date) < 0);
}

function useFocusLogic() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const preventFocusOpeningPicker = React.useRef(false);

  const focus = () => {
    inputRef.current?.focus?.();
  };

  const preventNextFocusOpeningPicker = () => {
    preventFocusOpeningPicker.current = true;
  };

  return [focus, inputRef, preventFocusOpeningPicker, preventNextFocusOpeningPicker] as const;
}

function usePopupVisibility(props: DatePickerProps) {
  const [open, setOpen] = useControllableState({
    initialState: false,
    defaultState: props.defaultOpen,
    state: props.open,
  });
  const isMounted = React.useRef(false);

  React.useEffect(
    () => {
      if (isMounted.current && !open) {
        // If DatePicker's menu (Calendar) is closed, run onAfterMenuDismiss
        props.onOpenChange?.(false);
      }
      isMounted.current = true;
    },
    // Should only run on allowTextInput or open change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.allowTextInput, open],
  );

  return [open, setOpen] as const;
}

function useSelectedDate({ formatDate, onSelectDate, value }: DatePickerProps) {
  const [selectedDate, setSelectedDateState] = useControllableState<Date | null | undefined>({
    initialState: null,
    state: value,
  });
  const [formattedDate, setFormattedDate] = React.useState(() => (value && formatDate ? formatDate(value) : ''));

  const setSelectedDate = (newDate: Date | null | undefined) => {
    onSelectDate?.(newDate);
    setSelectedDateState(newDate);
    setFormattedDate(newDate && formatDate ? formatDate(newDate) : '');
  };

  React.useEffect(() => {
    setFormattedDate(value && formatDate ? formatDate(value) : '');
  }, [formatDate, value]);

  return [selectedDate, formattedDate, setSelectedDate, setFormattedDate] as const;
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
 * @param ref - reference to root Input slot
 */
export const useDatePicker_unstable = (props: DatePickerProps, ref: React.Ref<HTMLElement>): DatePickerState => {
  const {
    allowTextInput = false,
    allFocusable = false,
    borderless = false,
    dateTimeFormatter,
    defaultOpen = false,
    disableAutoFocus = true,
    firstDayOfWeek = DayOfWeek.Sunday,
    firstWeekOfYear = FirstWeekOfYear.FirstDay,
    formatDate = defaultFormatDate,
    highlightCurrentMonth = false,
    highlightSelectedMonth = false,
    initialPickerDate = new Date(),
    inlinePopup = false,
    isMonthPickerVisible = true,
    maxDate,
    minDate,
    onOpenChange,
    onSelectDate: onUserSelectDate,
    openOnClick = true,
    onValidationResult,
    parseDateFromString = defaultParseDateFromString,
    showCloseButton = false,
    showGoToToday = true,
    showMonthPickerAsOverlay = false,
    showWeekNumbers = false,
    strings = defaultDatePickerStrings,
    today,
    underlined = false,
    value,
    ...restOfProps
  } = props;
  const calendar = React.useRef<ICalendar>(null);
  const [focus, rootRef, preventFocusOpeningPicker, preventNextFocusOpeningPicker] = useFocusLogic();
  const [selectedDate, formattedDate, setSelectedDate, setFormattedDate] = useSelectedDate({
    formatDate,
    onSelectDate: onUserSelectDate,
    value,
  });
  const [open, setOpenState] = usePopupVisibility(props);
  const fieldContext = useFieldContext();
  const required = fieldContext?.required ?? props.required;
  const popupSurfaceId = useId('datePicker-popupSurface');

  const validateTextInput = React.useCallback(
    (date: Date | null = null): void => {
      let error: DatePickerValidationResultData['error'];

      if (allowTextInput) {
        if (formattedDate || date) {
          // Don't parse if the selected date has the same formatted string as what we're about to parse.
          // The formatted string might be ambiguous (ex: "1/2/3" or "New Year Eve") and the parser might
          // not be able to come up with the exact same date.
          if (selectedDate && formatDate && formatDate(date ?? selectedDate) === formattedDate) {
            return;
          }
          date = date || parseDateFromString!(formattedDate);

          // Check if date is null or date is an invalid date
          if (!date || isNaN(date.getTime())) {
            // Reset input if formatting is available
            setSelectedDate(selectedDate);
            error = 'invalid-input';
          } else {
            if (isDateOutOfBounds(date, minDate, maxDate)) {
              error = 'out-of-bounds';
            } else {
              setSelectedDate(date);
            }
          }
        } else {
          if (required) {
            error = 'required-input';
          }

          onUserSelectDate?.(date);
        }
      } else if (required && !formattedDate) {
        error = 'required-input';
      }

      onValidationResult?.({ error });
    },
    [
      allowTextInput,
      formatDate,
      formattedDate,
      maxDate,
      minDate,
      onUserSelectDate,
      onValidationResult,
      parseDateFromString,
      required,
      selectedDate,
      setSelectedDate,
    ],
  );

  const setOpen = React.useCallback(
    (newState: boolean) => {
      onOpenChange?.(newState);
      setOpenState(newState);
    },
    [onOpenChange, setOpenState],
  );

  const dismissDatePickerPopup = React.useCallback(
    (newlySelectedDate?: Date | null): void => {
      if (open) {
        setOpen(false);

        validateTextInput(newlySelectedDate);
        if (!allowTextInput && newlySelectedDate) {
          setSelectedDate(newlySelectedDate);
        }
      }
    },
    [allowTextInput, open, setOpen, setSelectedDate, validateTextInput],
  );

  const showDatePickerPopup = React.useCallback((): void => {
    if (!open) {
      preventNextFocusOpeningPicker();
      setOpen(true);
    }
  }, [open, preventNextFocusOpeningPicker, setOpen]);

  /**
   * Callback for closing the calendar callout
   */
  const calendarDismissed = React.useCallback(
    (newlySelectedDate?: Date): void => {
      preventNextFocusOpeningPicker();
      dismissDatePickerPopup(newlySelectedDate);
    },
    [dismissDatePickerPopup, preventNextFocusOpeningPicker],
  );

  const onInputChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
      const { value: newValue } = data;

      if (allowTextInput) {
        if (open) {
          dismissDatePickerPopup();
        }

        setFormattedDate(newValue);
      }
    },
    [allowTextInput, dismissDatePickerPopup, open, setFormattedDate],
  );

  const onInputBlur: React.FocusEventHandler<HTMLInputElement> = React.useCallback((): void => {
    validateTextInput();
  }, [validateTextInput]);

  const onInputKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLElement>): void => {
      switch (ev.key) {
        case Enter:
          ev.preventDefault();
          ev.stopPropagation();
          if (!open) {
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
          ev.stopPropagation();
          ev.preventDefault();
          if (open) {
            calendarDismissed();
          }
          break;

        case ArrowDown:
          ev.preventDefault();
          if (ev.altKey && !open) {
            showDatePickerPopup();
          }
          break;

        default:
          break;
      }
    },
    [calendarDismissed, dismissDatePickerPopup, open, props.allowTextInput, showDatePickerPopup, validateTextInput],
  );

  const onInputFocus: React.FocusEventHandler<HTMLInputElement> = React.useCallback((): void => {
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

  const onInputClick: React.MouseEventHandler<HTMLInputElement> = React.useCallback((): void => {
    // default openOnClick to !props.disableAutoFocus for legacy support of disableAutoFocus behavior
    if ((props.openOnClick || !props.disableAutoFocus) && !open && !props.disabled) {
      showDatePickerPopup();
      return;
    }

    if (allowTextInput) {
      dismissDatePickerPopup();
    }
  }, [
    allowTextInput,
    dismissDatePickerPopup,
    open,
    props.disabled,
    props.disableAutoFocus,
    props.openOnClick,
    showDatePickerPopup,
  ]);

  const onIconClick = (ev: React.MouseEvent<HTMLElement>): void => {
    ev.stopPropagation();
    if (!open && !props.disabled) {
      showDatePickerPopup();
    } else if (props.allowTextInput) {
      dismissDatePickerPopup();
    }
  };

  const inputAppearance: InputProps['appearance'] = underlined
    ? 'underline'
    : borderless
    ? 'filled-lighter'
    : 'outline';

  const [triggerWrapperRef, popupRef] = usePopupPositioning(props);
  const rootShorthand = resolveShorthand(restOfProps, {
    required: true,
    defaultProps: {
      appearance: inputAppearance,
      'aria-controls': open ? popupSurfaceId : undefined,
      'aria-expanded': open,
      'aria-haspopup': 'dialog',
      contentAfter: <CalendarMonthRegular onClick={onIconClick as unknown as React.MouseEventHandler<SVGElement>} />,
      readOnly: !allowTextInput,
      role: 'combobox',
      root: {
        'aria-owns': open ? popupSurfaceId : undefined,
        ref: useMergedRefs(triggerWrapperRef, ref),
      },
      input: {
        ref: rootRef,
      },
    },
  });

  rootShorthand.onChange = mergeCallbacks(rootShorthand.onChange, onInputChange);
  rootShorthand.onBlur = mergeCallbacks(rootShorthand.onBlur, onInputBlur);
  rootShorthand.onKeyDown = mergeCallbacks(rootShorthand.onKeyDown, onInputKeyDown);
  rootShorthand.onFocus = mergeCallbacks(rootShorthand.onFocus, onInputFocus);
  rootShorthand.onClick = mergeCallbacks(rootShorthand.onClick, onInputClick);

  const { modalAttributes } = useModalAttributes({ trapFocus: true, alwaysFocusable: true, legacyTrapFocus: false });
  const popupSurfaceShorthand = open
    ? resolveShorthand(props.popupSurface, {
        required: true,
        defaultProps: {
          'aria-label': 'Calendar',
          'aria-modal': true,
          id: popupSurfaceId,
          role: 'dialog',
          ref: popupRef,
          ...modalAttributes,
        },
      })
    : undefined;

  const { targetDocument } = useFluent();
  useOnClickOutside({
    element: targetDocument,
    callback: ev => dismissDatePickerPopup(),
    refs: [triggerWrapperRef, popupRef],
    disabled: !open,
  });

  useOnScrollOutside({
    element: targetDocument,
    callback: ev => dismissDatePickerPopup(),
    refs: [triggerWrapperRef, popupRef],
    disabled: !open,
  });

  // When the popup is opened, focus should go to the calendar.
  // In v8 this was done by focusing after the callout was positioned, but in v9 this can be simulated by using a
  // useEffect hook.
  React.useEffect(() => {
    if (open && !props.disabled && calendar.current) {
      calendar.current.focus();
    }
  }, [disableAutoFocus, open, props.disabled]);

  const isFirstMount = useFirstMount();
  // When the popup is closed, focus should go back to the input.
  React.useEffect(() => {
    if (!open && !props.disabled && !isFirstMount) {
      focus();
    }
    // Focus function keeps changing, so we need to skip it in the deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstMount, open, props.disabled]);

  const calendarShorthand = resolveShorthand(props.calendar, {
    required: true,
    defaultProps: {
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
      showCloseButton,
      showGoToToday,
      showMonthPickerAsOverlay,
      showWeekNumbers,
      strings,
      today,
      value: selectedDate || initialPickerDate,
    },
  });

  calendarShorthand.onDismiss = mergeCallbacks(calendarShorthand.onDismiss, calendarDismissed);
  calendarShorthand.onSelectDate = mergeCallbacks(calendarShorthand.onSelectDate, calendarDismissed);

  React.useImperativeHandle(
    props.componentRef,
    () => ({
      focus,
      reset() {
        setOpen(false);
        setSelectedDate(null);
      },
      showDatePickerPopup,
    }),
    [focus, setOpen, setSelectedDate, showDatePickerPopup],
  );

  const state: DatePickerState = {
    disabled: !!props.disabled,
    inlinePopup,

    components: {
      root: Input,
      calendar: Calendar as React.FC<Partial<CalendarProps>>,
      popupSurface: 'div',
    },

    calendar: calendarShorthand,
    root: rootShorthand,
    popupSurface: popupSurfaceShorthand,
  };

  state.root.value = formattedDate;

  return state;
};
