import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { ImagePageProps } from 'office-ui-fabric-react/lib/components/Image/Image.doc';

export const ImagePage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Image.page.json')}
    {...{ ...ImagePageProps, ...props }}
  />
);
