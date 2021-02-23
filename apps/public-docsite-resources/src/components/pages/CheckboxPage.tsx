import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { CheckboxPageProps } from '@fluentui/react-examples/lib/react/Checkbox/Checkbox.doc';

export const CheckboxPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@fluentui/api-docs/lib/pages/react/Checkbox.page.json')}
    {...{ ...CheckboxPageProps, ...props }}
  />
);
