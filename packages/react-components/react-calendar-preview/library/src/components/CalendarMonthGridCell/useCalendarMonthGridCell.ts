'use client';

import type * as React from 'react';
import { Enter } from '@fluentui/keyboard-keys';
import { slot } from '@fluentui/react-utilities';
import { useCalendarContext_unstable } from '../../contexts/calendarContext';
import { useCalendarMonthContext_unstable } from '../../contexts/calendarMonthContext';
import { stringifyDataAttribute } from '../../utils';
import type { CalendarMonthGridCellProps, CalendarMonthGridCellState } from './CalendarMonthGridCell.types';

/**
 * Create the state required to render CalendarMonthGridCell.
 */
export const useCalendarMonthGridCell_unstable = (props: CalendarMonthGridCellProps): CalendarMonthGridCellState => {
  const { month } = props;
  const allFocusable = useCalendarContext_unstable(ctx => ctx.allFocusable);
  const navigatedMonthRef = useCalendarMonthContext_unstable(ctx => ctx.navigatedMonthRef);
  const onSelect = month.isInBounds ? month.onSelect : undefined;

  return {
    components: {
      root: 'button',
    },
    isCurrent: month.isCurrent,
    isInBounds: month.isInBounds,
    isSelected: month.isSelected,
    root: slot.always(
      {
        ref: month.isNavigated ? navigatedMonthRef : undefined,
        children: month.label,
        role: 'gridcell',
        disabled: !allFocusable && !month.isInBounds,
        onClick: onSelect,
        onKeyDown: onSelect
          ? (event: React.KeyboardEvent<HTMLButtonElement>) => {
              if (event.key === Enter) {
                onSelect(event);
              }
            }
          : undefined,
        'aria-label': month.ariaLabel,
        'aria-selected': month.isNavigated,
        'data-current': stringifyDataAttribute(month.isCurrent),
        'data-selected': stringifyDataAttribute(month.isSelected),
        'data-outside-bounds': stringifyDataAttribute(!month.isInBounds),
        tabIndex: month.isInBounds ? 0 : -1,
        type: 'button',
      },
      { elementType: 'button' },
    ),
  };
};
