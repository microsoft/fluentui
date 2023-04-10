import * as React from 'react';
import { ArrowDown, Enter, Escape } from '@fluentui/keyboard-keys';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { Input } from '@fluentui/react-input';
import { mergeCallbacks, resolveShorthand, useControllableState, useId } from '@fluentui/react-utilities';
import { compareDatePart, DayOfWeek, FirstWeekOfYear } from '../../utils';
import { Calendar } from '../Calendar/Calendar';
import { defaultDatePickerStrings } from './defaults';
import { OnOpenChangeData, OpenPopoverEvents, Popover } from '@fluentui/react-popover';
import { PopoverSurface } from '@fluentui/react-popover';
import { PositioningImperativeRef } from '@fluentui/react-positioning';
import type { PopoverProps } from '@fluentui/react-popover';
import type { InputProps, InputOnChangeData } from '@fluentui/react-input';
import type { CalendarProps, ICalendar } from '../Calendar/Calendar.types';
import type { DatePickerProps, DatePickerState } from './DatePicker.types';

function isDateOutOfBounds(date: Date, minDate?: Date, maxDate?: Date): boolean {
  return (!!minDate && compareDatePart(minDate!, date) > 0) || (!!maxDate && compareDatePart(maxDate!, date) < 0);
}

function useFocusLogic() {
  const inputRef = React.useRef<{ focus: () => void }>(null);
  const preventFocusOpeningPicker = React.useRef(false);

  const focus = () => {
    inputRef.current?.focus?.();
  };

  const preventNextFocusOpeningPicker = () => {
    preventFocusOpeningPicker.current = true;
  };

  return [focus, inputRef, preventFocusOpeningPicker, preventNextFocusOpeningPicker] as const;
}

function useCalendarVisibility({ allowTextInput, onAfterMenuDismiss }: DatePickerProps, focus: () => void) {
  const [isCalendarShown, setIsCalendarShown] = React.useState(false);
  const isMounted = React.useRef(false);

  React.useEffect(
    () => {
      if (isMounted.current && !isCalendarShown) {
        // If DatePicker's menu (Calendar) is closed, run onAfterMenuDismiss
        onAfterMenuDismiss?.();
      }
      isMounted.current = true;
    },
    // Should only run on allowTextInput or isCalendarShown change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allowTextInput, isCalendarShown],
  );

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
    borderless = false,
    dateTimeFormatter,
    disableAutoFocus = true,
    firstDayOfWeek = DayOfWeek.Sunday,
    firstWeekOfYear = FirstWeekOfYear.FirstDay,
    formatDate = defaultFormatDate,
    highlightCurrentMonth = false,
    highlightSelectedMonth = false,
    initialPickerDate = new Date(),
    isMonthPickerVisible = true,
    maxDate,
    minDate,
    onAfterMenuDismiss,
    onSelectDate: onUserSelectDate,
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
  const popoverSurfaceId = useId('DatePicker-popoverSurface');

  const calendar = React.useRef<ICalendar>(null);

  const [focus, _, preventFocusOpeningPicker, preventNextFocusOpeningPicker] = useFocusLogic();
  const [isCalendarShown, setIsCalendarShown] = useCalendarVisibility({ allowTextInput, onAfterMenuDismiss }, focus);
  const [selectedDate, formattedDate, setSelectedDate, setFormattedDate] = useSelectedDate({
    formatDate,
    onSelectDate: onUserSelectDate,
    value,
  });

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
      },
      showDatePickerPopup,
    }),
    [focus, setIsCalendarShown, setSelectedDate, showDatePickerPopup],
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

  const onInputBlur: React.FocusEventHandler<HTMLInputElement> = React.useCallback((): void => {
    validateTextInput();
  }, [validateTextInput]);

  const onInputChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
      const { value: newValue } = data;

      if (allowTextInput) {
        if (isCalendarShown) {
          dismissDatePickerPopup();
        }

        setFormattedDate(newValue);
      }
    },
    [allowTextInput, dismissDatePickerPopup, isCalendarShown, setFormattedDate],
  );

  const onInputKeyDown = React.useCallback(
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

  const onInputClick: React.MouseEventHandler<HTMLInputElement> = React.useCallback((): void => {
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

  const inputAppearance: InputProps['appearance'] = underlined
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

  const rootRef = React.useRef<HTMLInputElement>(null);
  const rootShorthand = resolveShorthand(restOfProps, {
    required: true,
    defaultProps: {
      appearance: inputAppearance,
      'aria-controls': isCalendarShown ? popoverSurfaceId : undefined,
      'aria-expanded': isCalendarShown,
      'aria-haspopup': 'dialog',
      contentAfter: <CalendarMonthRegular onClick={onIconClick as unknown as React.MouseEventHandler<SVGElement>} />,
      readOnly: !allowTextInput,
      role: 'combobox',
      root: {
        ref: rootRef,
      },
    },
  });
  rootShorthand.onBlur = mergeCallbacks(onInputBlur, props.onBlur);
  rootShorthand.onClick = mergeCallbacks(onInputClick, props.onClick);
  rootShorthand.onFocus = mergeCallbacks(onInputFocus, props.onFocus);
  rootShorthand.onKeyDown = mergeCallbacks(onInputKeyDown, props.onKeyDown);
  rootShorthand.onChange = mergeCallbacks(onInputChange, props.onChange);

  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const popoverShorthand = resolveShorthand(props.popover, {
    defaultProps: {
      onOpenChange: onPopoverOpenChange,
      open: isCalendarShown,
      positioning: { align: 'start', position: 'below', positioningRef },
      trapFocus: true,
    },
    required: true,
  });

  const popoverSurfaceShorthand = resolveShorthand(props.popoverSurface, {
    defaultProps: {
      'aria-label': 'Calendar',
      id: popoverSurfaceId,
      role: 'dialog',
    },
    required: true,
  });

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

  const state: DatePickerState = {
    disabled: !!props.disabled,
    isDatePickerShown: isCalendarShown,

    // Slots definition
    components: {
      root: Input,
      popover: Popover as React.FC<Partial<PopoverProps>>,
      popoverSurface: PopoverSurface,
      calendar: Calendar as React.FC<Partial<CalendarProps>>,
    },

    calendar: calendarShorthand,
    popover: popoverShorthand,
    popoverSurface: popoverSurfaceShorthand,
    root: rootShorthand,
  };

  state.root.value = formattedDate;
  state.calendar.onSelectDate = mergeCallbacks(state.calendar.onSelectDate, calendarDismissed);

  React.useEffect(() => {
    if (rootRef.current) {
      positioningRef.current?.setTarget(rootRef.current);
    }
  }, [rootRef, positioningRef]);

  return state;
};
