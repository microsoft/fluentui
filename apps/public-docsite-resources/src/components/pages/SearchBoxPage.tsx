import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { SearchBoxPageProps } from '@fluentui/react-examples/lib/react/SearchBox/SearchBox.doc';

export const SearchBoxPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/SearchBox.page.json')}
    {...{ ...SearchBoxPageProps, ...props }}
  />
);
