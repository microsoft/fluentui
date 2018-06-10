import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { DatePickerPageProps } from 'office-ui-fabric-react/lib/components/DatePicker/DatePicker.doc';

export const DatePickerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DatePickerPageProps, ...props }} />
);
