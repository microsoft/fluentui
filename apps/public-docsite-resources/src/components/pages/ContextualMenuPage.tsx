import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { ContextualMenuPageProps } from '@fluentui/react-examples/lib/react/ContextualMenu/ContextualMenu.doc';

export const ContextualMenuPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/ContextualMenu.page.json')}
    {...{ ...ContextualMenuPageProps, ...props }}
  />
);
