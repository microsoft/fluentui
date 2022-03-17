import * as React from 'react';

import { TextPageProps } from '@fluentui/react-examples/lib/react/Text/Text.doc';
import { DemoPage } from '../DemoPage';

export const TextPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage jsonDocs={require('../../../dist/api/react/Text.page.json')} {...{ ...TextPageProps, ...props }} />
);
