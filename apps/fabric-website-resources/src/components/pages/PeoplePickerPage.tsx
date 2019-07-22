import * as React from 'react';
import { DemoPage } from '../DemoPage';
import { PeoplePickerPageProps } from 'office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePicker.doc';

export const PeoplePickerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/PeoplePicker.page.json')}
    {...{ ...PeoplePickerPageProps, ...props }}
  />
);
