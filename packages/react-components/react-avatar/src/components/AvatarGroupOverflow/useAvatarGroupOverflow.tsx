import * as React from 'react';
import { AvatarGroupContext } from '../../contexts/AvatarGroupContext';
import { defaultAvatarGroupSize } from '../AvatarGroup/useAvatarGroup';
import { resolveShorthand } from '@fluentui/react-utilities';
import { MoreHorizontalRegular } from '@fluentui/react-icons';
import { OnOpenChangeData, OpenPopoverEvents, Popover, PopoverSurface } from '@fluentui/react-popover';
import { useContextSelector } from '@fluentui/react-context-selector';
import type { AvatarGroupOverflowProps, AvatarGroupOverflowState } from './AvatarGroupOverflow.types';

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
  const groupSize = useContextSelector(AvatarGroupContext, ctx => ctx.size);
  const layout = useContextSelector(AvatarGroupContext, ctx => ctx.layout);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const size = groupSize ?? defaultAvatarGroupSize;
  const {
    overflowIndicator = size < 24 ? 'icon' : 'count',
    count = React.Children.count(props.children),
    children,
    ...restOfProps
  } = props;
  let overflowButtonChildren;

  const handleOnPopoverChange = (e: OpenPopoverEvents, data: OnOpenChangeData) => {
    setIsPopoverOpen(data.open);
  };

  if (overflowIndicator === 'icon') {
    overflowButtonChildren = <MoreHorizontalRegular />;
  } else {
    overflowButtonChildren = count > 99 ? '99+' : `+${count}`;
  }

  return {
    isPopoverOpen,
    layout,
    overflowIndicator,
    size,
    tooltipContent: 'View more people.',

    components: {
      root: Popover,
      overflowButton: 'button',
      overflowContent: 'div',
      overflowSurface: PopoverSurface,
    },
    root: {
      // Popover expects a child for its children. The children are added in the renderAvatarGroupOverflow.
      children: <></>,
      onOpenChange: handleOnPopoverChange,
      size: 'small',
      trapFocus: true,
      ...restOfProps,
    },
    overflowButton: resolveShorthand(props.overflowButton, {
      required: true,
      defaultProps: {
        children: overflowButtonChildren,
        type: 'button',
      },
    }),
    overflowContent: resolveShorthand(props.overflowContent, {
      required: true,
      defaultProps: {
        'aria-label': 'Overflow',
        children: children,
        role: 'list',
        tabIndex: 0,
      },
    }),
    overflowSurface: resolveShorthand(props.overflowSurface, {
      required: true,
    }),
  };
};
