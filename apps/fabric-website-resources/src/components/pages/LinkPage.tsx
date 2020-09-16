import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { LinkPageProps } from '@fluentui/examples/lib/office-ui-fabric-react/Link/Link.doc';

export const LinkPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Link.page.json')}
    {...{ ...LinkPageProps, ...props }}
  />
);
