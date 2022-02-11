import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { useLinkState_unstable } from './useLinkState';
import { useLinkStyles_unstable } from './useLinkStyles';
import { renderLink_unstable } from './renderLink';
import type { LinkProps, LinkState, LinkRender } from './Link.types';

/**
 * Given user props, defines default props for the Link, calls useLinkState_unstable, and returns processed state.
 * @param props - User provided props to the Link component.
 * @param ref - User provided ref to be passed to the Link component.
 */
export const useLink_unstable = (
  props: LinkProps,
  ref: React.Ref<HTMLAnchorElement | HTMLButtonElement>,
): [LinkState, LinkRender] => {
  const { appearance, disabled, disabledFocusable, inline } = props;
  const as = props.as || (props.href ? 'a' : 'button');

  // TODO: clean up, this does _some_ state work here in the useLink hook and the rest in the useLinkState fn below.
  const state: LinkState = {
    // Props passed at the top-level
    appearance,
    disabled,
    disabledFocusable,
    inline,

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

  // TODO: clean up, this does _some_ state work here in the useLink hook and the rest in the useLinkState fn below.
  useLinkState_unstable(state);
  useLinkStyles_unstable(state);
  return [state, renderLink_unstable];
};
