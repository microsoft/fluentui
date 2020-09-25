import * as React from 'react';
import { DemoPage } from '../DemoPage';
import { ComboBoxPageProps } from '@fluentui/examples/lib/office-ui-fabric-react/ComboBox/ComboBox.doc';

export const ComboBoxPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/ComboBox.page.json')}
    {...{ ...ComboBoxPageProps, ...props }}
  />
);
