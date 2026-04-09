'use client';

import * as React from 'react';
import { useAvatarGroupContext_unstable } from '../../contexts/AvatarGroupContext';
import { defaultAvatarGroupSize } from '../AvatarGroup/useAvatarGroup';
import { useControllableState, slot } from '@fluentui/react-utilities';
import { MoreHorizontalRegular } from '@fluentui/react-icons';
import type { OnOpenChangeData, OpenPopoverEvents } from '@fluentui/react-popover';
import { Popover, type PopoverProps, PopoverSurface } from '@fluentui/react-popover';
import type {
  AvatarGroupPopoverBaseProps,
  AvatarGroupPopoverBaseState,
  AvatarGroupPopoverProps,
  AvatarGroupPopoverState,
} from './AvatarGroupPopover.types';
import { Tooltip } from '@fluentui/react-tooltip';

/**
 * Create the state required to render AvatarGroupPopover.
 *
 * The returned state can be modified with hooks such as useAvatarGroupPopoverStyles_unstable,
 * before being passed to renderAvatarGroupPopover_unstable.
 *
 * @param props - props from this instance of AvatarGroupPopover
 */
export const useAvatarGroupPopover_unstable = (props: AvatarGroupPopoverProps): AvatarGroupPopoverState => {
  const size = useAvatarGroupContext_unstable(ctx => ctx.size) ?? defaultAvatarGroupSize;
  const layout = useAvatarGroupContext_unstable(ctx => ctx.layout);
  const { indicator = size < 24 ? 'icon' : 'count', ...baseProps } = props;

  const state = useAvatarGroupPopoverBase_unstable({
    indicator,
    ...baseProps,
  });

  if (layout === 'pie') {
    state.triggerButton.children = null;
  } else if (indicator === 'icon') {
    state.triggerButton.children = <MoreHorizontalRegular />;
  }

  return {
    size,
    ...state,

    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      root: Popover,
      popoverSurface: PopoverSurface,
      tooltip: Tooltip,
    },
    root: slot.always(state.root as PopoverProps, { elementType: Popover }),
    popoverSurface: slot.always(props.popoverSurface, {
      defaultProps: state.popoverSurface,
      elementType: PopoverSurface,
    }),
    tooltip: slot.always(props.tooltip, {
      defaultProps: state.tooltip,
      elementType: Tooltip,
    }),
  };
};

/**
 * Handles popover open/closed state, indicator display, and slot configuration.
 * Use directly for custom implementations or use useAvatarGroupPopover_unstable for defaults.
 *
 * @param props - AvatarGroupPopover props
 * @returns AvatarGroupPopover state
 */
export const useAvatarGroupPopoverBase_unstable = (props: AvatarGroupPopoverBaseProps): AvatarGroupPopoverBaseState => {
  const layout = useAvatarGroupContext_unstable(ctx => ctx.layout);
  const { indicator = 'count', count = React.Children.count(props.children), children, ...restOfProps } = props;

  const [popoverOpen, setPopoverOpen] = useControllableState({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false,
  });

  const handleOnPopoverChange = (e: OpenPopoverEvents, data: OnOpenChangeData) => {
    restOfProps.onOpenChange?.(e, data);
    setPopoverOpen(data.open);
  };

  let triggerButtonChildren;
  if (layout === 'pie') {
    triggerButtonChildren = null;
  } else if (indicator === 'count') {
    triggerButtonChildren = count > 99 ? '99+' : `+${count}`;
  }

  return {
    count,
    indicator,
    layout,
    popoverOpen,

    components: {
      root: Popover,
      triggerButton: 'button',
      content: 'ul',
      popoverSurface: PopoverSurface,
      tooltip: Tooltip,
    },
    root: slot.always(
      {
        // Popover expects a child for its children. The children are added in the renderAvatarGroupPopover.
        children: <></>,
        size: 'small',
        trapFocus: true,
        ...restOfProps,
        open: popoverOpen,
        onOpenChange: handleOnPopoverChange,
      },
      { elementType: 'div' },
    ),
    triggerButton: slot.always(props.triggerButton, {
      defaultProps: {
        children: triggerButtonChildren,
        type: 'button',
      },
      elementType: 'button',
    }),
    content: slot.always(props.content, {
      defaultProps: {
        children,
        role: 'list',
      },
      elementType: 'ul',
    }),
    popoverSurface: slot.always(props.popoverSurface, {
      defaultProps: {
        'aria-label': 'Overflow',
        tabIndex: 0,
      },
      elementType: 'div',
    }),
    tooltip: slot.always(props.tooltip, {
      defaultProps: {
        content: 'View more people.',
        relationship: 'label',
      },
      elementType: 'div',
    }),
  };
};
