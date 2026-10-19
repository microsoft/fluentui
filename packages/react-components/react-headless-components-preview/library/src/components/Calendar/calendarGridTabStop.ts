'use client';

import * as React from 'react';
import { useCalendarContext_unstable } from '@fluentui/react-calendar-preview';
import { useEventCallback, useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';

const rememberedCells = new WeakMap<Element, HTMLElement>();

export const CalendarDayFocusTargetContext = React.createContext<string | undefined>(undefined);

const setCalendarGridTabStop = (activeCell: HTMLElement): void => {
  const grid = activeCell.closest('[role="grid"]');
  if (!grid) {
    return;
  }
  rememberedCells.set(grid, activeCell);

  grid.querySelectorAll<HTMLElement>('[role="gridcell"]').forEach(cell => {
    if (cell.closest('[role="grid"]') === grid) {
      cell.tabIndex = cell === activeCell ? 0 : -1;
    }
  });
};

export const useCalendarGridTabStop = <T extends HTMLElement>(
  cell: Pick<React.HTMLAttributes<T>, 'onFocus' | 'tabIndex'> & { ref?: React.Ref<T> },
  isNavigated: boolean,
): {
  ref: React.RefCallback<T>;
  onFocus: React.FocusEventHandler<T>;
  tabIndex: number | undefined;
} => {
  const allFocusable = useCalendarContext_unstable(ctx => ctx.allFocusable);
  const cellRef = React.useRef<T>(null);
  const ref = useMergedRefs(cell.ref, cellRef);
  const onFocus = useEventCallback((event: React.FocusEvent<T>) => {
    cell.onFocus?.(event);
    setCalendarGridTabStop(event.currentTarget);
  });

  // React may update the navigated cell's tabIndex without updating the remembered cell's DOM value.
  useIsomorphicLayoutEffect(() => {
    const element = cellRef.current;
    const grid = element?.closest('[role="grid"]');
    if (element && grid) {
      const remembered = rememberedCells.get(grid);
      const tabStop =
        remembered &&
        grid.contains(remembered) &&
        !remembered.matches(':disabled') &&
        (allFocusable || remembered.getAttribute('aria-disabled') !== 'true')
          ? remembered
          : undefined;
      element.tabIndex = tabStop ? (element === tabStop ? 0 : -1) : isNavigated ? cell.tabIndex ?? -1 : -1;
    }
  });

  return { ref, onFocus, tabIndex: isNavigated ? cell.tabIndex : -1 };
};
