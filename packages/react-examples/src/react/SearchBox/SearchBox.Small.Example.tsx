import * as React from 'react';
import { SearchBox, ISearchBoxStyles } from '@fluentui/react/lib/SearchBox';

const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200 } };

/* eslint-disable react/jsx-no-bind */
export const SearchBoxSmallExample = () => (
  <SearchBox
    styles={searchBoxStyles}
    placeholder="Search"
    onEscape={ev => {
      console.log('Custom onEscape Called');
    }}
    onClear={ev => {
      console.log('Custom onClear Called');
    }}
    onChange={(_, newValue) => console.log('SearchBox onChange fired: ' + newValue)}
    onSearch={newValue => console.log('SearchBox onSearch fired: ' + newValue)}
  />
);
