import * as React from 'react';
import { ExtendedPeoplePickerBasicExample } from './ExtendedPeoplePicker.Basic.Example';
import { ExtendedPeoplePickerControlledExample } from './ExtendedPeoplePicker.Controlled.Example';

import { IDocPageProps } from '@fluentui/react-internal/lib/common/DocPage.types';

const ExtendedPeoplePickerBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/react/ExtendedPicker/ExtendedPeoplePicker.Basic.Example.tsx') as string;
const ExtendedPeoplePickerControlledExampleCode = require('!raw-loader!@fluentui/react-examples/src/react/ExtendedPicker/ExtendedPeoplePicker.Controlled.Example.tsx') as string;

export const ExtendedPeoplePickerPageProps: IDocPageProps = {
  title: 'ExtendedPeoplePicker',
  componentName: 'ExtendedPeoplePicker',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/react-internal/src/components/ExtendedPicker/PeoplePicker',
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
  overview: require('!raw-loader!@fluentui/react-examples/src/react/ExtendedPicker/docs/ExtendedPeoplePickerOverview.md') as string,
  bestPractices: require('!raw-loader!@fluentui/react-examples/src/react/ExtendedPicker/docs/ExtendedPeoplePickerBestPractices.md') as string,
  dos: require('!raw-loader!@fluentui/react-examples/src/react/ExtendedPicker/docs/ExtendedPeoplePickerDos.md') as string,
  donts: require('!raw-loader!@fluentui/react-examples/src/react/ExtendedPicker/docs/ExtendedPeoplePickerDonts.md') as string,
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
