import * as React from 'react';
import { FloatingPeoplePickerTypesExample } from './FloatingPeoplePicker.Basic.Example';

import { IDocPageProps } from '@fluentui/react-next/lib/common/DocPage.types';

const FloatingPeoplePickerBasicExampleCode = require('!raw-loader!@fluentui/examples/src/react-next/FloatingPeoplePicker/PeoplePicker/FloatingPeoplePicker.Basic.Example.tsx') as string;

export const FloatingPeoplePickerPageProps: IDocPageProps = {
  title: 'FloatingPeoplePicker',
  componentName: 'FloatingPeoplePicker',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/react-next/src/components/FloatingPeoplePicker',
  examples: [
    {
      title: 'Floating People Picker',
      code: FloatingPeoplePickerBasicExampleCode,
      view: <FloatingPeoplePickerTypesExample />,
    },
  ],
  propertiesTablesSources: [
    require('!raw-loader!@fluentui/react-next/src/components/FloatingPicker/BaseFloatingPicker.types.ts') as string,
  ],
  overview: require('!raw-loader!@fluentui/examples/src/react-next/FloatingPeoplePicker/PeoplePicker/docs/FloatingPeoplePickerOverview.md') as string,
  bestPractices: require('!raw-loader!@fluentui/examples/src/react-next/FloatingPeoplePicker/PeoplePicker/docs/FloatingPeoplePickerBestPractices.md') as string,
  dos: require('!raw-loader!@fluentui/examples/src/react-next/FloatingPeoplePicker/PeoplePicker/docs/FloatingPeoplePickerDos.md') as string,
  donts: require('!raw-loader!@fluentui/examples/src/react-next/FloatingPeoplePicker/PeoplePicker/docs/FloatingPeoplePickerDonts.md') as string,
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
