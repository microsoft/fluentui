import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { ContextualMenuPageProps } from '@fluentui/react-examples/lib/react/ContextualMenu/ContextualMenu.doc';

export const ContextualMenuPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../dist/api/react/ContextualMenu.page.json')}
    {...{ ...ContextualMenuPageProps, ...props }}
  />
);
