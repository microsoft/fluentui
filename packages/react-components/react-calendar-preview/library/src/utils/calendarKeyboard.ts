import type * as React from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from '@fluentui/keyboard-keys';
import { getRTLSafeKey, isHTMLElement } from '@fluentui/react-utilities';

export const CALENDAR_GRID_COLUMNS = 4;

// The grid supplies the focused date while Calendar retains ownership of paging and consumer cancellation.
const navigationDates = new WeakMap<Event, Date>();
const capturedArrows = new WeakSet<Event>();

export const setCalendarNavigationDate = (event: Event, date: Date): void => {
  navigationDates.set(event, date);
};

export const getCalendarNavigationDate = (event: Event): Date | undefined => {
  const date = navigationDates.get(event);
  navigationDates.delete(event);
  return date;
};

export const isCalendarKeyboardEditable = (target: EventTarget | null): boolean =>
  isHTMLElement(target) &&
  !!target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])');

export const isCalendarArrowKey = (key: string): boolean =>
  key === ArrowDown || key === ArrowLeft || key === ArrowRight || key === ArrowUp;

export const isCalendarGridCellEvent = (event: React.KeyboardEvent<HTMLElement>): boolean => {
  const grid = event.currentTarget.closest('[role="grid"]');
  return (
    !!grid &&
    isHTMLElement(event.target) &&
    !isCalendarKeyboardEditable(event.target) &&
    event.target.closest('[role="gridcell"]') === event.currentTarget &&
    event.target.closest('[role="grid"], [focusgroup]') === grid
  );
};

export const isCalendarGridArrow = (event: React.KeyboardEvent<HTMLElement>): boolean =>
  isCalendarArrowKey(event.key) &&
  !event.altKey &&
  !event.ctrlKey &&
  !event.metaKey &&
  !event.shiftKey &&
  isCalendarGridCellEvent(event);

export const getCalendarGridKeyDownHandlers = <T extends HTMLElement>(
  onKeyDown: React.KeyboardEventHandler<T>,
  onKeyDownCapture: React.KeyboardEventHandler<T> | undefined,
  ownsArrow: (event: React.KeyboardEvent<T>) => boolean,
): Required<Pick<React.DOMAttributes<T>, 'onKeyDown' | 'onKeyDownCapture'>> => ({
  onKeyDownCapture: event => {
    onKeyDownCapture?.(event);
    if (event.isPropagationStopped() || !ownsArrow(event)) {
      return;
    }

    // Native grid owners bubble before React; dispatch here and keep ownership across rerenders.
    capturedArrows.add(event.nativeEvent);
    onKeyDown(event);
    event.preventDefault();
  },
  onKeyDown: event => {
    if (!capturedArrows.delete(event.nativeEvent)) {
      onKeyDown(event);
    }
  },
});

export const handleCalendarGridKeyDown = (
  event: React.KeyboardEvent<HTMLButtonElement>,
  dir: 'ltr' | 'rtl',
  allFocusable: boolean,
): void => {
  const { currentTarget } = event;
  if (event.isDefaultPrevented() || !isCalendarGridArrow(event)) {
    return;
  }

  let step: number;
  if (event.key === ArrowDown) {
    step = CALENDAR_GRID_COLUMNS;
  } else if (event.key === ArrowUp) {
    step = -CALENDAR_GRID_COLUMNS;
  } else if (event.key === getRTLSafeKey(ArrowRight, dir)) {
    step = 1;
  } else if (event.key === getRTLSafeKey(ArrowLeft, dir)) {
    step = -1;
  } else {
    return;
  }
  const grid = currentTarget.closest('[role="grid"]');
  if (!grid) {
    return;
  }

  const cells = Array.from(grid.querySelectorAll<HTMLElement>('[role="gridcell"]')).filter(
    cell => cell.closest('[role="grid"]') === grid,
  );
  const currentIndex = cells.indexOf(currentTarget);
  if (currentIndex < 0) {
    return;
  }

  // Own boundary keys too so a native focusgroup cannot fall back to linear movement.
  event.preventDefault();
  const currentRow = Math.floor(currentIndex / CALENDAR_GRID_COLUMNS);
  for (let index = currentIndex + step; index >= 0 && index < cells.length; index += step) {
    if (Math.abs(step) === 1 && Math.floor(index / CALENDAR_GRID_COLUMNS) !== currentRow) {
      break;
    }
    const cell = cells[index];
    if (!cell.matches(':disabled') && (allFocusable || cell.getAttribute('aria-disabled') !== 'true')) {
      cell.focus();
      break;
    }
  }
};
