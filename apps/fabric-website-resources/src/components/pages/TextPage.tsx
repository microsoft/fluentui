import * as React from 'react';

import { TextPageProps } from 'office-ui-fabric-react/lib/components/Text/Text.doc';
import { DemoPage } from '../DemoPage';

export const TextPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Text.page.json')} {...{ ...TextPageProps, ...props }} />
);
