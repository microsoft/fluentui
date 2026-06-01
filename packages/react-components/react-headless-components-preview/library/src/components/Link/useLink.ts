'use client';

import type * as React from 'react';
import { useLinkBase_unstable } from '@fluentui/react-link';

import type { LinkProps, LinkState } from './Link.types';
import { stringifyDataAttribute } from '../../utils';

/**
 * Returns the state for a Link component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderLink`.
 */
export const useLink = (props: LinkProps, ref: React.Ref<HTMLElement>): LinkState => {
  const state: LinkState = useLinkBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled-focusable'] = stringifyDataAttribute(state.disabledFocusable);

  return state;
};
