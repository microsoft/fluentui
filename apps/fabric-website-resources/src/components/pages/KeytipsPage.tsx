import * as React from 'react';
import { KeytipLayer } from 'office-ui-fabric-react/lib/KeytipLayer';

import { DemoPage } from '../DemoPage';

import { KeytipsPageProps } from 'office-ui-fabric-react/lib/components/Keytip/Keytips.doc';

export const KeytipsPage = (props: { isHeaderVisible: boolean }) => (
  <div>
    <DemoPage {...{ ...KeytipsPageProps, ...props }} />
    <KeytipLayer content="Alt Windows" />
  </div>
);
