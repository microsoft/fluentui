import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { NavPageProps } from '@fluentui/react-examples/lib/react/Nav/Nav.doc';

export const NavPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage jsonDocs={require('@uifabric/api-docs/lib/pages/react/Nav.page.json')} {...{ ...NavPageProps, ...props }} />
);
