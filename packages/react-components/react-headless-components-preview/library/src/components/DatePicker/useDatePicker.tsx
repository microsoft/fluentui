'use client';

import * as React from 'react';
import { ArrowDown, Enter, Escape } from '@fluentui/keyboard-keys';
import { useFieldControlProps_unstable } from '@fluentui/react-field';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import {
  getPartitionedNativeProps,
  mergeCallbacks,
  slot,
  useControllableState,
  useEventCallback,
  useId,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { resolvePositioningShorthand, usePositioning } from '../../hooks';
import { toDataAttributeValue } from '../../utils';
import { Calendar } from '../Calendar/Calendar';
import {
  addDays,
  calendarFormatters,
  compareDatePart,
  getMonthEnd,
  getMonthStart,
  isRestrictedDate,
  setMonth,
} from '../Calendar/utils';
import type { CalendarProps, CalendarViewChangeData } from '../Calendar/Calendar.types';
import type { CalendarDayHandle, CalendarDayProps } from '../Calendar/CalendarDay/CalendarDay.types';
import type { CalendarMonthHandle, CalendarMonthProps } from '../Calendar/CalendarMonth/CalendarMonth.types';
import type { CalendarFormatters } from '../Calendar/utils';
import { defaultFormatDate, defaultParseDate } from './datePickerFormatting';
import { useDatePickerDateState } from './useDatePickerDateState';
import type {
  DatePickerCalendarProps,
  DatePickerErrorMessageData,
  DatePickerOpenChangeData,
  DatePickerProps,
  DatePickerState,
} from './DatePicker.types';

type DatePickerEvent = React.SyntheticEvent | Event;
type OpenChangeReason = DatePickerOpenChangeData['reason'];

const isDefaultPrevented = (event: DatePickerEvent): boolean =>
  'nativeEvent' in event ? event.isDefaultPrevented() : event.defaultPrevented;

const defaultFormatErrorMessage = ({ error, minDate, maxDate, formatDate }: DatePickerErrorMessageData): string => {
  if (error === 'required-input') {
    return 'Enter a date.';
  }

  if (error === 'out-of-bounds') {
    if (minDate && maxDate) {
      return `Enter an available date between ${formatDate(minDate)} and ${formatDate(maxDate)}.`;
    }
    if (minDate) {
      return `Enter an available date on or after ${formatDate(minDate)}.`;
    }
    if (maxDate) {
      return `Enter an available date on or before ${formatDate(maxDate)}.`;
    }
    return 'Enter an available date.';
  }

  return 'Enter a date such as August 12, 2026, 2026-08-12 or 8/12/2026.';
};

// The day picker heading opens the year-range grid in the month-year picker.
const dayPickerHeaderLabel: CalendarFormatters['dayPickerHeaderLabel'] = data => `${data.formattedDate}, change year`;

/**
 * Creates DatePicker state: the committed date, pending typed text and validation, the popup lifecycle and its focus
 * management, and the Calendar configuration.
 * @param props - Props from this instance of DatePicker.
 * @param ref - Reference to the field control: the input when `allowTextInput` is set, otherwise the trigger button.
 */
export const useDatePicker = (
  props: DatePickerProps,
  ref: React.Ref<HTMLInputElement | HTMLButtonElement>,
): DatePickerState => {
  const {
    allowTextInput = false,
    disabled = false,
    formatDate = defaultFormatDate,
    formatErrorMessage = defaultFormatErrorMessage,
    maxDate,
    minDate,
    onOpenChange,
    parseDate = defaultParseDate,
    placeholder = 'Select a date',
    positioning,
    showGoToToday = false,
    today: todayProp,
  } = props;

  const { targetDocument } = useFluent();
  const today = React.useMemo(() => todayProp ?? new Date(), [todayProp]);

  // A Field label's htmlFor would name the trigger button by the label alone, so the button uses aria-labelledby and
  // appends the displayed date.
  const fieldControlProps = useFieldControlProps_unstable(props, { supportsLabelFor: allowTextInput });
  const nativeProps = getPartitionedNativeProps({
    props: fieldControlProps,
    primarySlotTagName: 'input',
    excludedPropNames: ['defaultValue', 'disabled', 'placeholder', 'required', 'value'],
  });
  const required =
    props.required === true ||
    fieldControlProps['aria-required'] === true ||
    fieldControlProps['aria-required'] === 'true';
  const controlId = useId('datepicker-', fieldControlProps.id);

  const calendarProps: DatePickerCalendarProps = slot.resolveShorthand(props.calendar) ?? {};
  const restrictedDates = calendarProps.restrictedDates;
  const isDateUnavailable = (date: Date) => isRestrictedDate(date, { minDate, maxDate, restrictedDates });

  const dateState = useDatePickerDateState({
    allowTextInput,
    defaultValue: props.defaultValue,
    disabled,
    formatDate,
    isDateUnavailable,
    onDateChange: props.onDateChange,
    onValidationResult: props.onValidationResult,
    parseDate,
    required,
    value: props.value,
  });
  const { error } = dateState;

  /**
   * Opening shows the selected day, otherwise today, otherwise the first available day of today's month. Calendar
   * falls back to an adjacent-month day or the Next month button when the shown month has no available day.
   */
  const getInitialDisplayedDate = (): Date => {
    if (dateState.value && !isDateUnavailable(dateState.value)) {
      return dateState.value;
    }

    let date = today;
    if (minDate && compareDatePart(date, minDate) < 0) {
      date = minDate;
    } else if (maxDate && compareDatePart(date, maxDate) > 0) {
      date = maxDate;
    }
    if (!isDateUnavailable(date)) {
      return date;
    }

    const monthEnd = getMonthEnd(date);
    for (let day = getMonthStart(date); compareDatePart(day, monthEnd) <= 0; day = addDays(day, 1)) {
      if (!isDateUnavailable(day)) {
        return day;
      }
    }
    return date;
  };

  const [displayedDate, setDisplayedDate] = React.useState(getInitialDisplayedDate);

  const [openState, setOpenState] = useControllableState({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false,
  });
  const open = openState && !disabled;

  // Every opening shows the initial date, including defaultOpen and controlled `open` changes.
  const [wasOpen, setWasOpen] = React.useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setDisplayedDate(getInitialDisplayedDate());
    }
  }

  const rootRef = React.useRef<HTMLDivElement>(null);
  const controlRef = React.useRef<HTMLInputElement & HTMLButtonElement>(null);
  const surfaceRef = React.useRef<HTMLDivElement>(null);
  const dayPickerRef = React.useRef<CalendarDayHandle>(null);
  const monthPickerRef = React.useRef<CalendarMonthHandle>(null);
  // Set while a request runs, so the blur caused by returning focus to the field does not request a second change.
  const isRequestingOpen = React.useRef(false);
  const wasOpenOnLastEffect = React.useRef(false);
  const focusWithinSurface = React.useRef(false);
  // In the overlay layout the day heading first switches to the month view, which then opens the year-range grid.
  const showYearPickerOnMount = React.useRef(false);

  const isWithin = (element: HTMLElement | null, target: EventTarget | null) =>
    !!element && !!target && element.contains(target as Node);

  const requestOpen = useEventCallback((event: DatePickerEvent, nextOpen: boolean, reason: OpenChangeReason) => {
    if (isRequestingOpen.current || open === nextOpen || (nextOpen && disabled)) {
      return;
    }
    isRequestingOpen.current = true;

    if (
      !nextOpen &&
      reason !== 'focusOut' &&
      reason !== 'outsideClick' &&
      isWithin(surfaceRef.current, targetDocument?.activeElement ?? null)
    ) {
      // Selection and Escape return focus to the field before the surface unmounts, so it never drops to the body.
      focusWithinSurface.current = false;
      controlRef.current?.focus({ preventScroll: true });
    }

    isRequestingOpen.current = false;
    setOpenState(nextOpen);
    onOpenChange?.(event, { event, type: event.type, open: nextOpen, reason });
  });

  React.useEffect(() => {
    const opened = open && !wasOpenOnLastEffect.current;
    wasOpenOnLastEffect.current = open;
    if (open) {
      // Focus moves into the calendar on every opening, including defaultOpen and controlled `open` changes.
      if (opened) {
        if (dayPickerRef.current) {
          dayPickerRef.current.focus({ preventScroll: true });
        } else if (monthPickerRef.current) {
          monthPickerRef.current.focus({ preventScroll: true });
        } else {
          surfaceRef.current?.focus({ preventScroll: true });
        }
      }
      return;
    }

    showYearPickerOnMount.current = false;
    // A controlled close can unmount the surface while it holds focus; never leave focus on the body.
    if (focusWithinSurface.current) {
      focusWithinSurface.current = false;
      const activeElement = targetDocument?.activeElement;
      if (!activeElement || activeElement === targetDocument?.body) {
        controlRef.current?.focus({ preventScroll: true });
      }
    }
  }, [open, targetDocument]);

  const onOutsidePointerDown = useEventCallback((event: PointerEvent) => {
    const path = event.composedPath();
    if (
      (rootRef.current && path.includes(rootRef.current)) ||
      (surfaceRef.current && path.includes(surfaceRef.current))
    ) {
      return;
    }
    focusWithinSurface.current = false;
    requestOpen(event, false, 'outsideClick');
    dateState.validate(event);
  });

  React.useEffect(() => {
    if (!open || !targetDocument) {
      return;
    }
    targetDocument.addEventListener('pointerdown', onOutsidePointerDown, true);
    return () => targetDocument.removeEventListener('pointerdown', onOutsidePointerDown, true);
  }, [open, targetDocument, onOutsidePointerDown]);

  const { targetRef, containerRef } = usePositioning({
    position: 'below',
    align: 'start',
    ...resolvePositioningShorthand(positioning),
  });

  // Field control

  const valueId = useId('datepicker-value-');
  const surfaceId = useId('datepicker-popup-', slot.resolveShorthand(props.popupSurface)?.id);
  const errorMessageSlot = slot.optional(props.errorMessage, { renderByDefault: true, elementType: 'div' });
  const errorMessageId = useId('datepicker-error-', errorMessageSlot?.id);
  const describedBy =
    [fieldControlProps['aria-describedby'], error && errorMessageSlot ? errorMessageId : undefined]
      .filter(Boolean)
      .join(' ') || undefined;

  const controlAriaProps = {
    'aria-controls': open ? surfaceId : undefined,
    'aria-describedby': describedBy,
    'aria-expanded': open,
    'aria-haspopup': 'dialog' as const,
    'aria-invalid': error ? true : fieldControlProps['aria-invalid'],
    'aria-required': required || undefined,
  };

  const onControlKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLElement>) => {
    if (event.isDefaultPrevented() || disabled) {
      return;
    }

    if (event.key === ArrowDown && event.altKey) {
      event.preventDefault();
      if (open) {
        dayPickerRef.current?.focus();
      } else {
        requestOpen(event, true, 'keyboard');
      }
    } else if (event.key === Escape && open) {
      // Keep the Escape that closes the calendar from also dismissing a surrounding dialog or popover.
      event.preventDefault();
      event.stopPropagation();
      requestOpen(event, false, 'keyboard');
    } else if (event.key === Enter && allowTextInput) {
      dateState.validate(event);
    }
  });

  const onControlBlur = useEventCallback((event: React.FocusEvent<HTMLElement>) => {
    // Moving between the field and the calendar does not submit pending text.
    if (!isWithin(rootRef.current, event.relatedTarget) && !isWithin(surfaceRef.current, event.relatedTarget)) {
      dateState.validate(event);
    }
  });

  const formattedValue = dateState.value ? formatDate(dateState.value) : '';

  const input = allowTextInput
    ? slot.always(props.input, {
        defaultProps: {
          ...(nativeProps.primary as Omit<React.ComponentProps<'input'>, 'children'>),
          autoComplete: 'off',
          type: 'text',
        },
        elementType: 'input',
      })
    : undefined;
  if (input) {
    const inputDescribedBy = input['aria-describedby'];
    const inputInvalid = input['aria-invalid'];
    Object.assign(input, controlAriaProps);
    input['aria-describedby'] = [describedBy, inputDescribedBy].filter(Boolean).join(' ') || undefined;
    input['aria-invalid'] = error ? true : inputInvalid ?? fieldControlProps['aria-invalid'];
    // aria-expanded is not supported on text inputs, and the popup is not a listbox, so the field is not a combobox.
    // The calendar icon exposes the expanded state instead.
    delete input['aria-expanded'];
    input.id = controlId;
    input.disabled = disabled;
    input.placeholder = placeholder;
    input.value = dateState.text;
    input.onChange = mergeCallbacks(input.onChange, event => {
      dateState.setText(event.target.value);
    });
    input.onKeyDown = mergeCallbacks(input.onKeyDown, onControlKeyDown);
    input.onBlur = mergeCallbacks(input.onBlur, onControlBlur);
  }

  const displayValue = slot.always(props.displayValue, {
    defaultProps: { children: formattedValue || placeholder },
    elementType: 'span',
  });
  displayValue.id ??= valueId;

  const trigger = allowTextInput
    ? undefined
    : slot.always(props.trigger, {
        // Native props target the field control, which is a button when the field is not editable.
        defaultProps: { ...(nativeProps.primary as React.ComponentProps<'button'>), type: 'button' },
        elementType: 'button',
      });
  const control = input ?? trigger;
  const mergedControlRef = useMergedRefs<HTMLInputElement & HTMLButtonElement>(
    control?.ref as React.Ref<HTMLInputElement & HTMLButtonElement> | undefined,
    ref as React.Ref<HTMLInputElement & HTMLButtonElement>,
    controlRef,
  );
  if (control) {
    control.ref = mergedControlRef;
  }

  if (trigger) {
    const triggerDescribedBy = trigger['aria-describedby'];
    const triggerInvalid = trigger['aria-invalid'];
    Object.assign(trigger, controlAriaProps);
    trigger['aria-describedby'] = [describedBy, triggerDescribedBy].filter(Boolean).join(' ') || undefined;
    trigger['aria-invalid'] = error ? true : triggerInvalid ?? fieldControlProps['aria-invalid'];
    // aria-required is not supported on buttons; a surrounding Field conveys that a date is required.
    delete trigger['aria-required'];
    // The accessible name combines the field's purpose with the displayed date or placeholder.
    const labelledBy = trigger['aria-labelledby'] ?? (trigger['aria-label'] ? controlId : undefined);
    trigger['aria-labelledby'] = labelledBy ? `${labelledBy} ${displayValue.id}` : undefined;
    trigger.id = controlId;
    trigger.disabled = disabled;
    trigger.onClick = mergeCallbacks(trigger.onClick, event => {
      if (!event.isDefaultPrevented() && !disabled) {
        requestOpen(event, !open, 'trigger');
      }
    });
    // Keep focus in the calendar while the trigger is pressed so the click closes rather than reopens it.
    trigger.onMouseDown = mergeCallbacks(trigger.onMouseDown, event => {
      if (open) {
        event.preventDefault();
      }
    });
    trigger.onKeyDown = mergeCallbacks(trigger.onKeyDown, onControlKeyDown);
    trigger.onBlur = mergeCallbacks(trigger.onBlur, onControlBlur);
  }

  const icon = slot.optional(props.icon, { renderByDefault: true, elementType: 'span' });
  if (icon) {
    if (allowTextInput) {
      // A pointer affordance only: keyboard users open the calendar with Alt + Arrow Down from the input.
      icon.role ??= 'button';
      icon['aria-label'] ??= 'Choose date';
      icon['aria-controls'] = open ? surfaceId : undefined;
      icon['aria-disabled'] = disabled || undefined;
      icon['aria-expanded'] = open;
      icon.onMouseDown = mergeCallbacks(icon.onMouseDown, event => {
        // Keep focus where it is, so pressing the icon neither validates pending text nor dismisses the calendar.
        event.preventDefault();
      });
      icon.onClick = mergeCallbacks(icon.onClick, event => {
        if (!event.isDefaultPrevented() && !disabled) {
          requestOpen(event, !open, 'icon');
        }
      });
    } else {
      icon['aria-hidden'] = true;
    }
  }

  const errorMessage = errorMessageSlot;
  if (errorMessage) {
    errorMessage.id = errorMessageId;
    errorMessage['aria-live'] ??= 'polite';
    errorMessage.children ??= error ? formatErrorMessage({ error, formatDate, maxDate, minDate }) : undefined;
  }

  const onDayPickerHeaderSelect = useEventCallback(() => monthPickerRef.current?.showYearPicker());
  const onMonthPickerHandle = React.useCallback((handle: CalendarMonthHandle | null) => {
    if (handle && showYearPickerOnMount.current) {
      showYearPickerOnMount.current = false;
      handle.showYearPicker();
    }
  }, []);
  const onCalendarViewChange = useEventCallback((_event: DatePickerEvent, data: CalendarViewChangeData) => {
    showYearPickerOnMount.current = data.view === 'month';
  });
  const onDisplayedDateChange = useEventCallback((_event: DatePickerEvent, data: { displayedDate: Date }) => {
    setDisplayedDate(data.displayedDate);
  });
  const onCalendarSelectDate = useEventCallback((event: DatePickerEvent, data: { date: Date }) => {
    if (!isDefaultPrevented(event) && !disabled) {
      dateState.selectDate(event, data.date);
      requestOpen(event, false, 'selection');
    }
  });
  const onCalendarDismiss = useEventCallback((event: DatePickerEvent) => {
    if (!isDefaultPrevented(event)) {
      // Calendar stops propagation; cancelling the key also stops a native dialog or popover ancestor from closing.
      event.preventDefault();
      requestOpen(event, false, 'escape');
    }
  });
  const onSurfaceFocus = useEventCallback(() => {
    focusWithinSurface.current = true;
  });
  const onSurfaceBlur = useEventCallback((event: React.FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget;
    if (isWithin(surfaceRef.current, nextTarget)) {
      return;
    }
    focusWithinSurface.current = false;
    // Focus leaving the window keeps the calendar open.
    if (!nextTarget) {
      return;
    }
    requestOpen(event, false, 'focusOut');
    if (!isWithin(rootRef.current, nextTarget)) {
      dateState.validate(event);
    }
  });
  const onSurfaceKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === Escape && !event.isDefaultPrevented()) {
      event.preventDefault();
      event.stopPropagation();
      requestOpen(event, false, 'escape');
    }
  });

  // Calendar

  const formatters: CalendarFormatters = { ...calendarFormatters, dayPickerHeaderLabel, ...calendarProps.formatters };

  const calendar = slot.always<CalendarProps>(props.calendar, {
    defaultProps: {
      calendarMonthColumns: 3,
      calendarYearColumns: 3,
    },
    elementType: Calendar,
  });
  // showGoToToday alone controls visibility, so styling the button through the calendar slot does not show it.
  if (!showGoToToday) {
    calendar.goToTodayButton = null;
  }

  const dayPickerProps: CalendarDayProps | null | undefined =
    calendarProps.dayPicker === null ? null : slot.resolveShorthand(calendarProps.dayPicker);
  const monthPickerProps: CalendarMonthProps | null | undefined =
    calendarProps.monthPicker === null ? null : slot.resolveShorthand(calendarProps.monthPicker);
  const mergedDayPickerRef = useMergedRefs(dayPickerProps?.imperativeRef, dayPickerRef);
  const mergedMonthPickerRef = useMergedRefs(monthPickerProps?.imperativeRef, monthPickerRef, onMonthPickerHandle);
  // The overlay layout mounts one picker at a time, so the day heading keeps Calendar's switch to the month view.
  const isOverlay = calendarProps.layout === 'overlay' && dayPickerProps !== null && monthPickerProps !== null;

  if (dayPickerProps !== null) {
    calendar.dayPicker = {
      ...(monthPickerProps === null || isOverlay ? undefined : { onHeaderSelect: onDayPickerHeaderSelect }),
      ...dayPickerProps,
      imperativeRef: mergedDayPickerRef,
    };
  }
  if (monthPickerProps !== null) {
    const getMonthCellProps = monthPickerProps?.getCellProps;
    calendar.monthPicker = {
      ...monthPickerProps,
      imperativeRef: mergedMonthPickerRef,
      getCellProps: month => {
        const overrides = getMonthCellProps?.(month);
        const date = setMonth(displayedDate, month.index);
        // Name months with their year, such as "August 2026", rather than an abbreviation.
        return {
          ...overrides,
          root: { 'aria-label': formatters.dateTime({ date, format: 'monthYear' }), ...overrides?.root },
        };
      },
    };
  }

  calendar.formatters = formatters;
  calendar.value = dateState.value;
  calendar.today = today;
  calendar.minDate = minDate;
  calendar.maxDate = maxDate;
  calendar.displayedDate = displayedDate;
  calendar.onDisplayedDateChange = mergeCallbacks(calendar.onDisplayedDateChange, onDisplayedDateChange);
  calendar.onSelectDate = mergeCallbacks(calendar.onSelectDate, onCalendarSelectDate);
  calendar.onDismiss = mergeCallbacks(calendar.onDismiss, onCalendarDismiss);
  calendar.onViewChange = mergeCallbacks(calendar.onViewChange, onCalendarViewChange);

  // Popup surface

  const popupSurface = slot.always(props.popupSurface, {
    defaultProps: {
      'aria-label': formatters.dateTime({ date: displayedDate, format: 'monthYear' }),
      role: 'dialog',
      // Pressing a non-focusable part of the surface focuses the surface instead of the body.
      tabIndex: -1,
    },
    elementType: 'div',
  });
  Object.assign(popupSurface, { popover: 'manual' });
  popupSurface.id = surfaceId;
  popupSurface.ref = useMergedRefs(popupSurface.ref, surfaceRef, containerRef);
  popupSurface.onFocus = mergeCallbacks(popupSurface.onFocus, onSurfaceFocus);
  popupSurface.onBlur = mergeCallbacks(popupSurface.onBlur, onSurfaceBlur);
  popupSurface.onKeyDown = mergeCallbacks(popupSurface.onKeyDown, onSurfaceKeyDown);

  // Declared after the surface handlers, so focus moved while showing the popover reaches them.
  useIsomorphicLayoutEffect(() => {
    const surface = surfaceRef.current;
    if (open && surface && typeof surface.showPopover === 'function' && !surface.matches(':popover-open')) {
      surface.showPopover();
    }
  }, [open]);

  // Root

  const root = slot.always(props.root, { defaultProps: nativeProps.root, elementType: 'div' });
  root.ref = useMergedRefs(root.ref, rootRef, targetRef);
  // Applied after consumer props so reserved state cannot be misrepresented.
  Object.assign(root, {
    'data-open': toDataAttributeValue(open),
    'data-disabled': toDataAttributeValue(disabled),
    'data-invalid': toDataAttributeValue(!!error),
    'data-editable': toDataAttributeValue(allowTextInput),
    'data-placeholder': toDataAttributeValue(!dateState.value),
  });

  return {
    allowTextInput,
    disabled,
    error,
    open,
    required,
    value: dateState.value,
    components: {
      root: 'div',
      input: 'input',
      trigger: 'button',
      displayValue: 'span',
      icon: 'span',
      errorMessage: 'div',
      popupSurface: 'div',
      calendar: Calendar,
    },
    root,
    input,
    trigger,
    displayValue,
    icon,
    errorMessage,
    popupSurface,
    calendar,
  };
};
