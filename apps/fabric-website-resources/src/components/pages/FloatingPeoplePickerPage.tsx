import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { FloatingPeoplePickerPageProps } from '@fluentui/examples/lib/office-ui-fabric-react/FloatingPeoplePicker/FloatingPeoplePicker.doc';

export const FloatingPeoplePickerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/FloatingPeoplePicker.page.json')}
    {...{ ...FloatingPeoplePickerPageProps, ...props }}
  />
);
