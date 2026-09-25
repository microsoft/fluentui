'use client';

import type * as React from 'react';
import { useLink as useLinkBase, useLinkContext } from '@fluentui/react-headless-components-preview/link';
import type { LinkProps, LinkState } from './Link.types';

/**
 * Create the state required to render Link.
 */
export const useLink = (
  props: LinkProps,
  ref: React.Ref<HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement>,
): LinkState => {
  const { inline: inlineContext } = useLinkContext();
  const { appearance = 'default', inline: inlineProp, ...rest } = props;
  const state = useLinkBase(rest, ref);
  const inline = inlineProp ?? !!inlineContext;
  const elementType = state.root.as as 'a' | 'button' | 'span';
  const hasHref = elementType === 'a' && 'href' in state.root && Boolean(state.root.href);

  return {
    ...state,
    root: {
      ...state.root,
      'data-appearance': appearance,
      'data-as': elementType,
      'data-href': hasHref ? '' : undefined,
      'data-inline': inline ? '' : undefined,
    },
    appearance,
    inline,
  };
};
