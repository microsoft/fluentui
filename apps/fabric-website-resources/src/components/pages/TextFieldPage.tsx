import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { TextFieldPageProps } from 'office-ui-fabric-react/lib/packages/react-fundamentals/components/TextField/TextField.doc';

export const TextFieldPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/TextField.page.json')}
    {...{ ...TextFieldPageProps, ...props }}
  />
);
