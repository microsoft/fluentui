import * as React from 'react';
import { ArrowDown, Enter, Escape } from '@fluentui/keyboard-keys';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { Input } from '@fluentui/react-input';
import { useFocusFinders, useModalAttributes } from '@fluentui/react-tabster';
import {
  mergeCallbacks,
  resolveShorthand,
  useControllableState,
  useEventCallback,
  useId,
  useMergedRefs,
  useOnClickOutside,
  useOnScrollOutside,
} from '@fluentui/react-utilities';
import { compareDatePart, DayOfWeek, FirstWeekOfYear } from '../../utils';
import { Calendar } from '../Calendar/Calendar';
import { usePopupPositioning } from '../../utils/usePopupPositioning';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { InputProps, InputOnChangeData } from '@fluentui/react-input';
import type { CalendarProps, ICalendar } from '../Calendar/Calendar.types';
import type { DatePickerProps, DatePickerState } from './DatePicker.types';
import { defaultCalendarStrings } from '../Calendar/defaults';

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
    parseDateFromString = defaultParseDateFromString,
    showCloseButton = false,
    showGoToToday = true,
    showMonthPickerAsOverlay = false,
    showWeekNumbers = false,
    strings = defaultCalendarStrings,
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
  const popupSurfaceId = useId('datePicker-popoverSurface');

  const validateTextInput = React.useCallback(
    (date: Date | null = null): void => {
      if (allowTextInput) {
        if (formattedDate || date) {
          // Don't parse if the selected date has the same formatted string as what we're about to parse.
          // The formatted string might be ambiguous (ex: "1/2/3" or "New Year Eve") and the parser might
          // not be able to come up with the exact same date.
          if (selectedDate && formatDate && formatDate(date ?? selectedDate) === formattedDate) {
            return;
          }
          date = date || parseDateFromString!(formattedDate);

          // Check if date is null or date is and invalid date
          if (!date || isNaN(date.getTime())) {
            // Reset input if formatting is available
            setSelectedDate(selectedDate);
          } else if (!isDateOutOfBounds(date, minDate, maxDate)) {
            setSelectedDate(date);
          }
        } else if (onUserSelectDate) {
          onUserSelectDate(date);
        }
      }
    },
    [
      allowTextInput,
      formatDate,
      formattedDate,
      maxDate,
      minDate,
      onUserSelectDate,
      parseDateFromString,
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
    (newlySelectedDate?: Date): void => {
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
    if ((openOnClick || !disableAutoFocus) && !open && !props.disabled) {
      showDatePickerPopup();
      return;
    }

    if (allowTextInput) {
      dismissDatePickerPopup();
    }
  }, [
    allowTextInput,
    disableAutoFocus,
    dismissDatePickerPopup,
    openOnClick,
    open,
    props.disabled,
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
        ref: useMergedRefs(triggerWrapperRef, ref),
        'aria-owns': popupSurfaceId,
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

  const { findFirstFocusable } = useFocusFinders();
  React.useEffect(() => {
    if (disableAutoFocus) {
      return;
    }

    if (open && popupRef.current) {
      const firstFocusable = findFirstFocusable(popupRef.current);
      firstFocusable?.focus();
    }
  }, [disableAutoFocus, findFirstFocusable, open, popupRef]);

  const popupOnClick = useEventCallback(
    mergeCallbacks((ev: React.MouseEvent<HTMLDivElement>) => {
      rootRef.current?.focus();
    }, popupSurfaceShorthand?.onClick),
  );

  if (popupSurfaceShorthand) {
    popupSurfaceShorthand.onClick = popupOnClick;
  }

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
      onDismiss: calendarDismissed,
      showCloseButton,
      showGoToToday,
      showMonthPickerAsOverlay,
      showWeekNumbers,
      strings,
      today,
      value: selectedDate || initialPickerDate,
    },
  });

  React.useImperativeHandle(
    props.componentRef,
    () => ({
      focus,
      reset() {
        setOpen(false);
        setSelectedDate(undefined);
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
  state.calendar.onSelectDate = mergeCallbacks(state.calendar.onSelectDate, calendarDismissed);

  return state;
};
