import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { DatePickerPageProps } from '@fluentui/react-examples/lib/react/DatePicker/DatePicker.doc';

export const DatePickerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../dist/api/react/DatePicker.page.json')}
    {...{ ...DatePickerPageProps, ...props }}
  />
);
