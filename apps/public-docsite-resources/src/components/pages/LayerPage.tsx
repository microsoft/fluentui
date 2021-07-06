import * as React from 'react';
import { DemoPage } from '../DemoPage';
import { LayerPageProps } from '@fluentui/react-examples/lib/react/Layer/Layer.doc';

export const LayerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@fluentui/api-docs/lib/pages/react/Layer.page.json')}
    {...{ ...LayerPageProps, ...props }}
  />
);
