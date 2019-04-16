import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { ExtendedPeoplePickerPageProps } from 'office-ui-fabric-react/lib/components/ExtendedPicker/PeoplePicker/ExtendedPeoplePicker.doc';

export const ExtendedPeoplePickerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/ExtendedPeoplePicker.page.json')}
    {...{ ...ExtendedPeoplePickerPageProps, ...props }}
  />
);
