import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { BadgeBaseProps, BadgeBaseState, BadgeProps, BadgeState } from './Badge.types';

/**
 * Returns the props and state required to render the component
 */
export const useBadge_unstable = (props: BadgeProps, ref: React.Ref<HTMLElement>): BadgeState => {
  const {
    shape = 'circular',
    size = 'medium',
    appearance = 'filled',
    color = 'brand',
    ...badgeProps
  } = props;

  const state = useBadgeBase_unstable(badgeProps, ref);

  return {
    ...state,
    shape,
    size,
    appearance,
    color,
  };
};

/**
 * Base hook for Badge component, which manages state related to slots structure and ARIA attributes.
 *
 * @param props - User provided props to the Badge component.
 * @param ref - User provided ref to be passed to the Badge component.
 */
export const useBadgeBase_unstable = (props: BadgeBaseProps, ref: React.Ref<HTMLElement>): BadgeBaseState => {
  const { iconPosition = 'before' } = props;

  return {
    iconPosition,
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
};
