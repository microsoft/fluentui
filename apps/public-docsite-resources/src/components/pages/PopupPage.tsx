import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { PopupPageProps } from '@fluentui/react-examples/lib/react/Popup/Popup.doc';

export const PopupPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage jsonDocs={require('../../../dist/api/react/Popup.page.json')} {...{ ...PopupPageProps, ...props }} />
);
