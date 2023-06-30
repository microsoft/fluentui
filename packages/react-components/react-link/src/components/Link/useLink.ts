import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { useBackgroundAppearance } from '@fluentui/react-shared-contexts';
import { useLinkState_unstable } from './useLinkState';
import type { LinkProps, LinkState } from './Link.types';

/**
 * Given user props, defines default props for the Link, calls useLinkState_unstable, and returns processed state.
 * @param props - User provided props to the Link component.
 * @param ref - User provided ref to be passed to the Link component.
 */
export const useLink_unstable = (
  props: LinkProps,
  ref: React.Ref<HTMLAnchorElement | HTMLButtonElement>,
): LinkState => {
  const backgroundAppearance = useBackgroundAppearance();
  const { appearance = 'default', disabled = false, disabledFocusable = false, inline = false } = props;
  const as = props.as || (props.href ? 'a' : 'button');
  const type = as === 'button' ? 'button' : undefined;

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
      type,
      ...props,
      as,
    }),
    backgroundAppearance,
  };

  useLinkState_unstable(state);

  return state;
};
