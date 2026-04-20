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
  'use no memo';

  const state: LinkState = useLinkBase_unstable(props, ref);

  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  state.root['data-disabled-focusable'] = stringifyDataAttribute(state.disabledFocusable);

  return state;
};
