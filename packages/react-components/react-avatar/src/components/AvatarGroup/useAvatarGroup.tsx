import * as React from 'react';
import type { AvatarGroupProps, AvatarGroupState } from './AvatarGroup.types';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { PopoverSurface } from '@fluentui/react-popover';
import { Button } from '@fluentui/react-button';
import { MoreHorizontalRegular } from '@fluentui/react-icons';
import { avatarGroupDefaultStrings } from './AvatarGroup.strings';
import { useId } from '@fluentui/react-utilities';
import { getInitials } from '../../utils/getInitials';
import { extraAvatarGroupClassNames } from './useAvatarGroupStyles';
import { Label } from '@fluentui/react-label';

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
  const {
    children,
    layout = 'spread',
    maxAvatars = 5,
    size = 32,
    strings = avatarGroupDefaultStrings,
    overflowIndicator = 'number-overflowed',
    ...rest
  } = props;
  const id = useId('avatarGroup-', props.id);
  const childrenCount = React.Children.count(children);
  const numOfAvatarsToShow = layout === 'pie' ? 3 : maxAvatars;
  const hasOverflow = childrenCount > numOfAvatarsToShow;
  const childrenArray = React.Children.toArray(children);

  const rootChildren = childrenArray.slice(0, numOfAvatarsToShow).map(child => {
    if (React.isValidElement(child)) {
      // If the layout is pie and the size is less than 40, the Avatar should only display the first initial
      let initials = child.props.initials;

      if (layout === 'pie' && child.props.name && size < 40) {
        // No need to check if it's rtl since we will use only the first letter.
        initials = getInitials(child.props.name, false)[0];
      }

      // Overwritting size to the one given in the props.
      return React.cloneElement(child, { size: size, initials: initials, color: child.props.color ?? 'colorful' });
    }
    return child;
  });

  const root = getNativeElementProps('div', {
    ref,
    id: id,
    role: 'group',
    children: rootChildren,
    ...rest,
  });

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

  const popoverChildren =
    hasOverflow &&
    childrenArray.slice(numOfAvatarsToShow).map((child, k) => {
      if (React.isValidElement(child)) {
        // Avatars inside PopoverSurface must be size 24
        return (
          <li className={extraAvatarGroupClassNames.popoverSurfaceItem} key={k} tabIndex={0}>
            {React.cloneElement(child, { size: 24, color: child.props.color ?? 'colorful' })}
            <Label size="medium">{child.props.name ?? child.props.initials}</Label>
          </li>
        );
      }
      return child;
    });

  const popoverSurface = resolveShorthand(props.popoverSurface, {
    required: true,
    defaultProps: {
      children: <ul className={extraAvatarGroupClassNames.popoverSurfaceContainer}>{popoverChildren}</ul>,
      'aria-label': 'Overflow',
    },
  });

  const state: AvatarGroupState = {
    hasOverflow: hasOverflow,
    layout,
    maxAvatars: numOfAvatarsToShow,
    overflowIndicator,
    size,
    strings: strings,
    tooltipContent: strings.tooltipContent,

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
