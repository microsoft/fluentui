import * as React from 'react';
import { useAvatarGroupContext_unstable } from '../../contexts/AvatarGroupContext';
import { defaultAvatarGroupSize } from '../AvatarGroup/useAvatarGroup';
import { useControllableState, slot } from '@fluentui/react-utilities';
import { MoreHorizontalRegular } from '@fluentui/react-icons';
import { OnOpenChangeData, OpenPopoverEvents, Popover, PopoverSurface } from '@fluentui/react-popover';
import type { AvatarGroupPopoverProps, AvatarGroupPopoverState } from './AvatarGroupPopover.types';
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
  const {
    indicator = size < 24 ? 'icon' : 'count',
    count = React.Children.count(props.children),
    children,
    ...restOfProps
  } = props;

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
  } else if (indicator === 'icon') {
    triggerButtonChildren = <MoreHorizontalRegular />;
  } else {
    triggerButtonChildren = count > 99 ? '99+' : `+${count}`;
  }

  return {
    count,
    indicator,
    layout,
    popoverOpen,
    size,

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
      { elementType: Popover },
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
      elementType: PopoverSurface,
    }),
    tooltip: slot.always(props.tooltip, {
      defaultProps: {
        content: 'View more people.',
        relationship: 'label',
      },
      elementType: Tooltip,
    }),
  };
};
