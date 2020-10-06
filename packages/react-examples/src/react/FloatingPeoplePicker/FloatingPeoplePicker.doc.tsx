import * as React from 'react';
import { FloatingPeoplePickerTypesExample } from './FloatingPeoplePicker.Basic.Example';

import { IDocPageProps } from '@fluentui/react-internal/lib/common/DocPage.types';

const FloatingPeoplePickerBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/react/FloatingPeoplePicker/FloatingPeoplePicker.Basic.Example.tsx') as string;

export const FloatingPeoplePickerPageProps: IDocPageProps = {
  title: 'FloatingPeoplePicker',
  componentName: 'FloatingPeoplePicker',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/FloatingPeoplePicker',
  examples: [
    {
      title: 'Floating People Picker',
      code: FloatingPeoplePickerBasicExampleCode,
      view: <FloatingPeoplePickerTypesExample />,
    },
  ],
  propertiesTablesSources: [
    require('!raw-loader!@fluentui/react-internal/src/components/FloatingPicker/BaseFloatingPicker.types.ts') as string,
  ],
  overview: require('!raw-loader!@fluentui/react-examples/src/react/FloatingPeoplePicker/docs/FloatingPeoplePickerOverview.md') as string,
  bestPractices: require('!raw-loader!@fluentui/react-examples/src/react/FloatingPeoplePicker/docs/FloatingPeoplePickerBestPractices.md') as string,
  dos: require('!raw-loader!@fluentui/react-examples/src/react/FloatingPeoplePicker/docs/FloatingPeoplePickerDos.md') as string,
  donts: require('!raw-loader!@fluentui/react-examples/src/react/FloatingPeoplePicker/docs/FloatingPeoplePickerDonts.md') as string,
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
