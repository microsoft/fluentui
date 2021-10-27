import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { FloatingPeoplePickerPageProps } from '@fluentui/react-examples/lib/react/FloatingPeoplePicker/FloatingPeoplePicker.doc';

export const FloatingPeoplePickerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../dist/api/react/FloatingPeoplePicker.page.json')}
    {...{ ...FloatingPeoplePickerPageProps, ...props }}
  />
);
