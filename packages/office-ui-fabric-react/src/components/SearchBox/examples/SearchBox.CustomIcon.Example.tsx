import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

// tslint:disable:jsx-no-lambda
export const SearchBoxCustomIconExample = () => (
  <SearchBox
    placeholder="Filter"
    onFocus={() => console.log('onFocus called')}
    onBlur={() => console.log('onBlur called')}
    iconProps={{ iconName: 'Filter' }}
  />
);
