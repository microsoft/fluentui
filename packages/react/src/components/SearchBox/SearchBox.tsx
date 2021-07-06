import * as React from 'react';
import { styled } from '../../Utilities';
import { SearchBoxBase } from './SearchBox.base';
import { ISearchBoxProps, ISearchBoxStyleProps, ISearchBoxStyles } from './SearchBox.types';
import { getStyles } from './SearchBox.styles';

export const SearchBox: React.FunctionComponent<ISearchBoxProps> = styled<
  ISearchBoxProps,
  ISearchBoxStyleProps,
  ISearchBoxStyles
>(SearchBoxBase, getStyles, undefined, { scope: 'SearchBox' });
