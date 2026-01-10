'use client';

import type { PopoverProps, PopoverState } from './Popover.types';
import { usePopoverBase_unstable } from './usePopoverBase';
import { mergeArrowOffset, resolvePositioningShorthand } from '@fluentui/react-positioning';
import { arrowHeights } from '../PopoverSurface';

/**
 * Create the state required to render Popover.
 *
 * The returned state can be modified with hooks such as usePopoverStyles,
 * before being passed to renderPopover_unstable.
 *
 * @param props - props from this instance of Popover
 */
export const usePopover_unstable = (props: PopoverProps): PopoverState => {
  const { appearance, size = 'medium' } = props;
  const positioning = resolvePositioningShorthand(props.positioning);
  const withArrow = props.withArrow && !positioning.coverTarget;

  const state = usePopoverBase_unstable({
    ...props,
    positioning: {
      ...positioning,
      // Update the offset with the arrow size only when it's available
      ...(withArrow ? { offset: mergeArrowOffset(positioning.offset, arrowHeights[size]) } : {}),
    },
  });

  return {
    appearance,
    size,
    ...state,
  };
};
