import * as React from 'react';

import { TextPageProps } from '@fluentui/react-examples/lib/react/Text/Text.doc';
import { DemoPage } from '../DemoPage';

export const TextPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/Text.page.json')}
    {...{ ...TextPageProps, ...props }}
  />
);
