import * as React from 'react';
import { KeytipLayer } from 'office-ui-fabric-react/lib/KeytipLayer';

import { DemoPage } from '../DemoPage';

import { KeytipsPageProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Keytip/Keytips.doc';

export const KeytipsPage = (props: { isHeaderVisible: boolean }) => (
  <div>
    <DemoPage
      jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Keytips.page.json')}
      {...{ ...KeytipsPageProps, ...props }}
    />
    <KeytipLayer content="Alt Windows" />
  </div>
);
