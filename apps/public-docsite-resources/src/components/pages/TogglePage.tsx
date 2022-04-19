import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { TogglePageProps } from '@fluentui/react-examples/lib/react/Toggle/Toggle.doc';

export const TogglePage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage jsonDocs={require('../../../dist/api/react/Toggle.page.json')} {...{ ...TogglePageProps, ...props }} />
);
