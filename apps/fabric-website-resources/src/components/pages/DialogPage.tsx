import * as React from 'react';
import { DemoPage } from '../DemoPage';
import { DialogPageProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Dialog/Dialog.doc';

export const DialogPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Dialog.page.json')}
    {...{ ...DialogPageProps, ...props }}
  />
);
