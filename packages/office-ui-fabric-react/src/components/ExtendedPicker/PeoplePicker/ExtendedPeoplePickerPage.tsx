import * as React from 'react';
import { ExtendedPeoplePickerTypesExample } from '../examples/ExtendedPeoplePicker.Basic.Example';

import { DemoPage } from '../../../demo/components/DemoPage';
import { IDemoPageProps } from '../../../demo/components/DemoPage.types';

const ExtendedPeoplePickerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ExtendedPicker/examples/ExtendedPeoplePicker.Basic.Example.tsx') as string;
export const ExtendedPeoplePickerPageProps: IDemoPageProps = {
  title: 'ExtendedPeoplePicker',
  componentName: 'ExtendedPeoplePicker',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/ExtendedPeoplePicker',
  examples: [
    {
      title: 'Extended People Picker',
      code: ExtendedPeoplePickerBasicExampleCode,
      view: <ExtendedPeoplePickerTypesExample />,
    },
  ],
  propertiesTablesSources: [
    require<
      string
    >('!raw-loader!office-ui-fabric-react/src/components/ExtendedPicker/BaseExtendedPicker.types.ts'),
  ],
  overview: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/ExtendedPicker/docs/ExtendedPeoplePickerOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/ExtendedPicker/docs/ExtendedPeoplePickerBestPractices.md'),
  dos: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/ExtendedPicker/docs/ExtendedPeoplePickerDos.md'),
  donts: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/ExtendedPicker/docs/ExtendedPeoplePickerDonts.md'),
  isHeaderVisible: true,
};

export const ExtendedPeoplePickerPage = (props: {
  isHeaderVisible: boolean;
}) => <DemoPage {...{ ...ExtendedPeoplePickerPageProps, ...props }} />;
