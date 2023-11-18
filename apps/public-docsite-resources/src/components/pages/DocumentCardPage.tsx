import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { DocumentCardPageProps } from '@fluentui/react-examples/lib/react/DocumentCard/DocumentCard.doc';

export const DocumentCardPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../dist/api/react/DocumentCard.page.json')}
    {...{ ...DocumentCardPageProps, ...props }}
  />
);
