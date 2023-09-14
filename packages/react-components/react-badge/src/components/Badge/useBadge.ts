import * as React from 'react';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';
import type { BadgeProps, BadgeState } from './Badge.types';

/**
 * Returns the props and state required to render the component
 */
export const useBadge_unstable = (props: BadgeProps, ref: React.Ref<HTMLElement>): BadgeState => {
  const {
    shape = 'circular',
    size = 'medium',
    iconPosition = 'before',
    appearance = 'filled',
    color = 'brand',
  } = props;

  const state: BadgeState = {
    shape,
    size,
    iconPosition,
    appearance,
    color,
    components: {
      root: 'div',
      icon: 'span',
    },
    root: slot.always(
      getNativeElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
    icon: slot.optional(props.icon, { elementType: 'span' }),
  };

  return state;
};
