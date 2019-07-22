import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { DropdownPageProps } from 'office-ui-fabric-react/lib/components/Dropdown/Dropdown.doc';

export const DropdownPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Dropdown.page.json')}
    {...{ ...DropdownPageProps, ...props }}
  />
);
