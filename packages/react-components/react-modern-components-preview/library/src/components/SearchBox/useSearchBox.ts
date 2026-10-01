'use client';

import * as React from 'react';
import { useSearchBox as useSearchBoxBase } from '@fluentui/react-headless-components-preview/search-box';
import { DismissRegular, SearchRegular } from '@fluentui/react-icons';
import type { SearchBoxProps, SearchBoxState } from './SearchBox.types';

/**
 * Create the state required to render SearchBox.
 */
export const useSearchBox = (props: SearchBoxProps, ref: React.Ref<HTMLInputElement>): SearchBoxState => {
  const { appearance = 'outline', size = 'medium', ...rest } = props;
  const state = useSearchBoxBase(rest, ref);

  return {
    ...state,
    contentBefore: state.contentBefore && {
      ...state.contentBefore,
      children: state.contentBefore.children ?? React.createElement(SearchRegular),
    },
    dismiss: state.dismiss && {
      ...state.dismiss,
      children: state.dismiss.children ?? React.createElement(DismissRegular),
    },
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
