'use client';

import type * as React from 'react';
import { useSearchBox as useSearchBoxBase } from '@fluentui/react-headless-components-preview/search-box';
import type { SearchBoxProps, SearchBoxState } from './SearchBox.types';

/**
 * Create the state required to render SearchBox.
 */
export const useSearchBox = (props: SearchBoxProps, ref: React.Ref<HTMLInputElement>): SearchBoxState => {
  const { appearance = 'outline', size = 'medium', ...rest } = props;
  const state = useSearchBoxBase(rest, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-appearance': appearance,
      'data-invalid': `${state.input['aria-invalid']}` === 'true' ? '' : undefined,
      'data-size': size,
    },
    appearance,
    size,
  };
};
