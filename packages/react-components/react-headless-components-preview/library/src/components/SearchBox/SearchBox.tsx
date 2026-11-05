'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { SearchBoxProps } from './Search.types';
import { useSearchBox } from './useSearchBox';
import { renderSearchBox } from './renderSearchBox';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A search box component for search input.
 */
export const SearchBox: ForwardRefComponent<SearchBoxProps> = /*#__PURE__*/ composeComponent(
  'SearchBox',
  useSearchBox,
  renderSearchBox,
);
