import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { ExtendedPeoplePickerPageProps } from '@fluentui/react-examples/lib/react/ExtendedPeoplePicker/ExtendedPeoplePicker.doc';

export const ExtendedPeoplePickerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../dist/api/react/ExtendedPeoplePicker.page.json')}
    {...{ ...ExtendedPeoplePickerPageProps, ...props }}
  />
);
