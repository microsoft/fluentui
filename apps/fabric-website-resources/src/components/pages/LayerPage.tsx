import * as React from 'react';
import { DemoPage } from '../DemoPage';
import { LayerPageProps } from '@fluentui/examples/lib/office-ui-fabric-react/Layer/Layer.doc';

export const LayerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Layer.page.json')}
    {...{ ...LayerPageProps, ...props }}
  />
);
