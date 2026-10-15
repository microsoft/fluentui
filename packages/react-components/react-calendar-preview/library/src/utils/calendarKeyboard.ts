import type * as React from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from '@fluentui/keyboard-keys';
import { getRTLSafeKey, isHTMLElement } from '@fluentui/react-utilities';

export const CALENDAR_GRID_COLUMNS = 4;

// The grid supplies the focused date while Calendar retains ownership of paging and consumer cancellation.
const navigationDates = new WeakMap<Event, Date>();
const capturedArrows = new WeakSet<Event>();
const legacyHandledArrows = new WeakSet<Event>();
const reactCaptureEvents = new WeakSet<Event>();

export const setCalendarNavigationDate = (event: Event, date: Date): void => {
  navigationDates.set(event, date);
};

export const getCalendarNavigationDate = (event: Event): Date | undefined => {
  const date = navigationDates.get(event);
  navigationDates.delete(event);
  return date;
};

export const isCalendarKeyboardEditable = (target: EventTarget | null): boolean => {
  if (!isHTMLElement(target)) {
    return false;
  }

  if (target.closest('input, textarea, select')) {
    return true;
  }

  const contentEditableBoundary = target.closest('[contenteditable]');
  return contentEditableBoundary?.getAttribute('contenteditable') !== 'false' && !!contentEditableBoundary;
};

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

const withCurrentTarget = <T extends HTMLElement>(
  event: React.KeyboardEvent<HTMLElement>,
  currentTarget: T,
): React.KeyboardEvent<T> =>
  new Proxy(event, {
    get: (target, property) => (property === 'currentTarget' ? currentTarget : Reflect.get(target, property, target)),
  }) as React.KeyboardEvent<T>;

const fromNativeKeyboardEvent = <T extends HTMLElement>(
  nativeEvent: KeyboardEvent,
  currentTarget: T,
): React.KeyboardEvent<T> => {
  let propagationStopped = false;
  return new Proxy(nativeEvent, {
    get: (target, property) => {
      if (property === 'currentTarget') {
        return currentTarget;
      }
      if (property === 'nativeEvent') {
        return nativeEvent;
      }
      if (property === 'isDefaultPrevented') {
        return () => nativeEvent.defaultPrevented;
      }
      if (property === 'isPropagationStopped') {
        return () => propagationStopped;
      }
      if (property === 'persist') {
        return () => undefined;
      }
      if (property === 'preventDefault') {
        return () => nativeEvent.preventDefault();
      }
      if (property === 'stopPropagation') {
        return () => {
          propagationStopped = true;
          nativeEvent.stopPropagation();
        };
      }
      const value = Reflect.get(target, property, target);
      return typeof value === 'function' ? value.bind(target) : value;
    },
  }) as unknown as React.KeyboardEvent<T>;
};

export const getCalendarGridKeyDownHandlers = <T extends HTMLElement>(
  onKeyDown: React.KeyboardEventHandler<T>,
  onKeyDownCapture: React.KeyboardEventHandler<T> | undefined,
  ownsArrow: (event: React.KeyboardEvent<T>) => boolean,
): Required<Pick<React.DOMAttributes<T>, 'onKeyDown' | 'onKeyDownCapture'>> & {
  onLegacyKeyDownCapture: (event: KeyboardEvent) => void;
} => {
  const onLegacyKeyDownCapture = (nativeEvent: KeyboardEvent): void => {
    if (
      capturedArrows.has(nativeEvent) ||
      reactCaptureEvents.has(nativeEvent) ||
      !isCalendarArrowKey(nativeEvent.key)
    ) {
      return;
    }

    const event = fromNativeKeyboardEvent(nativeEvent, nativeEvent.currentTarget as T);
    if (!ownsArrow(event)) {
      return;
    }

    legacyHandledArrows.add(nativeEvent);
    onKeyDownCapture?.(event);
    if (event.isPropagationStopped()) {
      return;
    }

    if (!event.isDefaultPrevented()) {
      onKeyDown(event);
    }
    event.preventDefault();
  };

  return {
    onKeyDownCapture: event => {
      if (legacyHandledArrows.has(event.nativeEvent)) {
        return;
      }
      if (isCalendarArrowKey(event.key)) {
        reactCaptureEvents.add(event.nativeEvent);
      }
      onKeyDownCapture?.(event);
      if (event.isPropagationStopped() || !ownsArrow(event)) {
        return;
      }

      // Native grid owners bubble before React 16 dispatches delegated handlers.
      capturedArrows.add(event.nativeEvent);
      onKeyDown(event);
      event.preventDefault();
    },
    onKeyDown: event => {
      if (legacyHandledArrows.delete(event.nativeEvent)) {
        return;
      }
      reactCaptureEvents.delete(event.nativeEvent);
      if (!capturedArrows.delete(event.nativeEvent)) {
        onKeyDown(event);
      }
    },
    onLegacyKeyDownCapture,
  };
};

export const invokeCalendarKeyboardHandler = <T extends HTMLElement>(
  event: React.KeyboardEvent<HTMLElement>,
  currentTarget: T,
  handler: React.KeyboardEventHandler<T> | undefined,
): void => {
  handler?.(withCurrentTarget(event, currentTarget));
};

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
