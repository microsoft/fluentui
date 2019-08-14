import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

// tslint:disable:jsx-no-lambda
export const SearchBoxCustomEventsExample: React.FunctionComponent = () => {
  return (
    <SearchBox
      styles={{ root: { width: 200 } }}
      placeholder="Search"
      onEscape={() => console.log('Custom onEscape Called')}
      onClear={() => console.log('Custom onClear Called')}
      onChange={(_, newValue) => console.log('SearchBox onChange fired: ' + newValue)}
      onSearch={newValue => console.log('SearchBox onSearch fired: ' + newValue)}
      onFocus={() => console.log('onFocus called')}
      onBlur={() => console.log('onBlur called')}
    />
  );
};
