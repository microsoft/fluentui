import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { LabelPageProps } from '@fluentui/react-examples/lib/react/Label/Label.doc';

export const LabelPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/Label.page.json')}
    {...{ ...LabelPageProps, ...props }}
  />
);
