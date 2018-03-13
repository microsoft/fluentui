import { styled } from '../../Utilities';
import { SearchBoxBase } from './SearchBox.base';
// tslint:disable-next-line:no-unused-variable
import { ISearchBoxProps } from './SearchBox.types';
import { getStyles } from './SearchBox.styles';

export const SearchBox = styled(
  SearchBoxBase,
  getStyles
);
