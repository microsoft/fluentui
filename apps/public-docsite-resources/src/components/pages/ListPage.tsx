import * as React from 'react';

import { ListPageProps } from '@fluentui/react-examples/lib/react/List/List.doc';
import { DemoPage } from '../DemoPage';

export const ListPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage jsonDocs={require('../../../dist/api/react/List.page.json')} {...{ ...ListPageProps, ...props }} />
);
