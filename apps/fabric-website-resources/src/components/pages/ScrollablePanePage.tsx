import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { ScrollablePanePageProps } from 'office-ui-fabric-react/lib/components/ScrollablePane/ScrollablePane.doc';

export const ScrollablePanePage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...ScrollablePanePageProps, ...props }} />
);
