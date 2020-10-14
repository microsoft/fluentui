import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { ExtendedPeoplePickerPageProps } from '@fluentui/react-examples/lib/react/ExtendedPeoplePicker/ExtendedPeoplePicker.doc';

export const ExtendedPeoplePickerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/ExtendedPeoplePicker.page.json')}
    {...{ ...ExtendedPeoplePickerPageProps, ...props }}
  />
);
