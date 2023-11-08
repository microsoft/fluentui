import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
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
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref as React.Ref<HTMLDivElement>,
        ...props,
      }),
      { elementType: 'div' },
    ),
    icon: slot.optional(props.icon, { elementType: 'span' }),
  };

  return state;
};
