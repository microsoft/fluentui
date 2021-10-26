import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { PickersPageProps } from '@fluentui/react-examples/lib/react/Pickers/Pickers.doc';

export const PickersPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage jsonDocs={require('../../../dist/api/react/Pickers.page.json')} {...{ ...PickersPageProps, ...props }} />
);
