import * as React from 'react';
import { SearchBox, SearchBoxProps } from '@fluentui/react-search';

import { FilterRegular } from '@fluentui/react-icons';

export const Default = (props: Partial<SearchBoxProps>) => (
  <>
    <SearchBox {...props} contentAfter={<FilterRegular />} size="small" />
    <SearchBox {...props} contentAfter={<FilterRegular />} />
    <SearchBox {...props} contentAfter={<FilterRegular />} size="large" />
    <SearchBox {...props} contentAfter={null} />
  </>
);
