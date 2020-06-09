import * as React from 'react';
import { FloatingPeoplePickerTypesExample } from '../PeoplePicker/examples/FloatingPeoplePicker.Basic.Example';

import { IDocPageProps } from '../../../common/DocPage.types';

const FloatingPeoplePickerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FloatingPicker/PeoplePicker/examples/FloatingPeoplePicker.Basic.Example.tsx') as string;

export const FloatingPeoplePickerPageProps: IDocPageProps = {
  title: 'FloatingPeoplePicker',
  componentName: 'FloatingPeoplePicker',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/FloatingPeoplePicker',
  examples: [
    {
      title: 'Floating People Picker',
      code: FloatingPeoplePickerBasicExampleCode,
      view: <FloatingPeoplePickerTypesExample />,
    },
  ],
  propertiesTablesSources: [
    require('!raw-loader!office-ui-fabric-react/src/components/FloatingPicker/BaseFloatingPicker.types.ts') as string,
  ],
  overview: require('!raw-loader!office-ui-fabric-react/src/components/FloatingPicker/PeoplePicker/docs/FloatingPeoplePickerOverview.md') as string,
  bestPractices: require('!raw-loader!office-ui-fabric-react/src/components/FloatingPicker/PeoplePicker/docs/FloatingPeoplePickerBestPractices.md') as string,
  dos: require('!raw-loader!office-ui-fabric-react/src/components/FloatingPicker/PeoplePicker/docs/FloatingPeoplePickerDos.md') as string,
  donts: require('!raw-loader!office-ui-fabric-react/src/components/FloatingPicker/PeoplePicker/docs/FloatingPeoplePickerDonts.md') as string,
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
