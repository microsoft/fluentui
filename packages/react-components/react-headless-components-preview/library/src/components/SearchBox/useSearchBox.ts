'use client';

import type * as React from 'react';
import { useSearchBoxBase_unstable } from '@fluentui/react-search';

import type { SearchBoxProps, SearchBoxState } from './Search.types';

/**
 * Returns the state for a SearchBox component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderSearchBox`.
 */
export const useSearchBox = (props: SearchBoxProps, ref: React.Ref<HTMLInputElement>): SearchBoxState => {
  const state = useSearchBoxBase_unstable(props, ref);

  return state;
};
