'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { SearchBoxProps } from './Search.types';
import { useSearchBox } from './useSearchBox';
import { renderSearchBox } from './renderSearchBox';

/**
 * A search box component for search input.
 */
export const SearchBox: ForwardRefComponent<SearchBoxProps> = React.forwardRef((props, ref) => {
  const state = useSearchBox(props, ref);

  return renderSearchBox(state);
});

SearchBox.displayName = 'SearchBox';
