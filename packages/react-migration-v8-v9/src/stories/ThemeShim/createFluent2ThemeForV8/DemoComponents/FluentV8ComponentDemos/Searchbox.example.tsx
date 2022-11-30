import type { IStackTokens } from '@fluentui/react';
import { Stack } from '@fluentui/react';
import { SearchBox } from '@fluentui/react';
import * as React from 'react';

const stackTokens: Partial<IStackTokens> = { childrenGap: 20 };

/* eslint-disable react/jsx-no-bind */
export const SearchBoxFullSizeExample = () => {
  return (
    <Stack tokens={stackTokens}>
      <SearchBox placeholder="Search" />
      <SearchBox placeholder="Search with no animation" disableAnimation />
      <SearchBox placeholder="Search" underlined={true} />
    </Stack>
  );
};
