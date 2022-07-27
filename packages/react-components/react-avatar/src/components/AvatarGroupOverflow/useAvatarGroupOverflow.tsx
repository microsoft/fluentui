import * as React from 'react';
import { AvatarGroupContext } from '../../contexts/AvatarGroupContext';
import { defaultAvatarGroupSize } from '../AvatarGroup/useAvatarGroup';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { MoreHorizontalRegular } from '@fluentui/react-icons';
import { OnOpenChangeData, OpenPopoverEvents, PopoverSurface } from '@fluentui/react-popover';
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
export const useAvatarGroupOverflow_unstable = (
  props: AvatarGroupOverflowProps,
  ref: React.Ref<HTMLElement>,
): AvatarGroupOverflowState => {
  const groupSize = useContextSelector(AvatarGroupContext, ctx => ctx.size);
  const layout = useContextSelector(AvatarGroupContext, ctx => ctx.layout);
  const size = groupSize ?? defaultAvatarGroupSize;
  // When using getNativeElementProps, children would neeed to be ignore otherwise it would render all the Avatars as
  // the button's children. This causes an issue where then by ignoring childre, the button won't have children at all.
  // To avoid this, we use the props without the children and use the root's children in the content
  const { overflowIndicator = size < 24 ? 'icon' : 'count', children, ...restOfProps } = props;
  const count = props.count ?? React.Children.count(children);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  let rootChildren;

  const handleOnPopoverChange = (e: OpenPopoverEvents, data: OnOpenChangeData) => {
    setIsPopoverOpen(data.open);
  };

  if (overflowIndicator === 'icon') {
    rootChildren = <MoreHorizontalRegular />;
  } else {
    rootChildren = count > 99 ? '99+' : `+${count}`;
  }

  return {
    isPopoverOpen,
    handleOnPopoverChange,
    layout,
    overflowIndicator: 'count',
    size,
    tooltipContent: 'View more people.',

    components: {
      root: 'button',
      overflowContent: 'div',
      overflowSurface: PopoverSurface,
    },
    root: getNativeElementProps('button', {
      ref,
      children: rootChildren,
      type: 'button',
      ...restOfProps,
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
