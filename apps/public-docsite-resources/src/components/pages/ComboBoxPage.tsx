import * as React from 'react';
import { DemoPage } from '../DemoPage';
import { ComboBoxPageProps } from '@fluentui/react-examples/lib/react/ComboBox/ComboBox.doc';

export const ComboBoxPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage jsonDocs={require('../../../dist/api/react/ComboBox.page.json')} {...{ ...ComboBoxPageProps, ...props }} />
);
