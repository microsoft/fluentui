import * as React from 'react';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';

const stackTokens: Partial<IStackTokens> = { childrenGap: 20 };

export const SearchBoxDisabledExample = () => (
  <Stack tokens={stackTokens}>
    <SearchBox placeholder="Search" disabled />
    <SearchBox placeholder="Search" underlined={true} disabled />
  </Stack>
);
