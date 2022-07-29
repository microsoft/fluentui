import * as React from 'react';
import { AvatarGroupContext } from '../../contexts/AvatarGroupContext';
import { defaultAvatarGroupSize } from '../AvatarGroup/useAvatarGroup';
import { resolveShorthand } from '@fluentui/react-utilities';
import { MoreHorizontalRegular } from '@fluentui/react-icons';
import { OnOpenChangeData, OpenPopoverEvents, Popover, PopoverSurface } from '@fluentui/react-popover';
import { useContextSelector } from '@fluentui/react-context-selector';
import type { AvatarGroupOverflowProps, AvatarGroupOverflowState } from './AvatarGroupOverflow.types';
import { Tooltip } from '@fluentui/react-tooltip';

/**
 * Create the state required to render AvatarGroupOverflow.
 *
 * The returned state can be modified with hooks such as useAvatarGroupOverflowStyles_unstable,
 * before being passed to renderAvatarGroupOverflow_unstable.
 *
 * @param props - props from this instance of AvatarGroupOverflow
 * @param ref - reference to root HTMLElement of AvatarGroupOverflow
 */
export const useAvatarGroupOverflow_unstable = (props: AvatarGroupOverflowProps): AvatarGroupOverflowState => {
  const size = useContextSelector(AvatarGroupContext, ctx => ctx.size) ?? defaultAvatarGroupSize;
  const layout = useContextSelector(AvatarGroupContext, ctx => ctx.layout);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const {
    indicator = size < 24 ? 'icon' : 'count',
    count = React.Children.count(props.children),
    children,
    ...restOfProps
  } = props;
  let triggerButtonChildren;

  const handleOnPopoverChange = (e: OpenPopoverEvents, data: OnOpenChangeData) => {
    setIsPopoverOpen(data.open);
  };

  if (indicator === 'icon') {
    triggerButtonChildren = <MoreHorizontalRegular />;
  } else {
    triggerButtonChildren = count > 99 ? '99+' : `+${count}`;
  }

  return {
    isPopoverOpen,
    layout,
    indicator,
    size,

    components: {
      root: Popover,
      triggerButton: 'button',
      content: 'div',
      popoverSurface: PopoverSurface,
      tooltip: Tooltip,
    },
    root: {
      // Popover expects a child for its children. The children are added in the renderAvatarGroupOverflow.
      children: <></>,
      onOpenChange: handleOnPopoverChange,
      size: 'small',
      trapFocus: true,
      ...restOfProps,
    },
    triggerButton: resolveShorthand(props.triggerButton, {
      required: true,
      defaultProps: {
        children: triggerButtonChildren,
        type: 'button',
      },
    }),
    content: resolveShorthand(props.content, {
      required: true,
      defaultProps: {
        'aria-label': 'Overflow',
        children: children,
        role: 'list',
        tabIndex: 0,
      },
    }),
    popoverSurface: resolveShorthand(props.popoverSurface, {
      required: true,
    }),
    tooltip: resolveShorthand(props.tooltip, {
      required: true,
      defaultProps: {
        content: 'View more people.',
        relationship: 'label',
      },
    }),
  };
};
