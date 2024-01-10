import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
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
  ref: React.Ref<HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement>,
): LinkState => {
  const backgroundAppearance = useBackgroundAppearance();
  const { appearance = 'default', disabled = false, disabledFocusable = false, inline = false } = props;

  const elementType = props.as || (props.href ? 'a' : 'button');

  // Casting is required here as `as` prop would break the union between `a`, `button` and `span` types
  const propsWithAssignedAs = {
    role: elementType === 'span' ? 'button' : undefined,
    type: elementType === 'button' ? 'button' : undefined,
    ...props,
    as: elementType,
  } as LinkProps;

  const state: LinkState = {
    // Props passed at the top-level
    appearance,
    disabled,
    disabledFocusable,
    inline,

    // Slots definition
    components: {
      root: elementType,
    },

    root: slot.always(
      getIntrinsicElementProps<LinkProps>(elementType, {
        ref,
        ...propsWithAssignedAs,
      } as const),
      { elementType },
    ),
    backgroundAppearance,
  };

  useLinkState_unstable(state);

  return state;
};
