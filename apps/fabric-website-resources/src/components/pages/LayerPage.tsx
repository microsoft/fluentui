import * as React from 'react';
import { DemoPage } from '../DemoPage';
import { LayerPageProps } from 'office-ui-fabric-react/lib/components/Layer/Layer.doc';

export const LayerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Layer.page.json')}
    {...{ ...LayerPageProps, ...props }}
  />
);
