import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { ContextualMenuPageProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/ContextualMenu/ContextualMenu.doc';

export const ContextualMenuPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/ContextualMenu.page.json')}
    {...{ ...ContextualMenuPageProps, ...props }}
  />
);
