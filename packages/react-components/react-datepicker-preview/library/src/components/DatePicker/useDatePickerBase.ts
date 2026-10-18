'use client';

import * as React from 'react';
import { useFieldContext_unstable } from '@fluentui/react-field';
import { slot, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { useDatePickerDateState } from './useDatePickerDateState';
import type { DatePickerBaseProps, DatePickerBaseState, DatePickerOpenChangeData } from './DatePicker.types';

/** Owns date input and popup requests without positioning, visual components, or a focus runtime. */
export const useDatePickerBase_unstable = (props: DatePickerBaseProps): DatePickerBaseState => {
  const required = useFieldContext_unstable()?.required ?? props.required;
  const today = React.useMemo(() => props.today ?? new Date(), [props.today]);
  const calendar = slot.resolveShorthand(props.calendar);
  const [openState, setOpen] = useControllableState({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false,
  });
  const open = openState && !props.disabled;
  const lastOpenEvent = React.useRef<Event | undefined>(undefined);
  const dateState = useDatePickerDateState({
    ...props,
    required,
    isDateUnavailable: date => {
      // Compare local calendar parts, never timestamps or UTC-normalized dates.
      const datePart = (candidate: Date) =>
        candidate.getFullYear() * 10000 + candidate.getMonth() * 100 + candidate.getDate();
      const part = datePart(date);
      return (
        (!!props.minDate && part < datePart(props.minDate)) ||
        (!!props.maxDate && part > datePart(props.maxDate)) ||
        !!calendar?.restrictedDates?.some(restricted => datePart(restricted) === part)
      );
    },
  });
  const requestOpen = useEventCallback(
    (event: React.SyntheticEvent | Event, nextOpen: boolean, reason: DatePickerOpenChangeData['reason']) => {
      const nativeEvent = 'nativeEvent' in event ? event.nativeEvent : event;
      if (props.disabled || nextOpen === open || lastOpenEvent.current === nativeEvent) {
        return;
      }
      lastOpenEvent.current = nativeEvent;
      setOpen(nextOpen);
      props.onOpenChange?.(event, { type: event.type, event, open: nextOpen, reason });
    },
  );
  return { ...dateState, open, requestOpen, today, required };
};
