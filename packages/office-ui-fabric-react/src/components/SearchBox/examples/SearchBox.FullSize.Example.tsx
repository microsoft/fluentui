import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/Stack';

const stackTokens: Partial<IStackTokens> = { childrenGap: 20 };

// tslint:disable:jsx-no-lambda
export const SearchBoxFullSizeExample = () => {
  return (
    <Stack tokens={stackTokens}>
      <SearchBox placeholder="Search" onSearch={newValue => console.log('value is ' + newValue)} />
      <SearchBox
        placeholder="Search with no animation"
        onSearch={newValue => console.log('value is ' + newValue)}
        disableAnimation
      />
    </Stack>
  );
};
