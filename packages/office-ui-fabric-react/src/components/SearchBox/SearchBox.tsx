import { styled } from '../../Utilities';
import { SearchBoxBase } from './SearchBox.base';
import { ISearchBoxProps } from './SearchBox.types';
import { getStyles } from './SearchBox.styles';

export const SearchBox: (props: ISearchBoxProps) => JSX.Element = styled(
  SearchBoxBase,
  getStyles
);
