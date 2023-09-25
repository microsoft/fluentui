import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { IconPageProps } from '@fluentui/react-examples/lib/react/Icon/Icon.doc';

export const IconPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage jsonDocs={require('../../../dist/api/react/Icon.page.json')} {...{ ...IconPageProps, ...props }} />
);
