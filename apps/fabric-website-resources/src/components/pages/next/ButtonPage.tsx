import * as React from 'react';

import { DemoPage } from '../../DemoPage';
import { ButtonPageProps } from 'office-ui-fabric-react/lib/components/Button/next/Button.doc';

export const ButtonPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Button.page.json')}
    {...{ ...ButtonPageProps, ...props }}
  />
);
