import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { LinkPageProps } from '@fluentui/react-examples/lib/react/Link/Link.doc';

export const LinkPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@fluentui/api-docs/lib/pages/react/Link.page.json')}
    {...{ ...LinkPageProps, ...props }}
  />
);
