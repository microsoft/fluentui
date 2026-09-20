'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderSearchBox } from './renderSearchBox';
import type { SearchBoxProps } from './SearchBox.types';
import { useSearchBox } from './useSearchBox';
import { useSearchBoxStyles } from './useSearchBoxStyles.styles';

/**
 * SearchBox allows users to enter search queries and clear the current value.
 */
export const SearchBox: ForwardRefComponent<SearchBoxProps> = React.forwardRef<HTMLInputElement, SearchBoxProps>(
  (props, ref) => {
    const state = useSearchBox(props, ref);
    useSearchBoxStyles(state);
    return renderSearchBox(state);
  },
);

SearchBox.displayName = 'SearchBox';
