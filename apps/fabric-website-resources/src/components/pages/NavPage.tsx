import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { NavPageProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Nav/Nav.doc';

export const NavPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Nav.page.json')}
    {...{ ...NavPageProps, ...props }}
  />
);
