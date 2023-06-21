import * as React from 'react';
import { SearchBox, SearchBoxProps } from '@fluentui/react-search';

import { FilterRegular } from '@fluentui/react-icons';

// TODO: split into different stories
export const Default = (props: Partial<SearchBoxProps>) => (
  <>
    <SearchBox {...props} contentAfter={<FilterRegular />} size="small" placeholder="small" />
    <SearchBox {...props} contentAfter={<FilterRegular />} size="medium" placeholder="medium" />
    <SearchBox {...props} contentAfter={<FilterRegular />} size="large" placeholder="large" />
    <SearchBox {...props} contentAfter={null} placeholder="no contentAfter" />
    <SearchBox {...props} contentAfter={<FilterRegular />} disabled placeholder="disabled" />
    <SearchBox
      {...props}
      contentAfter={<FilterRegular tabIndex={0} onClick={() => console.log('clicked')} />}
      placeholder="contentAfter button"
    />
    <SearchBox root={{ onFocus: () => console.log('test') }} placeholder="custom onFocus" />
  </>
);
