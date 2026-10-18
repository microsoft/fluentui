'use client';

/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
import { useDatePickerBase_unstable } from '@fluentui/react-datepicker-preview';
import { useFieldContext_unstable } from '@fluentui/react-field';
import { slot, assertSlots, useEventCallback, useId, useMergedRefs } from '@fluentui/react-utilities';
import { Input } from '../Input';
import type { InputProps } from '../Input';
import { Calendar, CalendarDay, CalendarMonth } from '../Calendar';
import type { CalendarDayHandle, CalendarMonthHandle, CalendarProps } from '../Calendar';
import { usePopover } from '../Popover/usePopover';
import { toDataAttributeValue } from '../../utils';
import type { DatePickerProps, DatePickerSlots, DatePickerState } from './DatePicker.types';

/** Reuse date state and native popup behavior without styled components or a focus runtime. */
export const useDatePicker = (props: DatePickerProps, ref: React.Ref<HTMLInputElement>): DatePickerState => {
  const dateState = useDatePickerBase_unstable({ ...props, positioning: undefined, popupSurface: undefined });
  const { open, requestOpen, required, today } = dateState;
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
    today: todayProp,
    minDate,
    maxDate,
    calendar: calendarProp,
    trigger: triggerProp,
    popupSurface: surfaceProp,
    positioning,
    openOnClick = true,
    openOnFocus = false,
    ...inputProps
  } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dayRef = React.useRef<CalendarDayHandle>(null);
  const monthRef = React.useRef<CalendarMonthHandle>(null);
  const suppressFocusOpening = React.useRef(false);
  const popupId = useId('datepicker-popup-', slot.resolveShorthand(surfaceProp)?.id);
  const field = useFieldContext_unstable();
  const dismiss = useEventCallback((event: React.SyntheticEvent | Event) => {
    if (!open || event.defaultPrevented) {
      return;
    }
    suppressFocusOpening.current = true;
    dateState.validate(event);
    requestOpen(event, false, 'dismiss');
  });
  const popup = usePopover({
    children: <React.Fragment />,
    open,
    trapFocus: true,
    id: popupId,
    positioning: positioning ?? 'below-start',
    onOpenChange: (event, data) => {
      if (!data.open) {
        dismiss(event);
      }
    },
  });

  const input = slot.always(props.input, { elementType: 'input' });
  input.ref = useMergedRefs(input.ref, ref, inputRef, popup.triggerRef);
  const inputRoot = slot.always(props.root, { elementType: 'span' });
  inputRoot.ref = useMergedRefs(inputRoot.ref, popup.positioning.targetRef);
  const root = slot.always<InputProps>(inputProps, { elementType: Input });
  root.root = inputRoot;
  root.input = input;
  root.disabled = input.disabled = disabled;
  root.required = input.required = required;
  root.value = input.value = dateState.text;
  root.defaultValue = input.defaultValue = undefined;
  root.type = input.type = 'text';
  root.readOnly = input.readOnly = !allowTextInput;
  input.role = 'combobox';
  input['aria-haspopup'] = 'dialog';
  input['aria-expanded'] = open;
  input['aria-controls'] = open ? popupId : undefined;

  const activate = useEventCallback((event: React.SyntheticEvent, reason: 'input' | 'icon' | 'focus') => {
    if (!event.defaultPrevented && !disabled) {
      if (!open) {
        requestOpen(event, true, reason);
      } else if (allowTextInput) {
        dismiss(event);
      }
    }
  });
  const consumerChange = root.onChange;
  const consumerNativeChange = input.onChange;
  input.onChange = undefined;
  root.onChange = useEventCallback((event, data) => {
    consumerNativeChange?.(event);
    consumerChange?.(event, data);
    if (!event.defaultPrevented && !disabled) {
      dateState.setText(data.value);
      requestOpen(event, false, 'input');
    }
  });
  const consumerClick = input.onClick ?? root.onClick;
  input.onClick = useEventCallback(event => {
    consumerClick?.(event);
    if (openOnClick) {
      activate(event, 'input');
    }
  });
  const consumerFocus = input.onFocus ?? root.onFocus;
  input.onFocus = useEventCallback(event => {
    consumerFocus?.(event);
    if (suppressFocusOpening.current) {
      suppressFocusOpening.current = false;
    } else if (openOnFocus && !allowTextInput) {
      activate(event, 'focus');
    }
  });
  const consumerBlur = input.onBlur ?? root.onBlur;
  input.onBlur = useEventCallback(event => {
    consumerBlur?.(event);
    if (!event.defaultPrevented && !open) {
      dateState.validate(event);
    }
  });
  const consumerKeyDown = input.onKeyDown ?? root.onKeyDown;
  input.onKeyDown = useEventCallback(event => {
    consumerKeyDown?.(event);
    if (event.defaultPrevented || disabled) {
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'Enter') {
      if (!open) {
        dateState.validate(event);
        requestOpen(event, true, 'keyboard');
      }
    } else if (event.key === 'Escape' && open) {
      dismiss(event);
    } else {
      return;
    }
    event.preventDefault();
  });

  const trigger = slot.always(triggerProp, {
    elementType: 'button',
    defaultProps: { 'aria-label': 'Open calendar', tabIndex: -1 },
  });
  trigger.type = 'button';
  trigger.disabled = disabled;
  trigger['aria-haspopup'] = 'dialog';
  trigger['aria-expanded'] = open;
  trigger['aria-controls'] = open ? popupId : undefined;
  const inputLabel = input['aria-label'] ?? props['aria-label'];
  const labelId = input['aria-labelledby'] ?? props['aria-labelledby'] ?? field?.labelId;
  const triggerId = useId('datepicker-trigger-', trigger.id);
  trigger.id = triggerId;
  trigger['aria-label'] = inputLabel && !labelId ? `${inputLabel} ${trigger['aria-label']}` : trigger['aria-label'];
  trigger['aria-labelledby'] ??= labelId ? `${labelId} ${triggerId}` : undefined;
  const consumerTriggerClick = trigger.onClick;
  trigger.onClick = useEventCallback(event => {
    consumerTriggerClick?.(event);
    activate(event, 'icon');
    event.stopPropagation();
  });

  const calendar = slot.always<CalendarProps>(calendarProp, { elementType: Calendar });
  calendar.value = dateState.value && Number.isFinite(dateState.value.getTime()) ? dateState.value : null;
  calendar.today = today;
  calendar.minDate = minDate;
  calendar.maxDate = maxDate;
  const consumerSelect = calendar.onSelectDate;
  calendar.onSelectDate = useEventCallback((event, data) => {
    consumerSelect?.(event, data);
    if (!event.defaultPrevented && !disabled) {
      dateState.selectDate(event, data.date, data.selectedDateRange);
      suppressFocusOpening.current = true;
      requestOpen(event, false, 'selection');
    }
  });
  const consumerDismiss = calendar.onDismiss;
  calendar.onDismiss = useEventCallback((event, data) => {
    consumerDismiss?.(event, data);
    dismiss(event);
    event.preventDefault();
  });
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

  const popupSurface = slot.always(surfaceProp, {
    elementType: 'dialog',
    defaultProps: { 'aria-label': 'Calendar', tabIndex: -1 },
  });
  popupSurface.ref = useMergedRefs(popupSurface.ref, popup.contentRef, popup.positioning.containerRef);
  popupSurface.id = popupId;
  popupSurface.open = undefined;
  popupSurface.role = 'dialog';
  popupSurface['aria-modal'] = true;
  const consumerCancel = popupSurface.onCancel;
  popupSurface.onCancel = useEventCallback(event => {
    consumerCancel?.(event);
    dismiss(event);
    // Keep a rejected controlled close request open.
    event.preventDefault();
  });
  const consumerSurfaceClick = popupSurface.onClick;
  popupSurface.onClick = useEventCallback(event => {
    consumerSurfaceClick?.(event);
    if (event.target === event.currentTarget) {
      const bounds = event.currentTarget.getBoundingClientRect();
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      ) {
        dismiss(event);
      }
    }
  });

  React.useEffect(() => {
    if (open) {
      if (dayRef.current) {
        dayRef.current.focus({ preventScroll: true });
      } else if (monthRef.current) {
        monthRef.current.focus({ preventScroll: true });
      }
    } else {
      suppressFocusOpening.current = false;
    }
  }, [open]);

  const invalid = input['aria-invalid'] ?? props['aria-invalid'] ?? field?.validationState === 'error';
  const state: DatePickerState = {
    components: { root: Input, calendar: Calendar, trigger: 'button', popupSurface: 'dialog' },
    root: {
      ...root,
      root: {
        ...inputRoot,
        'data-open': toDataAttributeValue(open),
        'data-disabled': toDataAttributeValue(disabled),
        'data-invalid': toDataAttributeValue(invalid !== false && invalid !== 'false' && invalid !== undefined),
      },
    },
    calendar,
    trigger,
    popupSurface,
    open,
    renderSurface: popup.shouldRenderSurface,
  };
  assertSlots<DatePickerSlots>(state);
  const contentAfter = slot.always(props.contentAfter ?? {}, { elementType: 'span' });
  contentAfter.children = (
    <>
      {contentAfter.children}
      <state.trigger />
    </>
  );
  state.root.contentAfter = contentAfter;
  return state;
};
