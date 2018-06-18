import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { FloatingPeoplePickerPageProps } from 'office-ui-fabric-react/lib/components/FloatingPicker/PeoplePicker/FloatingPeoplePicker.doc';

export const FloatingPeoplePickerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...FloatingPeoplePickerPageProps, ...props }} />
);
