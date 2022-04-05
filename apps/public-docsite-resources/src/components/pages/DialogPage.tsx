import * as React from 'react';
import { DemoPage } from '../DemoPage';
import { DialogPageProps } from '@fluentui/react-examples/lib/react/Dialog/Dialog.doc';

export const DialogPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage jsonDocs={require('../../../dist/api/react/Dialog.page.json')} {...{ ...DialogPageProps, ...props }} />
);
