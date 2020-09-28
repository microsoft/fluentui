import * as React from 'react';
import { DemoPage } from '../DemoPage';
import { ComboBoxPageProps } from '@fluentui/react-examples/lib/react/ComboBox/ComboBox.doc';

export const ComboBoxPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/ComboBox.page.json')}
    {...{ ...ComboBoxPageProps, ...props }}
  />
);
