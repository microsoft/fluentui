'use client';

import type * as React from 'react';
import { Enter } from '@fluentui/keyboard-keys';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { getIntrinsicElementProps, slot, useMergedRefs } from '@fluentui/react-utilities';
import { useCalendarContext_unstable } from '../../contexts/calendarContext';
import { useCalendarMonthContext_unstable } from '../../contexts/calendarMonthContext';
import { stringifyDataAttribute } from '../../utils';
import {
  getCalendarGridKeyDownHandlers,
  handleCalendarGridKeyDown,
  isCalendarGridArrow,
  isCalendarKeyboardEditable,
} from '../../utils/calendarKeyboard';
import type { ExtractSlotProps, Slot } from '@fluentui/react-utilities';
import type { CalendarMonthGridCellProps, CalendarMonthGridCellState } from './CalendarMonthGridCell.types';

/**
 * Create the state required to render CalendarMonthGridCell.
 */
export const useCalendarMonthGridCell_unstable = (
  props: CalendarMonthGridCellProps,
  ref?: React.Ref<HTMLButtonElement>,
): CalendarMonthGridCellState => {
  const { month } = props;
  const { dir } = useFluent_unstable();
  const nativeProps = getIntrinsicElementProps('button', props, ['month']);
  const allFocusable = useCalendarContext_unstable(ctx => ctx.allFocusable);
  const navigatedMonthRef = useCalendarMonthContext_unstable(ctx => ctx.navigatedMonthRef);
  const onSelect = month.isInBounds ? month.onSelect : undefined;
  const rootRef = useMergedRefs(ref, month.isNavigated ? navigatedMonthRef : undefined);

  const root = slot.always(
    {
      ...nativeProps,
      ref: rootRef,
      'data-current': stringifyDataAttribute(month.isCurrent),
      'data-selected': stringifyDataAttribute(month.isSelected),
      'data-outside-bounds': stringifyDataAttribute(!month.isInBounds),
      children: month.label,
      role: 'gridcell',
      disabled: !allFocusable && !month.isInBounds,
      onClick: event => {
        nativeProps.onClick?.(event);
        if (!event.isDefaultPrevented()) {
          onSelect?.(event);
        }
      },
      ...getCalendarGridKeyDownHandlers<HTMLButtonElement>(
        event => {
          nativeProps.onKeyDown?.(event);
          if (event.isDefaultPrevented() || isCalendarKeyboardEditable(event.target)) {
            return;
          }
          handleCalendarGridKeyDown(event, dir, allFocusable);
          if (event.key === Enter && onSelect) {
            event.preventDefault();
            onSelect(event);
          }
        },
        nativeProps.onKeyDownCapture,
        isCalendarGridArrow,
      ),
      'aria-label': month.ariaLabel,
      'aria-disabled': !month.isInBounds,
      'aria-selected': month.isSelected,
      tabIndex: month.isInBounds || allFocusable ? 0 : -1,
      type: 'button',
    } as ExtractSlotProps<Slot<'button'>>,
    { elementType: 'button' },
  );

  Object.assign(root, {} satisfies Record<string, '' | undefined>);

  return {
    components: {
      root: 'button',
    },
    isCurrent: month.isCurrent,
    isInBounds: month.isInBounds,
    isSelected: month.isSelected,
    root,
  };
};
