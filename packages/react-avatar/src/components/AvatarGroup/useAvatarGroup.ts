import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { AvatarGroupProps, AvatarGroupState } from './AvatarGroup.types';
import { PopoverSurface } from '@fluentui/react-popover';

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
  const { maxAvatars = 5, layout = 'grid', size = 32 } = props;

  return {
    maxAvatars,
    layout,
    size,
    components: {
      // TODO add each slot's element type or component
      root: 'div',
      popoverSurface: PopoverSurface,
      popoverTrigger: 'span',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
    popoverSurface: resolveShorthand(props.popoverSurface, {
      required: true,
    }),
    popoverTrigger: resolveShorthand(props.popoverTrigger, {
      required: true,
    }),
  };
};
