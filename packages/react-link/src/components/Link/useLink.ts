import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { useLinkState } from './useLinkState';
import type { LinkProps, LinkSlots, LinkState } from './Link.types';

/**
 * Consts listing which props are shorthand props.
 */
export const linkShorthandProps: Array<keyof LinkSlots> = ['root'];

/**
 * Given user props, returns state and render function for a Link.
 */
export const useLink = (props: LinkProps, ref: React.Ref<HTMLElement>): LinkState => {
  const { as, disabled, disabledFocusable, href, inline, rel, target, secondary } = props;
  const rootAs = as || (href ? 'a' : 'button');

  const state: LinkState = {
    // Props passed at the top-level
    disabled,
    disabledFocusable,
    href,
    inline,
    rel,
    secondary,
    target,

    // Slots definition
    components: {
      root: 'a',
    },

    root: getNativeElementProps(rootAs, {
      ref,
      ...props,
    }),
  };
  state.root.as = rootAs;

  useLinkState(state);

  return state;
};
