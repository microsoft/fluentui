import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useMergedRefs } from '@fluentui/react-utilities';
import type { BadgeProps, BadgeSlots, BadgeState } from './Badge.types';

/**
 * Consts listing which props are shorthand props.
 */
export const badgeSlots: Array<keyof BadgeSlots> = ['icon', 'root'];

/**
 * Returns the props and state required to render the component
 */
export const useBadge = (props: BadgeProps, ref: React.Ref<HTMLElement>): BadgeState => {
  const state: BadgeState = {
    shape: 'circular',
    size: 'medium',
    iconPosition: 'before',
    appearance: 'filled',
    color: 'brand',
    ...props,
    components: {
      root: 'div',
      icon: 'span',
    },
    root: getNativeElementProps('div', {
      ref: useMergedRefs(ref, React.useRef(null)),
      'aria-hidden': true,
      ...props,
    }),
    icon: resolveShorthand(props.icon),
  };

  return state;
};
