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
  const rootAs = props.href ? 'a' : 'button';

  const state: LinkState = {
    // Forwarded ref
    ref,

    // Props passed at the top-level
    disabled: props.disabled,
    disabledFocusable: props.disabledFocusable,

    // Slots definition
    components: {
      root: rootAs,
    },

    root: getNativeElementProps(props.as || rootAs, props),
  };

  useLinkState(state);

  return state;
};
