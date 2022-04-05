import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { ModalPageProps } from '@fluentui/react-examples/lib/react/Modal/Modal.doc';

export const ModalPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage jsonDocs={require('../../../dist/api/react/Modal.page.json')} {...{ ...ModalPageProps, ...props }} />
);
