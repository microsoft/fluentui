import * as React from 'react';
import { ExtendedPeoplePickerBasicExample } from './ExtendedPeoplePicker.Basic.Example';
import { ExtendedPeoplePickerControlledExample } from './ExtendedPeoplePicker.Controlled.Example';

import { IDocPageProps } from '@fluentui/react-next/lib/common/DocPage.types';

const ExtendedPeoplePickerBasicExampleCode = require('!raw-loader!@fluentui/examples/src/react-next/ExtendedPicker/ExtendedPeoplePicker.Basic.Example.tsx') as string;
const ExtendedPeoplePickerControlledExampleCode = require('!raw-loader!@fluentui/examples/src/react-next/ExtendedPicker/ExtendedPeoplePicker.Controlled.Example.tsx') as string;

export const ExtendedPeoplePickerPageProps: IDocPageProps = {
  title: 'ExtendedPeoplePicker',
  componentName: 'ExtendedPeoplePicker',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/react-next/src/components/ExtendedPicker/PeoplePicker',
  examples: [
    {
      title: 'Extended People Picker (uncontrolled)',
      code: ExtendedPeoplePickerBasicExampleCode,
      view: <ExtendedPeoplePickerBasicExample />,
    },
    {
      title: 'Extended People Picker (controlled)',
      code: ExtendedPeoplePickerControlledExampleCode,
      view: <ExtendedPeoplePickerControlledExample />,
    },
  ],
  overview: require('!raw-loader!@fluentui/examples/src/react-next/ExtendedPicker/docs/ExtendedPeoplePickerOverview.md') as string,
  bestPractices: require('!raw-loader!@fluentui/examples/src/react-next/ExtendedPicker/docs/ExtendedPeoplePickerBestPractices.md') as string,
  dos: require('!raw-loader!@fluentui/examples/src/react-next/ExtendedPicker/docs/ExtendedPeoplePickerDos.md') as string,
  donts: require('!raw-loader!@fluentui/examples/src/react-next/ExtendedPicker/docs/ExtendedPeoplePickerDonts.md') as string,
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
