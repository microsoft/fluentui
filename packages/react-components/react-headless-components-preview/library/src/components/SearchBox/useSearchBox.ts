'use client';

import type * as React from 'react';
import { useSearchBoxBase_unstable } from '@fluentui/react-search';

import type { SearchBoxProps, SearchBoxState } from './Search.types';
import { stringifyDataAttribute } from '../../utils';

/**
 * Returns the state for a SearchBox component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderSearchBox`.
 */
export const useSearchBox = (props: SearchBoxProps, ref: React.Ref<HTMLInputElement>): SearchBoxState => {
  'use no memo';

  const state: SearchBoxState = useSearchBoxBase_unstable(props, ref);

  // Set data attributes for disabled and focused states to simplify styling of these states.
  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  state.root['data-focused'] = stringifyDataAttribute(state.focused);

  return state;
};
