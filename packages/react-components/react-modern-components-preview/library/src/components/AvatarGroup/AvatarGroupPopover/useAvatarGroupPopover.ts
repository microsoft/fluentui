'use client';

import { slot } from '@fluentui/react-utilities';
import {
  useAvatarGroupContext,
  useAvatarGroupPopover as useAvatarGroupPopoverBase,
} from '@fluentui/react-headless-components-preview/avatar-group';
import { PopoverSurface } from '../../Popover/PopoverSurface/PopoverSurface';
import { Tooltip } from '../../Tooltip/Tooltip';
import type { AvatarGroupPopoverProps, AvatarGroupPopoverState } from './AvatarGroupPopover.types';

/** Create the state required to render AvatarGroupPopover. */
export const useAvatarGroupPopover = (props: AvatarGroupPopoverProps): AvatarGroupPopoverState => {
  const size = useAvatarGroupContext(context => context.size) ?? 32;
  const indicator = props.indicator ?? (size < 24 ? 'icon' : 'count');
  const baseState = useAvatarGroupPopoverBase({ ...props, indicator });

  return {
    ...baseState,
    size,
    components: {
      triggerButton: 'button',
      content: 'ul',
      popoverSurface: PopoverSurface,
      tooltip: Tooltip,
    },
    triggerButton: {
      ...baseState.triggerButton,
      'data-indicator': baseState.indicator,
      'data-layout': baseState.layout,
      'data-open': baseState.popoverOpen ? '' : undefined,
      'data-size': `${size}`,
    },
    popoverSurface: slot.always(props.popoverSurface, {
      defaultProps: baseState.popoverSurface,
      elementType: PopoverSurface,
    }),
    tooltip: slot.always(props.tooltip, {
      defaultProps: baseState.tooltip,
      elementType: Tooltip,
    }),
  };
};
