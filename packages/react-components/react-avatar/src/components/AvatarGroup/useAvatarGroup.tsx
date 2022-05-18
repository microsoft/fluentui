import * as React from 'react';
import { Button } from '@fluentui/react-button';
import { extraAvatarGroupClassNames } from './useAvatarGroupStyles';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { MoreHorizontalRegular } from '@fluentui/react-icons';
import { PopoverSurface } from '@fluentui/react-popover';
import { useId } from '@fluentui/react-utilities';
import type { AvatarGroupProps, AvatarGroupState } from './AvatarGroup.types';
import { Label } from '@fluentui/react-label';
import { AvatarGroupContext } from '../../contexts/index';

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
  const id = useId('avatarGroup-', props.id);
  const childrenCount = React.Children.count(children);
  const numOfAvatarsToShow = layout === 'pie' ? 3 : maxAvatars;
  const hasOverflow = childrenCount > numOfAvatarsToShow;
  const childrenArray = React.Children.toArray(children);

  const rootChildren = childrenArray.slice(0, numOfAvatarsToShow);
  const root = getNativeElementProps(
    'div',
    {
      ...props,
      ref,
      id: id,
      role: 'group',
      children: rootChildren,
    },
    ['size'],
  );

  const popoverTriggerChildren =
    layout === 'pie' || overflowIndicator === 'icon' ? null : `+${childrenCount - numOfAvatarsToShow}`;
  const popoverTriggerIcon = layout !== 'pie' && overflowIndicator === 'icon' ? <MoreHorizontalRegular /> : undefined;

  const popoverTrigger = resolveShorthand(props.popoverTrigger, {
    required: true,
    defaultProps: {
      children: popoverTriggerChildren,
      shape: 'circular',
      icon: popoverTriggerIcon,
      appearance: layout === 'pie' ? 'transparent' : 'outline',
    },
  });

  const popoverChildren = childrenArray.slice(numOfAvatarsToShow).map((child, k) => {
    if (React.isValidElement(child)) {
      // Avatars inside PopoverSurface must be size 24
      return (
        <li className={extraAvatarGroupClassNames.popoverSurfaceItem} key={k} tabIndex={0}>
          {React.cloneElement(child, { size: 24 })}
          <Label size="medium">{child.props.name}</Label>
        </li>
      );
    }
    return child;
  });
  const popoverSurface = resolveShorthand(props.popoverSurface, {
    required: true,
    defaultProps: {
      children: (
        <AvatarGroupContext.Provider value={{ color: 'colorful', layout, size: 24 }}>
          <ul className={extraAvatarGroupClassNames.popoverSurfaceContainer}>{popoverChildren}</ul>
        </AvatarGroupContext.Provider>
      ),
      'aria-label': 'Overflow',
    },
  });

  const state: AvatarGroupState = {
    hasOverflow: hasOverflow,
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

    root: root,
    popoverTrigger: popoverTrigger,
    popoverSurface: popoverSurface,
  };

  return state;
};
