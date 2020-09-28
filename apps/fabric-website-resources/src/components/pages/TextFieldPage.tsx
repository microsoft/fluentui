import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { TextFieldPageProps } from '@fluentui/react-examples/lib/react/TextField/TextField.doc';

export const TextFieldPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/TextField.page.json')}
    {...{ ...TextFieldPageProps, ...props }}
  />
);
