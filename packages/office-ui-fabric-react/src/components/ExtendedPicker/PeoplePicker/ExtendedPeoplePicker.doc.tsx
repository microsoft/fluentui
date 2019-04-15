import * as React from 'react';
import { ExtendedPeoplePickerBasicExample } from '../examples/ExtendedPeoplePicker.Basic.Example';
import { ExtendedPeoplePickerControlledExample } from '../examples/ExtendedPeoplePicker.Controlled.Example';

import { IDocPageProps } from '../../../common/DocPage.types';

const ExtendedPeoplePickerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ExtendedPicker/examples/ExtendedPeoplePicker.Basic.Example.tsx') as string;
const ExtendedPeoplePickerBasicExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/ExtendedPicker/examples/ExtendedPeoplePicker.Basic.Example.tsx') as string;
const ExtendedPeoplePickerControlledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ExtendedPicker/examples/ExtendedPeoplePicker.Controlled.Example.tsx') as string;
const ExtendedPeoplePickerControlledExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/ExtendedPicker/examples/ExtendedPeoplePicker.Controlled.Example.tsx') as string;

export const ExtendedPeoplePickerPageProps: IDocPageProps = {
  title: 'ExtendedPeoplePicker',
  componentName: 'ExtendedPeoplePicker',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/ExtendedPicker/PeoplePicker',
  examples: [
    {
      title: 'Extended People Picker (uncontrolled)',
      code: ExtendedPeoplePickerBasicExampleCode,
      codepenJS: ExtendedPeoplePickerBasicExampleCodepen,
      view: <ExtendedPeoplePickerBasicExample />
    },
    {
      title: 'Extended People Picker (controlled)',
      code: ExtendedPeoplePickerControlledExampleCode,
      codepenJS: ExtendedPeoplePickerControlledExampleCodepen,
      view: <ExtendedPeoplePickerControlledExample />
    }
  ],
  propertiesTablesSources: [
    require('!raw-loader!office-ui-fabric-react/src/components/ExtendedPicker/BaseExtendedPicker.types.ts') as string
  ],
  overview: require('!raw-loader!office-ui-fabric-react/src/components/ExtendedPicker/docs/ExtendedPeoplePickerOverview.md') as string,
  bestPractices: require('!raw-loader!office-ui-fabric-react/src/components/ExtendedPicker/docs/ExtendedPeoplePickerBestPractices.md') as string,
  dos: require('!raw-loader!office-ui-fabric-react/src/components/ExtendedPicker/docs/ExtendedPeoplePickerDos.md') as string,
  donts: require('!raw-loader!office-ui-fabric-react/src/components/ExtendedPicker/docs/ExtendedPeoplePickerDonts.md') as string,
  isHeaderVisible: true,
  isFeedbackVisible: true
};
