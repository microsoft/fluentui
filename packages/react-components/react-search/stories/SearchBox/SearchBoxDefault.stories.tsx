import * as React from 'react';
import { SearchBox, SearchBoxProps } from '@fluentui/react-search';

import { FilterRegular } from '@fluentui/react-icons';

export const Default = (props: Partial<SearchBoxProps>) => <SearchBox {...props} contentAfter={<FilterRegular />} />;
