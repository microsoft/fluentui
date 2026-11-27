'use client';

import type * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { useBackgroundAppearance } from '@fluentui/react-shared-contexts';
import { useLinkState_unstable } from './useLinkState';
import type { LinkBaseProps, LinkBaseState, LinkProps, LinkState } from './Link.types';
import { useLinkContext } from '../../contexts/linkContext';

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
  const { inline: inlineContext } = useLinkContext();
  const { appearance = 'default', inline: inlineProp, ...baseProps } = props;

  const state = useLinkBase_unstable(baseProps, ref);

  return {
    appearance,
    backgroundAppearance,
    inline: inlineProp ?? !!inlineContext,
    ...state,
  };
};

/**
 * Base hook for Link component, which manages state related to ARIA, keyboard handling,
 * disabled behavior, and slot structure. This hook excludes design-specific props (appearance, inline).
 *
 * @param props - User provided props to the Link component.
 * @param ref - User provided ref to be passed to the Link component.
 */
export const useLinkBase_unstable = (
  props: LinkBaseProps,
  ref: React.Ref<HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement>,
): LinkBaseState => {
  const { disabled = false, disabledFocusable = false, ...rest } = props;

  const elementType = props.as || (props.href ? 'a' : 'button');

  // Casting is required here as `as` prop would break the union between `a`, `button` and `span` types
  const propsWithAssignedAs = {
    role: elementType === 'span' ? 'button' : undefined,
    type: elementType === 'button' ? 'button' : undefined,
    ...rest,
    as: elementType,
  } as LinkBaseProps;

  const state: LinkBaseState = {
    // Props passed at the top-level
    disabled,
    disabledFocusable,

    // Slots definition
    components: {
      root: elementType,
    },

    root: slot.always(
      {
        ref,
        ...propsWithAssignedAs,
      } as LinkBaseState['root'],
      { elementType },
    ),
  };

  useLinkState_unstable(state);

  return state;
};
