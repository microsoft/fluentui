import * as React from 'react';
import { styled } from '../../Utilities';
import { SearchBoxBase } from './SearchBox.base';
import { getStyles } from './SearchBox.styles';
import type { ISearchBoxProps, ISearchBoxStyleProps, ISearchBoxStyles } from './SearchBox.types';

export const SearchBox: React.FunctionComponent<ISearchBoxProps> = styled<
  ISearchBoxProps,
  ISearchBoxStyleProps,
  ISearchBoxStyles
>(SearchBoxBase, getStyles, undefined, { scope: 'SearchBox' });
