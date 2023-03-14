import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { TimePickerPageProps } from '@fluentui/react-examples/lib/react/TimePicker/TimePicker.doc';

export const TimePickerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../dist/api/react/TimePicker.page.json')}
    {...{ ...TimePickerPageProps, ...props }}
  />
);
