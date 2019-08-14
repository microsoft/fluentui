import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

export const SearchBoxCustomIconExample: React.FunctionComponent = () => {
  return (
    <SearchBox
      placeholder="Filter"
      iconProps={{
        iconName: 'Filter'
      }}
      styles={{ root: { maxWidth: 300 } }}
    />
  );
};
