import * as React from 'react';
import { SearchBox, SearchBoxProps } from '@fluentui/react-search';

import { FilterRegular } from '@fluentui/react-icons';

export const Default = (props: Partial<SearchBoxProps>) => (
  <>
    <SearchBox {...props} contentAfter={<FilterRegular />} size="small" placeholder="small" />
    <SearchBox {...props} contentAfter={<FilterRegular />} size="medium" placeholder="medium" />
    <SearchBox {...props} contentAfter={<FilterRegular />} size="large" placeholder="large" />
    <SearchBox {...props} contentAfter={null} placeholder="no contentAfter" />
    <SearchBox {...props} contentAfter={<FilterRegular />} disabled placeholder="disabled" />
  </>
);
