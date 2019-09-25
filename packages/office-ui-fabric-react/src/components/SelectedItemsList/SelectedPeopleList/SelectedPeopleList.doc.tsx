import * as React from 'react';

import { IDocPageProps } from '../../../common/DocPage.types';

import { SelectedPeopleListBasicExample } from '../examples/SelectedPeopleList.Basic.Example';
import { SelectedPeopleListControlledExample } from '../examples/SelectedPeopleList.Controlled.Example';

const SelectedPeopleListBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SelectedItemsList/examples/SelectedPeopleList.Basic.Example.tsx') as string;
const SelectedPeopleListControlledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SelectedItemsList/examples/SelectedPeopleList.Controlled.Example.tsx') as string;

export const SelectedPeopleListPageProps: IDocPageProps = {
  title: 'SelectedPeopleList',
  componentName: 'SelectedPeopleList',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/SelectedPeopleList',
  examples: [
    {
      title: 'Selected People List (uncontrolled)',
      code: SelectedPeopleListBasicExampleCode,
      view: <SelectedPeopleListBasicExample />
    },
    {
      title: 'Selected People List (controlled)',
      code: SelectedPeopleListControlledExampleCode,
      view: <SelectedPeopleListControlledExample />
    }
  ],
  propertiesTablesSources: [
    require<string>('!raw-loader!office-ui-fabric-react/src/components/SelectedItemsList/BaseSelectedItemsList.types.ts')
  ],
  overview: '',
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/SelectedItemsList/docs/SelectedPeopleListDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/SelectedItemsList/docs/SelectedPeopleListDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
