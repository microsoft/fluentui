import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { DatePickerPageProps } from '@fluentui/react-examples/lib/react/DatePicker/DatePicker.doc';

export const DatePickerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/DatePicker.page.json')}
    {...{ ...DatePickerPageProps, ...props }}
  />
);
