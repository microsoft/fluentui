'use client';

import * as React from 'react';
import { Calendar, CalendarDay, CalendarMonth } from '@fluentui/react-calendar-preview';
import type { CalendarDayHandle, CalendarMonthHandle } from '@fluentui/react-calendar-preview';
import { useFieldContext_unstable } from '@fluentui/react-field';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { Input } from '@fluentui/react-input';
import type { InputProps } from '@fluentui/react-input';
import { resolvePositioningShorthand, usePositioning } from '@fluentui/react-positioning';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useFocusFinders, useModalAttributes } from '@fluentui/react-tabster';
import {
  slot,
  useEventCallback,
  useId,
  useIsSSR,
  useMergedRefs,
  useOnClickOutside,
  useOnScrollOutside,
} from '@fluentui/react-utilities';
import { useDatePickerBase_unstable } from './useDatePickerBase';
import type { DatePickerProps, DatePickerState } from './DatePicker.types';

/** Manages selection, editable text, popup lifecycle, focus, and composed slot events. */
export const useDatePicker_unstable = (props: DatePickerProps, ref: React.Ref<HTMLInputElement>): DatePickerState => {
  const dateState = useDatePickerBase_unstable(props);
  const { open, requestOpen, today, required } = dateState;
  const {
    value,
    defaultValue,
    allowTextInput = false,
    disabled = false,
    required: requiredProp,
    formatDate,
    parseDate,
    onDateChange,
    onValidationResult,
    open: openProp,
    defaultOpen,
    onOpenChange,
    openOnClick = true,
    openOnFocus = false,
    today: todayProp,
    minDate,
    maxDate,
    inlinePopup = false,
    mountNode,
    positioning,
    calendar: calendarProp,
    popupSurface: popupSurfaceProp,
    ...inputProps
  } = props;
  const fieldContext = useFieldContext_unstable();
  const isSSR = useIsSSR();
  const popupOpen = open && (inlinePopup || !isSSR);
  const { targetDocument } = useFluent_unstable();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const surfaceRef = React.useRef<HTMLDivElement>(null);
  const dayRef = React.useRef<CalendarDayHandle>(null);
  const monthRef = React.useRef<CalendarMonthHandle>(null);
  const suppressFocusOpening = React.useRef(false);
  const restoreFocus = React.useRef<boolean | undefined>(undefined);
  const focusWithinPopup = React.useRef(false);
  const skipBlurValidation = React.useRef(false);
  const lastCloseEvent = React.useRef<Event | undefined>(undefined);
  const outsidePointerTarget = React.useRef<EventTarget | null>(null);
  const inputId = useId('datePicker-input', props.id ?? props.input?.id ?? fieldContext?.generatedControlId);
  const popupId = useId('datePicker-popup', slot.resolveShorthand(popupSurfaceProp)?.id);
  const iconId = useId('datePicker-icon');
  const { targetRef, containerRef } = usePositioning({
    position: 'below',
    align: 'start',
    ...resolvePositioningShorthand(positioning),
  });
  const { findFirstFocusable } = useFocusFinders();
  const { modalAttributes } = useModalAttributes({ trapFocus: true, alwaysFocusable: true, legacyTrapFocus: true });
  const calendar = slot.always<React.ComponentProps<typeof Calendar>>(calendarProp, { elementType: Calendar });
  const dismiss = useEventCallback((event: React.SyntheticEvent | Event, returnFocus: boolean) => {
    const nativeEvent = 'nativeEvent' in event ? event.nativeEvent : event;
    if (!open || lastCloseEvent.current === nativeEvent) {
      return;
    }
    lastCloseEvent.current = nativeEvent;
    restoreFocus.current = returnFocus;
    dateState.validate(event);
    requestOpen(event, false, 'dismiss');
  });
  const activate = useEventCallback((event: React.SyntheticEvent, reason: 'input' | 'icon' | 'focus') => {
    if (event.defaultPrevented || disabled) {
      return;
    }
    if (open) {
      if (allowTextInput) {
        dismiss(event, true);
      }
    } else {
      requestOpen(event, true, reason);
    }
  });

  const input = slot.always(props.input, { elementType: 'input' });
  input.ref = useMergedRefs(input.ref, ref, inputRef);
  const inputRoot = slot.always(props.root, { elementType: 'span' });
  inputRoot.ref = useMergedRefs(inputRoot.ref, targetRef);
  const contentAfter = slot.always(props.contentAfter ?? {}, {
    elementType: 'span',
    defaultProps: { children: <CalendarMonthRegular /> },
  });
  const consumerIconClick = contentAfter.onClick;
  contentAfter.onClick = useEventCallback(event => {
    consumerIconClick?.(event);
    if (!event.defaultPrevented) {
      activate(event, 'icon');
      event.preventDefault();
    }
    event.stopPropagation();
  });
  contentAfter.role = 'button';
  contentAfter.tabIndex = undefined;
  const inputLabel = input['aria-label'] ?? props['aria-label'];
  const inputLabelledBy = input['aria-labelledby'] ?? props['aria-labelledby'] ?? fieldContext?.labelId;
  const iconLabel = contentAfter['aria-label'] ?? 'Open calendar';
  contentAfter.id ??= iconId;
  contentAfter['aria-label'] = inputLabel && !inputLabelledBy ? `${inputLabel} ${iconLabel}` : iconLabel;
  contentAfter['aria-labelledby'] ??= inputLabelledBy ? `${inputLabelledBy} ${contentAfter.id}` : undefined;
  contentAfter['aria-expanded'] = open;
  contentAfter['aria-disabled'] = disabled || undefined;
  contentAfter['aria-controls'] = open ? popupId : undefined;

  const root = slot.always<InputProps>(inputProps, { elementType: Input });
  root.appearance = props.appearance ?? 'outline';
  root.size = props.size ?? fieldContext?.size ?? 'medium';
  root.root = inputRoot;
  root.input = input;
  root.contentAfter = contentAfter;
  root.required = required;
  root.disabled = disabled;
  input.required = required;
  input.disabled = disabled;
  root.id = inputId;
  root.value = dateState.text;
  root.defaultValue = undefined;
  root.type = input.type = 'text';
  root.readOnly = input.readOnly = !allowTextInput;
  input.value = dateState.text;
  input.defaultValue = undefined;
  input.role = 'combobox';
  input['aria-haspopup'] = 'dialog';
  input['aria-expanded'] = open;
  input['aria-controls'] = open ? popupId : undefined;

  const consumerChange = root.onChange;
  const consumerNativeChange = input.onChange;
  // Input routes its handler through input.onChange unless that slot supplies one.
  input.onChange = undefined;
  root.onChange = useEventCallback((event, data) => {
    consumerNativeChange?.(event);
    consumerChange?.(event, data);
    if (!event.defaultPrevented && allowTextInput && !disabled) {
      dateState.setText(data.value);
      requestOpen(event, false, 'input');
    }
  });
  const consumerClick = input.onClick ?? root.onClick;
  input.onClick = useEventCallback(event => {
    consumerClick?.(event);
    if (open || openOnClick) {
      activate(event, 'input');
    }
  });
  const consumerFocus = input.onFocus ?? root.onFocus;
  input.onFocus = useEventCallback(event => {
    consumerFocus?.(event);
    skipBlurValidation.current = false;
    if (suppressFocusOpening.current) {
      suppressFocusOpening.current = false;
    } else if (openOnFocus && !allowTextInput) {
      activate(event, 'focus');
    }
  });
  const consumerBlur = input.onBlur ?? root.onBlur;
  input.onBlur = useEventCallback(event => {
    consumerBlur?.(event);
    if (!event.defaultPrevented && !skipBlurValidation.current) {
      dateState.validate(event);
    }
    skipBlurValidation.current = false;
  });
  const consumerKeyDown = input.onKeyDown ?? root.onKeyDown;
  input.onKeyDown = useEventCallback(event => {
    consumerKeyDown?.(event);
    if (event.defaultPrevented || disabled) {
      return;
    }
    if (event.key === 'Enter') {
      if (!open) {
        dateState.validate(event);
        skipBlurValidation.current = true;
        requestOpen(event, true, 'keyboard');
      } else if (allowTextInput) {
        dismiss(event, true);
      }
    } else if (event.key === 'ArrowDown') {
      requestOpen(event, true, 'keyboard');
    } else if (event.key === 'Escape' && open) {
      dismiss(event, true);
    } else {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  });

  const consumerSelect = calendar.onSelectDate;
  calendar.onSelectDate = useEventCallback((event, data) => {
    consumerSelect?.(event, data);
    if (!event.defaultPrevented && !disabled) {
      dateState.selectDate(event, data.date, data.selectedDateRange);
      restoreFocus.current = true;
      requestOpen(event, false, 'selection');
    }
  });
  const consumerDismiss = calendar.onDismiss;
  calendar.onDismiss = useEventCallback((event, data) => {
    consumerDismiss?.(event, data);
    if (!event.defaultPrevented) {
      dismiss(event, true);
      event.preventDefault();
    }
  });
  calendar.value = dateState.value && Number.isFinite(dateState.value.getTime()) ? dateState.value : null;
  if (dateState.value) {
    calendar.defaultDisplayedDate = dateState.value;
  }
  calendar.today = today;
  calendar.minDate = minDate;
  calendar.maxDate = maxDate;
  const dayPicker = slot.optional(calendar.dayPicker, { elementType: CalendarDay, renderByDefault: true });
  const monthPicker = slot.optional(calendar.monthPicker, { elementType: CalendarMonth, renderByDefault: true });
  const mergedDayRef = useMergedRefs(dayPicker?.ref, dayRef);
  const mergedMonthRef = useMergedRefs(monthPicker?.ref, monthRef);
  if (dayPicker) {
    dayPicker.ref = mergedDayRef;
    calendar.dayPicker = dayPicker;
  }
  if (monthPicker) {
    monthPicker.ref = mergedMonthRef;
    calendar.monthPicker = monthPicker;
  }

  const popupSurface = slot.optional(popupSurfaceProp, {
    elementType: 'div',
    renderByDefault: true,
    defaultProps: { 'aria-label': 'Calendar', tabIndex: -1 },
  });
  const mergedSurfaceRef = useMergedRefs(popupSurface?.ref, surfaceRef, containerRef);
  if (popupSurface) {
    popupSurface.ref = mergedSurfaceRef;
    popupSurface.id = popupId;
    popupSurface.role = 'dialog';
    popupSurface['aria-modal'] = true;
    Object.assign(popupSurface, modalAttributes);
  }
  const consumerSurfaceKeyDown = popupSurface?.onKeyDown;
  const consumerSurfaceFocus = popupSurface?.onFocusCapture;
  const consumerSurfaceBlur = popupSurface?.onBlurCapture;
  const onSurfaceFocus = useEventCallback((event: React.FocusEvent<HTMLDivElement>) => {
    consumerSurfaceFocus?.(event);
    focusWithinPopup.current = true;
  });
  const onSurfaceBlur = useEventCallback((event: React.FocusEvent<HTMLDivElement>) => {
    consumerSurfaceBlur?.(event);
    focusWithinPopup.current = event.currentTarget.contains(event.relatedTarget);
  });
  const onSurfaceKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    consumerSurfaceKeyDown?.(event);
    if (!event.defaultPrevented && event.key === 'Escape') {
      dismiss(event, true);
      event.preventDefault();
      event.stopPropagation();
    }
  });
  if (popupSurface) {
    popupSurface.onKeyDown = onSurfaceKeyDown;
    popupSurface.onFocusCapture = onSurfaceFocus;
    popupSurface.onBlurCapture = onSurfaceBlur;
  }

  const outside = useEventCallback((event: Event) => {
    if (outsidePointerTarget.current === event.target) {
      if (event.type === 'click') {
        outsidePointerTarget.current = null;
      }
      return;
    }
    dismiss(event, false);
  });
  useOnClickOutside({
    element: targetDocument,
    refs: [targetRef, surfaceRef],
    disabled: !popupOpen,
    callback: outside,
  });
  useOnScrollOutside({
    element: targetDocument,
    refs: [targetRef, surfaceRef],
    disabled: !popupOpen,
    callback: event => dismiss(event, !!surfaceRef.current?.contains(targetDocument?.activeElement ?? null)),
  });
  const onOutsidePointer = useEventCallback((event: PointerEvent) => {
    outsidePointerTarget.current = null;
    if (!event.composedPath().includes(targetRef.current!) && !event.composedPath().includes(surfaceRef.current!)) {
      skipBlurValidation.current = targetDocument?.activeElement === inputRef.current;
      dismiss(event, false);
      outsidePointerTarget.current = event.target;
    }
  });
  const onOutsideScroll = useEventCallback((event: Event) => {
    if (!event.composedPath().includes(targetRef.current!) && !event.composedPath().includes(surfaceRef.current!)) {
      dismiss(event, !!surfaceRef.current?.contains(targetDocument?.activeElement ?? null));
    }
  });
  React.useEffect(() => {
    if (!popupOpen) {
      return;
    }
    targetDocument?.addEventListener('pointerdown', onOutsidePointer, true);
    targetDocument?.addEventListener('scroll', onOutsideScroll, true);
    return () => {
      targetDocument?.removeEventListener('pointerdown', onOutsidePointer, true);
      targetDocument?.removeEventListener('scroll', onOutsideScroll, true);
    };
  }, [popupOpen, targetDocument, onOutsidePointer, onOutsideScroll]);

  const wasOpen = React.useRef(false);
  React.useEffect(() => {
    if (popupOpen && !wasOpen.current) {
      dayRef.current?.focus({ preventScroll: true });
      if (!surfaceRef.current?.contains(targetDocument?.activeElement ?? null)) {
        monthRef.current?.focus({ preventScroll: true });
      }
      if (!surfaceRef.current?.contains(targetDocument?.activeElement ?? null)) {
        (findFirstFocusable(surfaceRef.current) ?? surfaceRef.current)?.focus({ preventScroll: true });
      }
      focusWithinPopup.current = !!surfaceRef.current?.contains(targetDocument?.activeElement ?? null);
    } else if (!popupOpen && wasOpen.current && !disabled && (restoreFocus.current ?? focusWithinPopup.current)) {
      if (inputRef.current && targetDocument?.activeElement !== inputRef.current) {
        suppressFocusOpening.current = true;
        inputRef.current.focus({ preventScroll: true });
      }
    }
    wasOpen.current = popupOpen;
    restoreFocus.current = undefined;
  }, [popupOpen, disabled, targetDocument, findFirstFocusable]);

  return {
    components: { root: Input, calendar: Calendar, popupSurface: 'div' },
    root,
    calendar,
    popupSurface: popupOpen ? popupSurface : undefined,
    open,
    allowTextInput,
    disabled,
    inlinePopup,
    mountNode,
  };
};
