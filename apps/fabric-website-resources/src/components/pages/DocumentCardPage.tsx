import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { DocumentCardPageProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/DocumentCard/DocumentCard.doc';

export const DocumentCardPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/DocumentCard.page.json')}
    {...{ ...DocumentCardPageProps, ...props }}
  />
);
