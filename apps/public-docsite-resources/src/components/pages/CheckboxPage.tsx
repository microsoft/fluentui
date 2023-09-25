import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { CheckboxPageProps } from '@fluentui/react-examples/lib/react/Checkbox/Checkbox.doc';

export const CheckboxPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage jsonDocs={require('../../../dist/api/react/Checkbox.page.json')} {...{ ...CheckboxPageProps, ...props }} />
);
