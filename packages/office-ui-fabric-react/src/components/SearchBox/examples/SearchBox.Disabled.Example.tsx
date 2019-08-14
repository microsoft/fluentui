import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

export const SearchBoxDisabledExample: React.FunctionComponent = () => {
  return (
    <Stack tokens={{ childrenGap: 20 }} styles={{ root: { maxWidth: 300 } }}>
      <SearchBox placeholder="Search" disabled />

      <SearchBox placeholder="Search" underlined={true} disabled />
    </Stack>
  );
};
