import * as React from 'react';

import { BreadcrumbPageProps } from 'office-ui-fabric-react/lib/components/Breadcrumb/Breadcrumb.doc';
import { DemoPage } from '../DemoPage';

export const BreadcrumbPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Breadcrumb.page.json')}
    {...{ ...BreadcrumbPageProps, ...props }}
  />
);
