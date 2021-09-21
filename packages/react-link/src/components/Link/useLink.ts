import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { useLinkState } from './useLinkState';
import type { LinkProps, LinkState } from './Link.types';

/**
 * Given user props, defines default props for the Link, calls useLinkState, and returns processed state.
 * @param props - User provided props to the Link component.
 * @param ref - User provided ref to be passed to the Link component.
 */
export const useLink = (props: LinkProps, ref: React.Ref<HTMLAnchorElement | HTMLButtonElement>): LinkState => {
  const { disabled, disabledFocusable, inline, secondary } = props;
  const as = props.as || (props.href ? 'a' : 'button');

  const state: LinkState = {
    // Props passed at the top-level
    disabled,
    disabledFocusable,
    inline,
    secondary,

    // Slots definition
    components: {
      root: 'a',
    },

    root: getNativeElementProps(as, {
      ref,
      ...props,
      as,
    }),
  };

  useLinkState(state);

  return state;
};
