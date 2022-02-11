import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { renderBadge_unstable } from './renderBadge';
import type { BadgeProps, BadgeState, BadgeRender } from './Badge.types';

/**
 * Returns the props and state required to render the component
 */
export const useBadge_unstable = (props: BadgeProps, ref: React.Ref<HTMLElement>): [BadgeState, BadgeRender] => {
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
    root: getNativeElementProps('div', {
      ref,
      'aria-hidden': true,
      ...props,
    }),
    icon: resolveShorthand(props.icon),
  };

  return [state, renderBadge_unstable];
};
