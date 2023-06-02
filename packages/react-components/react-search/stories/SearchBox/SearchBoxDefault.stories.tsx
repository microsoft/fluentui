import * as React from 'react';
import { SearchBox, SearchBoxProps } from '@fluentui/react-search';

import { DismissRegular, FilterRegular, SearchRegular } from '@fluentui/react-icons';

export const Default = (props: Partial<SearchBoxProps>) => (
  <SearchBox
    {...props}
    contentBefore={<SearchRegular />}
    contentAfter={<FilterRegular />}
    dismiss={<DismissRegular />}
  />
);
