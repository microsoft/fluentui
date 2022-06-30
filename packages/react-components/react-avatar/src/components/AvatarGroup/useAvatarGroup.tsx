import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { MoreHorizontalRegular } from '@fluentui/react-icons';
import { PopoverSurface } from '@fluentui/react-popover';
import type { AvatarGroupProps, AvatarGroupState } from './AvatarGroup.types';

/**
 * Create the state required to render AvatarGroup.
 *
 * The returned state can be modified with hooks such as useAvatarGroupStyles_unstable,
 * before being passed to renderAvatarGroup_unstable.
 *
 * @param props - props from this instance of AvatarGroup
 * @param ref - reference to root HTMLElement of AvatarGroup
 */
export const useAvatarGroup_unstable = (props: AvatarGroupProps, ref: React.Ref<HTMLElement>): AvatarGroupState => {
  const { children, layout = 'spread', maxAvatars = 5, size = defaultAvatarGroupSize } = props;
  const { overflowIndicator = size < 24 ? 'icon' : 'count' } = props;
  const childrenArray = React.Children.toArray(children);

  let rootChildren = childrenArray;
  let overflowChildren;
  let overflowButtonChildren;

  if (layout === 'pie') {
    rootChildren = childrenArray.slice(0, 3);
    overflowChildren = childrenArray;
  } else if (childrenArray.length > maxAvatars) {
    const numOfAvatarsToHide = childrenArray.length - maxAvatars + 1;

    rootChildren = childrenArray.slice(numOfAvatarsToHide);
    overflowChildren = childrenArray.slice(0, numOfAvatarsToHide);

    if (overflowIndicator === 'icon') {
      overflowButtonChildren = <MoreHorizontalRegular />;
    } else {
      overflowButtonChildren = numOfAvatarsToHide > 99 ? '99+' : `+${numOfAvatarsToHide}`;
    }
  }

  const root = getNativeElementProps(
    'div',
    {
      role: 'group',
      ...props,
      ref,
      children: rootChildren,
    },
    ['size'],
  );

  const overflowButton = resolveShorthand(props.overflowButton, {
    required: true,
    defaultProps: {
      children: overflowButtonChildren,
    },
  });

  const overflowContent = resolveShorthand(props.overflowContent, {
    required: true,
    defaultProps: {
      'aria-label': 'Overflow',
      children: overflowChildren,
      role: 'list',
      tabIndex: 0,
    },
  });

  return {
    nonOverflowAvatarsCount: rootChildren.length,
    hasOverflow: !!overflowChildren,
    layout,
    overflowIndicator,
    size,
    tooltipContent: 'View more people.',

    components: {
      root: 'div',
      overflowContent: PopoverSurface,
      overflowButton: 'button',
    },

    root,
    overflowButton,
    overflowContent,
  };
};

export const defaultAvatarGroupSize = 32;
