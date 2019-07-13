import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { FacepilePageProps } from 'office-ui-fabric-react/lib/components/Facepile/Facepile.doc';

export const FacepilePage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Facepile.page.json')}
    {...{ ...FacepilePageProps, ...props }}
  />
);
