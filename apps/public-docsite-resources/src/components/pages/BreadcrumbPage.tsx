import * as React from 'react';

import { BreadcrumbPageProps } from '@fluentui/react-examples/lib/react/Breadcrumb/Breadcrumb.doc';
import { DemoPage } from '../DemoPage';

export const BreadcrumbPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../dist/api/react/Breadcrumb.page.json')}
    {...{ ...BreadcrumbPageProps, ...props }}
  />
);
