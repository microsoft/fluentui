import * as React from 'react';
import { DemoPage } from '../DemoPage';
import { PeoplePickerPageProps } from '@fluentui/react-examples/lib/react/PeoplePicker/PeoplePicker.doc';

export const PeoplePickerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../dist/api/react/PeoplePicker.page.json')}
    {...{ ...PeoplePickerPageProps, ...props }}
  />
);
