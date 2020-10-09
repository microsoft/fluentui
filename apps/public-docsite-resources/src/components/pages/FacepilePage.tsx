import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { FacepilePageProps } from '@fluentui/react-examples/lib/react/Facepile/Facepile.doc';

export const FacepilePage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/Facepile.page.json')}
    {...{ ...FacepilePageProps, ...props }}
  />
);
