import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

// tslint:disable:jsx-no-lambda
export const SearchBoxUnderlinedExample: React.FunctionComponent = () => {
  return (
    <SearchBox
      placeholder="Search"
      underlined={true}
      onFocus={() => console.log('onFocus called')}
      onBlur={() => console.log('onBlur called')}
      styles={{ root: { maxWidth: 300 } }}
    />
  );
};
