import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { CheckboxPageProps } from '@fluentui/react-examples/lib/react-checkbox/Checkbox/Checkbox.doc';

export const CheckboxPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/Checkbox.page.json')}
    {...{ ...CheckboxPageProps, ...props }}
  />
);
