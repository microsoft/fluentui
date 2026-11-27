'use client';

import * as React from 'react';
import { ArrowDown, Enter, Escape } from '@fluentui/keyboard-keys';
import { useFieldControlProps_unstable } from '@fluentui/react-field';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import {
  mergeCallbacks,
  slot,
  useControllableState,
  useEventCallback,
  useId,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { resolvePositioningShorthand, usePositioning } from '../../hooks';
import { useLayerOpenState } from '../../hooks/top-layer';
import { toDataAttributeValue } from '../../utils';
import { Calendar } from '../Calendar/Calendar';
import { compareDatePart, focusCalendarGrid, isRestrictedDate } from '../Calendar/utils';
import type { CalendarProps } from '../Calendar/Calendar.types';
import { createDatePickerFormat } from './datePickerFormatting';
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

const getActiveElement = (element: HTMLElement): Element | null => {
  const root = element.getRootNode();
  const ShadowRootConstructor = element.ownerDocument.defaultView?.ShadowRoot;
  return ShadowRootConstructor && root instanceof ShadowRootConstructor
    ? root.activeElement ?? element.ownerDocument.activeElement
    : element.ownerDocument.activeElement;
};

const mergeAriaDescribedBy = (...values: (string | undefined)[]): string | undefined => {
  const ids = new Set(values.flatMap(value => value?.trim().split(/\s+/).filter(Boolean) ?? []));
  return ids.size ? [...ids].join(' ') : undefined;
};

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
  // DatePicker's own props and slots stay out of the DOM; className and style go to the root, everything else to the
  // field control.
  const {
    allowTextInput = false,
    calendar: calendarProp,
    className,
    defaultOpen,
    defaultValue,
    disabled = false,
    displayValue: displayValueProp,
    errorMessage: errorMessageProp,
    formatDate: formatDateProp,
    formatErrorMessage = defaultFormatErrorMessage,
    icon: iconProp,
    input: inputProp,
    locale = 'en-US',
    maxDate,
    minDate,
    onDateChange,
    onOpenChange,
    onValidationResult,
    open: openProp,
    parseDate: parseDateProp,
    placeholder = 'Select a date',
    popupSurface: popupSurfaceProp,
    positioning,
    required: requiredProp,
    root: rootProp,
    showGoToToday = false,
    style,
    today: todayProp,
    trigger: triggerProp,
    value,
    ...nativeProps
  } = props;

  const localeFormat = React.useMemo(() => createDatePickerFormat(locale), [locale]);
  const formatDate = formatDateProp ?? localeFormat.formatDate;
  const parseDate = parseDateProp ?? localeFormat.parseDate;
  const { targetDocument } = useFluent();
  const today = React.useMemo(() => todayProp ?? new Date(), [todayProp]);

  // A Field label's htmlFor would name the trigger button by the label alone, so the button uses aria-labelledby and
  // appends the displayed date.
  const controlProps: Record<string, unknown> & typeof nativeProps = useFieldControlProps_unstable(nativeProps, {
    supportsLabelFor: allowTextInput,
  });
  const required =
    requiredProp === true || controlProps['aria-required'] === true || controlProps['aria-required'] === 'true';
  const controlId = useId('datepicker-', controlProps.id);

  const calendarProps: DatePickerCalendarProps = slot.resolveShorthand(calendarProp) ?? {};
  const restrictedDates = calendarProps.restrictedDates;
  const isDateUnavailable = (date: Date) => isRestrictedDate(date, { minDate, maxDate, restrictedDates });

  const dateState = useDatePickerDateState({
    allowTextInput,
    defaultValue,
    disabled,
    formatDate,
    isDateUnavailable,
    onDateChange,
    onValidationResult,
    parseDate,
    required,
    value,
  });
  const { error } = dateState;

  /**
   * Unavailable dates remain inspectable, so opening does not substitute a different available date for today.
   */
  const getInitialDisplayedDate = (): Date => {
    if (dateState.value) {
      return dateState.value;
    }

    let date = today;
    if (minDate && compareDatePart(date, minDate) < 0) {
      date = minDate;
    } else if (maxDate && compareDatePart(date, maxDate) > 0) {
      date = maxDate;
    }
    return date;
  };

  const [displayedDate, setDisplayedDate] = React.useState(getInitialDisplayedDate);

  const [openState, setOpenState] = useControllableState({
    state: openProp,
    defaultState: defaultOpen,
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

  // A value that changes while the calendar is open, such as a controlled update, shows its month.
  const valueTime = dateState.value?.getTime();
  const [previousValueTime, setPreviousValueTime] = React.useState(valueTime);
  if (!Object.is(previousValueTime, valueTime)) {
    setPreviousValueTime(valueTime);
    if (dateState.value) {
      setDisplayedDate(dateState.value);
    }
  }

  const rootRef = React.useRef<HTMLDivElement>(null);
  const controlRef = React.useRef<HTMLInputElement & HTMLButtonElement>(null);
  const surfaceRef = React.useRef<HTMLDivElement>(null);
  // Set while a request runs, so the blur caused by returning focus to the field does not request a second change.
  const isRequestingOpen = React.useRef(false);
  const wasOpenOnLastEffect = React.useRef(false);
  const focusWithinSurface = React.useRef(false);

  const isWithin = (element: HTMLElement | null, target: EventTarget | null) =>
    !!element && !!target && element.contains(target as Node);

  // Focuses the day picker, otherwise the month picker of a month-only calendar, otherwise the surface.
  const focusCalendar = useEventCallback(() => {
    if (!focusCalendarGrid(surfaceRef.current)) {
      surfaceRef.current?.focus({ preventScroll: true });
    }
  });

  const requestOpen = useEventCallback((event: DatePickerEvent, nextOpen: boolean, reason: OpenChangeReason) => {
    if (isRequestingOpen.current || open === nextOpen || (nextOpen && disabled)) {
      return;
    }
    isRequestingOpen.current = true;

    if (!nextOpen && reason !== 'focusOut' && reason !== 'outsideClick' && focusWithinSurface.current) {
      const surfaceHasFocus = surfaceRef.current && isWithin(surfaceRef.current, getActiveElement(surfaceRef.current));
      focusWithinSurface.current = false;
      if (surfaceHasFocus) {
        // Selection and Escape return focus to the field before the surface unmounts.
        controlRef.current?.focus({ preventScroll: true });
      }
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
        focusCalendar();
      }
      return;
    }

    // A controlled close may remove the focused surface without a blur; restore focus from the surface tracker.
    const root = rootRef.current;
    const activeElement = root ? getActiveElement(root) : targetDocument?.activeElement;
    const shadowRoot = root?.getRootNode();
    const ShadowRootConstructor = root?.ownerDocument.defaultView?.ShadowRoot;
    const focusWasLost =
      !activeElement ||
      activeElement === targetDocument?.body ||
      (!!ShadowRootConstructor && shadowRoot instanceof ShadowRootConstructor && activeElement === shadowRoot.host);
    if (
      focusWithinSurface.current &&
      (focusWasLost || (surfaceRef.current && isWithin(surfaceRef.current, activeElement)))
    ) {
      focusWithinSurface.current = false;
      controlRef.current?.focus({ preventScroll: true });
    }
  }, [focusCalendar, open, targetDocument]);

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
  const surfaceId = useId('datepicker-popup-', slot.resolveShorthand(popupSurfaceProp)?.id);
  const errorMessageSlot = slot.optional(errorMessageProp, { renderByDefault: true, elementType: 'div' });
  const errorMessageId = useId('datepicker-error-', errorMessageSlot?.id);
  const describedBy =
    [controlProps['aria-describedby'], error && errorMessageSlot ? errorMessageId : undefined]
      .filter(Boolean)
      .join(' ') || undefined;

  const controlAriaProps = {
    role: 'combobox',
    'aria-controls': open ? surfaceId : undefined,
    'aria-describedby': describedBy,
    'aria-expanded': open,
    'aria-haspopup': 'dialog' as const,
    'aria-invalid': error ? true : controlProps['aria-invalid'],
    'aria-required': required || undefined,
  };

  const onControlKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLElement>) => {
    if (event.isDefaultPrevented() || disabled) {
      return;
    }

    if (event.key === ArrowDown && event.altKey) {
      event.preventDefault();
      if (open) {
        focusCalendar();
      } else {
        requestOpen(event, true, 'keyboard');
      }
    } else if (event.key === Escape && open) {
      // Keep the Escape that closes the calendar from also dismissing a surrounding dialog or popover.
      event.preventDefault();
      event.stopPropagation();
      requestOpen(event, false, 'keyboard');
    } else if (
      event.key === Enter &&
      allowTextInput &&
      event.currentTarget === controlRef.current &&
      !event.nativeEvent.isComposing
    ) {
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
    ? slot.always(inputProp, {
        defaultProps: {
          ...(controlProps as Omit<React.ComponentProps<'input'>, 'children'>),
          autoComplete: 'off',
          type: 'text',
        },
        elementType: 'input',
      })
    : undefined;
  const displayValue = slot.always(displayValueProp, {
    defaultProps: { children: formattedValue || placeholder },
    elementType: 'span',
  });
  displayValue.id ??= valueId;

  const trigger = allowTextInput
    ? undefined
    : slot.always(triggerProp, {
        // Native props target the field control, which is a button when the field is not editable.
        defaultProps: { ...(controlProps as React.ComponentProps<'button'>), type: 'button' },
        elementType: 'button',
      });
  // Wiring shared by the text input and the trigger button.
  const control = (input ?? trigger)! as React.InputHTMLAttributes<HTMLElement> & {
    ref?: React.Ref<HTMLInputElement & HTMLButtonElement>;
  };
  const controlDescribedBy = control['aria-describedby'];
  const controlInvalid = control['aria-invalid'];
  Object.assign(control, controlAriaProps);
  control['aria-describedby'] = mergeAriaDescribedBy(describedBy, controlDescribedBy);
  control['aria-invalid'] = error ? true : controlInvalid ?? controlProps['aria-invalid'];
  control.id = controlId;
  control.disabled = disabled;
  control.ref = useMergedRefs(control.ref, ref as React.Ref<HTMLInputElement & HTMLButtonElement>, controlRef);
  control.onKeyDown = mergeCallbacks(control.onKeyDown, onControlKeyDown);
  control.onBlur = mergeCallbacks(control.onBlur, onControlBlur);

  if (input) {
    input['aria-autocomplete'] = 'none';
    input.placeholder = placeholder;
    input.value = dateState.text;
    input.onChange = mergeCallbacks(input.onChange, event => {
      dateState.setText(event.target.value);
    });
  } else if (trigger) {
    // The accessible name combines the field's purpose with the displayed date or placeholder.
    const labelledBy = trigger['aria-labelledby'] ?? (trigger['aria-label'] ? controlId : undefined);
    trigger['aria-labelledby'] = labelledBy ? `${labelledBy} ${displayValue.id}` : undefined;
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
  }

  const icon = slot.optional(iconProp, {
    renderByDefault: true,
    defaultProps: { type: 'button', 'aria-label': 'Open calendar' },
    elementType: 'button',
  });
  if (icon) {
    icon.disabled = disabled || icon.disabled;
    icon.tabIndex = allowTextInput && !icon.disabled ? 0 : -1;
    icon['aria-controls'] = open ? surfaceId : undefined;
    icon['aria-disabled'] = icon.disabled || undefined;
    icon['aria-expanded'] = open;
    icon.onMouseDown = mergeCallbacks(icon.onMouseDown, event => {
      // Keep focus where it is, so pressing the icon neither validates pending text nor dismisses the calendar.
      event.preventDefault();
    });
    icon.onClick = mergeCallbacks(icon.onClick, event => {
      if (!event.isDefaultPrevented() && !icon.disabled) {
        requestOpen(event, !open, 'icon');
      }
    });
    icon.onBlur = mergeCallbacks(icon.onBlur, onControlBlur);
    icon.onKeyDown = mergeCallbacks(icon.onKeyDown, onControlKeyDown);
  }

  const errorMessage = errorMessageSlot;
  if (errorMessage) {
    errorMessage.id = errorMessageId;
    errorMessage['aria-live'] ??= 'polite';
    errorMessage.children ??= error ? formatErrorMessage({ error, formatDate, maxDate, minDate }) : undefined;
  }

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

  const calendar = slot.always<CalendarProps>(calendarProp, {
    defaultProps: {
      calendarMonthColumns: 3,
      calendarYearColumns: 3,
      allFocusable: true,
    },
    elementType: Calendar,
  });
  // The day heading opens the year-range grid.
  calendar.dayHeadingView ??= 'year';
  // showGoToToday alone controls visibility, so styling the button through the calendar slot does not show it.
  if (!showGoToToday) {
    calendar.goToTodayButton = null;
  }

  const formatDateTime = calendarProps.formatters?.dateTime ?? localeFormat.dateTime;
  calendar.formatters = { ...calendarProps.formatters, dateTime: formatDateTime };

  calendar.value = dateState.value;
  calendar.today = today;
  calendar.minDate = minDate;
  calendar.maxDate = maxDate;
  calendar.displayedDate = displayedDate;
  calendar.onDisplayedDateChange = mergeCallbacks(calendar.onDisplayedDateChange, onDisplayedDateChange);
  calendar.onSelectDate = mergeCallbacks(calendar.onSelectDate, onCalendarSelectDate);
  calendar.onDismiss = mergeCallbacks(calendar.onDismiss, onCalendarDismiss);

  // Popup surface

  const popupSurface = slot.always(popupSurfaceProp, {
    defaultProps: {
      'aria-label': formatDateTime({ date: displayedDate, format: 'monthYear' }),
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
  // `manual` popovers only report `native-open`/`native-close` (something else called showPopover/hidePopover),
  // which map to 'outsideClick' so the reason union stays unchanged.
  useLayerOpenState(surfaceRef, {
    open,
    mode: 'manual',
    onOpenChange: (nextOpen, { event, type }) =>
      requestOpen(event as unknown as DatePickerEvent, nextOpen, type === 'escape' ? 'escape' : 'outsideClick'),
  });

  // Root

  const root = slot.always(rootProp, { defaultProps: { className, style }, elementType: 'div' });
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
      icon: 'button',
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
