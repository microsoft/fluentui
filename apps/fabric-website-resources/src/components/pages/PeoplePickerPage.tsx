import * as React from 'react';
import { DemoPage } from '../DemoPage';
import { PeoplePickerPageProps } from '@fluentui/react-examples/lib/react/PeoplePicker/PeoplePicker.doc';

export const PeoplePickerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/PeoplePicker.page.json')}
    {...{ ...PeoplePickerPageProps, ...props }}
  />
);
