import * as React from 'react';
import { Button } from '@fluentui/react-button';
import { extraAvatarGroupClassNames } from './useAvatarGroupStyles';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { MoreHorizontalRegular } from '@fluentui/react-icons';
import { PopoverSurface } from '@fluentui/react-popover';
import { AvatarGroupContext } from '../../contexts/index';
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
  const { children, layout = 'spread', maxAvatars = 5, overflowIndicator = 'count', size = 32 } = props;
  const childrenArray = React.Children.toArray(children);
  const childrenCount = childrenArray.length;
  const numOfAvatarsToShow = layout === 'pie' ? 3 : maxAvatars;
  const hasOverflow = childrenCount > numOfAvatarsToShow;
  const numOfAvatarsToHide = childrenCount - numOfAvatarsToShow + 1;

  let rootChildren = childrenArray;
  let popoverChildren = null;
  let popoverTriggerChildren = null;
  let popoverTriggerIcon = null;

  if (layout === 'pie') {
    rootChildren = childrenArray.slice(0, numOfAvatarsToShow);
    popoverChildren = childrenArray.slice(numOfAvatarsToShow);
  } else {
    rootChildren = childrenArray.slice(numOfAvatarsToHide);
    popoverChildren = childrenArray.slice(0, numOfAvatarsToHide);

    if (overflowIndicator === 'icon' || size < 24) {
      popoverTriggerIcon = <MoreHorizontalRegular />;
    } else {
      popoverTriggerChildren = `+${numOfAvatarsToHide}`;
    }
  }

  const root = getNativeElementProps(
    'div',
    {
      ...props,
      ref,
      role: 'group',
      children: rootChildren,
    },
    ['size'],
  );

  const popoverTrigger = resolveShorthand(props.popoverTrigger, {
    required: true,
    defaultProps: {
      children: popoverTriggerChildren,
      shape: 'circular',
      icon: popoverTriggerIcon,
      appearance: layout === 'pie' ? 'transparent' : 'outline',
    },
  });

  const popoverSurface = resolveShorthand(props.popoverSurface, {
    required: true,
    defaultProps: {
      // Avatars inside PopoverSurface must be size 24
      children: (
        <AvatarGroupContext.Provider value={{ color: 'colorful', layout: undefined, size: 24 }}>
          <ul className={extraAvatarGroupClassNames.popoverSurfaceContainer} role="list">
            {popoverChildren}
          </ul>
        </AvatarGroupContext.Provider>
      ),
      'aria-label': 'Overflow',
    },
  });

  return {
    hasOverflow,
    layout,
    maxAvatars: numOfAvatarsToShow,
    overflowIndicator,
    size,
    tooltipContent: 'View more people.',

    components: {
      root: 'div',
      popoverSurface: PopoverSurface,
      popoverTrigger: Button,
    },

    root,
    popoverTrigger,
    popoverSurface,
  };
};
