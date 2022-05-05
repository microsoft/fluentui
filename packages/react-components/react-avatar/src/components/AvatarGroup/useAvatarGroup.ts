import * as React from 'react';
import type { AvatarGroupProps, AvatarGroupState } from './AvatarGroup.types';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { PopoverSurface } from '@fluentui/react-popover';
import { Button } from '@fluentui/react-button';
import { avatarGroupDefaultStrings } from './AvatarGroup.strings';

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
  const { children, strings = avatarGroupDefaultStrings } = props;

  return {
    // TODO: Replace with actual logic.
    tooltipContent: strings.tooltipContent.replace('{numOverflowedAvatars}', String(10)),
    components: {
      // TODO add each slot's element type or component
      root: 'div',
      popoverSurface: PopoverSurface,
      popoverTrigger: Button,
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
    popoverTrigger: resolveShorthand(props.popoverTrigger, {
      required: true,
      defaultProps: {
        // TODO: Update children
        children: '+10',
      },
    }),
    popoverSurface: resolveShorthand(props.popoverSurface, {
      required: true,
      defaultProps: {
        // TODO: Update children
        children: children,
      },
    }),
  };
};
