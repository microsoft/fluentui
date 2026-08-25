'use client';

import type * as React from 'react';
import { Enter } from '@fluentui/keyboard-keys';
import { slot } from '@fluentui/react-utilities';
import { useCalendarYearContext_unstable } from '../../contexts/calendarYearContext';
import { stringifyDataAttribute } from '../../utils';
import type { CalendarYearGridCellProps, CalendarYearGridCellState } from './CalendarYearGridCell.types';

/**
 * Create the state required to render CalendarYearGridCell.
 */
export const useCalendarYearGridCell_unstable = (props: CalendarYearGridCellProps): CalendarYearGridCellState => {
  const { cell } = props;
  const currentYearRef = useCalendarYearContext_unstable(ctx => ctx.currentYearRef);
  const onSelectYear = useCalendarYearContext_unstable(ctx => ctx.onSelectYear);
  const selectedYearRef = useCalendarYearContext_unstable(ctx => ctx.selectedYearRef);

  const onSelect = cell.isDisabled
    ? undefined
    : (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) =>
        onSelectYear?.(event, {
          event,
          type: event.type === 'keydown' ? 'keydown' : 'click',
          year: cell.year,
        });

  return {
    components: {
      root: 'button',
    },
    isCurrent: cell.isCurrent,
    isDisabled: cell.isDisabled,
    isSelected: cell.isSelected,
    root: slot.always(
      {
        ref: cell.isSelected ? selectedYearRef : cell.isCurrent ? currentYearRef : undefined,
        children: cell.content,
        type: 'button',
        role: 'gridcell',
        onClick: onSelect,
        onKeyDown: onSelect
          ? (event: React.KeyboardEvent<HTMLButtonElement>) => {
              if (event.key === Enter) {
                onSelect(event);
              }
            }
          : undefined,
        disabled: cell.isDisabled,
        'aria-selected': cell.isSelected,
        'data-current': stringifyDataAttribute(cell.isCurrent),
        'data-selected': stringifyDataAttribute(cell.isSelected),
        'data-outside-bounds': stringifyDataAttribute(cell.isDisabled),
      },
      { elementType: 'button' },
    ),
  };
};
