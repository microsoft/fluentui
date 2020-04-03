import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

// tslint:disable:jsx-no-lambda
export const SearchBoxDisabledExample = () => (
  <Stack tokens={{ childrenGap: 20 }}>
    <SearchBox
      placeholder="Search"
      onFocus={() => console.log('onFocus called')}
      onBlur={() => console.log('onBlur called')}
      disabled
    />
    <SearchBox
      placeholder="Search"
      onFocus={() => console.log('onFocus called')}
      onBlur={() => console.log('onBlur called')}
      underlined={true}
      disabled
    />
  </Stack>
);
