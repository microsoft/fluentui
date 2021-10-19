import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { ImagePageProps } from '@fluentui/react-examples/lib/react/Image/Image.doc';

export const ImagePage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage jsonDocs={require('../../../dist/api/react/Image.page.json')} {...{ ...ImagePageProps, ...props }} />
);
