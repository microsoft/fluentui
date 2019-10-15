import * as React from 'react';
import { PeoplePickerTypesExample } from './examples/PeoplePicker.Types.Example';
import { IDocPageProps } from '../../../common/DocPage.types';

const PeoplePickerTypesExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/examples/PeoplePicker.Types.Example.tsx') as string;

export const PeoplePickerPageProps: IDocPageProps = {
  title: 'PeoplePicker',
  componentName: 'PeoplePicker',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/PeoplePicker',
  examples: [
    {
      title: 'People Pickers',
      code: PeoplePickerTypesExampleCode,
      view: <PeoplePickerTypesExample />
    }
  ],
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/pickers/BasePicker.types.ts')],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/docs/PeoplePickerOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/docs/PeoplePickerBestPractices.md'),
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/docs/PeoplePickerDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/docs/PeoplePickerDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
