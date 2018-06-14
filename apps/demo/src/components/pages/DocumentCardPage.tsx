import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { DocumentCardPageProps } from 'office-ui-fabric-react/lib/components/DocumentCard/DocumentCard.doc';

export const DocumentCardPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DocumentCardPageProps, ...props }} />
);
