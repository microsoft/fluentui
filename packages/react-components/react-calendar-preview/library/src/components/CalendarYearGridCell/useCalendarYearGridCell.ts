'use client';

import type * as React from 'react';
import { Enter } from '@fluentui/keyboard-keys';
import { getIntrinsicElementProps, slot, useMergedRefs } from '@fluentui/react-utilities';
import { useCalendarContext_unstable } from '../../contexts/calendarContext';
import { useCalendarYearContext_unstable } from '../../contexts/calendarYearContext';
import { stringifyDataAttribute } from '../../utils';
import type { ExtractSlotProps, Slot } from '@fluentui/react-utilities';
import type { CalendarYearGridCellProps, CalendarYearGridCellState } from './CalendarYearGridCell.types';

/**
 * Create the state required to render CalendarYearGridCell.
 */
export const useCalendarYearGridCell_unstable = (
  props: CalendarYearGridCellProps,
  ref: React.Ref<HTMLButtonElement>,
): CalendarYearGridCellState => {
  const { cell } = props;
  const nativeProps = getIntrinsicElementProps('button', props, ['cell']);
  const allFocusable = useCalendarContext_unstable(ctx => ctx.allFocusable);
  const currentYearRef = useCalendarYearContext_unstable(ctx => ctx.currentYearRef);
  const navigatedYearRef = useCalendarYearContext_unstable(ctx => ctx.navigatedYearRef);
  const onSelectYear = useCalendarYearContext_unstable(ctx => ctx.onSelectYear);
  const selectedYearRef = useCalendarYearContext_unstable(ctx => ctx.selectedYearRef);
  const cellRef = useMergedRefs(
    ref,
    cell.isSelected ? selectedYearRef : undefined,
    cell.isCurrent ? currentYearRef : undefined,
    cell.isNavigated ? navigatedYearRef : undefined,
  );

  const onSelect = cell.isDisabled
    ? undefined
    : (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) =>
        onSelectYear?.(event, {
          event,
          type: event.type === 'keydown' ? 'keydown' : 'click',
          year: cell.year,
        });

  const root = slot.always<ExtractSlotProps<Slot<'button'>>>(
    {
      ...nativeProps,
      ref: cellRef,
      children: cell.content,
      type: 'button',
      role: 'gridcell',
      onClick: event => {
        nativeProps.onClick?.(event);
        if (!event.isDefaultPrevented()) {
          onSelect?.(event);
        }
      },
      onKeyDown: event => {
        nativeProps.onKeyDown?.(event);
        if (!event.isDefaultPrevented() && event.key === Enter && onSelect) {
          event.preventDefault();
          onSelect(event);
        }
      },
      disabled: cell.isDisabled && !allFocusable,
      'aria-disabled': cell.isDisabled,
      tabIndex: cell.isDisabled && !allFocusable ? -1 : 0,
      'aria-selected': cell.isSelected,
    },
    { elementType: 'button' },
  );

  Object.assign(root, {
    'data-current': stringifyDataAttribute(cell.isCurrent),
    'data-selected': stringifyDataAttribute(cell.isSelected),
    'data-outside-bounds': stringifyDataAttribute(cell.isDisabled),
  } satisfies Record<string, '' | undefined>);

  return {
    components: {
      root: 'button',
    },
    isCurrent: cell.isCurrent,
    isDisabled: cell.isDisabled,
    isSelected: cell.isSelected,
    root,
  };
};
