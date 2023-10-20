import * as React from 'react';
import { FloatingPeoplePickerTypesExample } from './FloatingPeoplePicker.Basic.Example';
import { FloatingPeoplePickerTypesSelectableFooterExample } from './FloatingPeoplePicker.SelectableFooter.Example';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

const FloatingPeoplePickerBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/FloatingPeoplePicker/FloatingPeoplePicker.Basic.Example.tsx') as string;
const FloatingPeoplePickerSelectableFooterExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/FloatingPeoplePicker/FloatingPeoplePicker.SelectableFooter.Example.tsx') as string;

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
    {
      title: 'Floating People Picker',
      code: FloatingPeoplePickerSelectableFooterExampleCode,
      view: <FloatingPeoplePickerTypesSelectableFooterExample />,
    },
  ],
  overview:
    require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/FloatingPeoplePicker/docs/FloatingPeoplePickerOverview.md') as string,
  bestPractices:
    require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/FloatingPeoplePicker/docs/FloatingPeoplePickerBestPractices.md') as string,
  dos: require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/FloatingPeoplePicker/docs/FloatingPeoplePickerDos.md') as string,
  donts:
    require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/FloatingPeoplePicker/docs/FloatingPeoplePickerDonts.md') as string,
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
