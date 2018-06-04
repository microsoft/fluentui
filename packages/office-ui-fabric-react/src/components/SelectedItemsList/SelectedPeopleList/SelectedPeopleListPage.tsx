import * as React from 'react';

import { PeopleSelectedItemsListExample } from '../examples/SelectedPeopleList.Basic.Example';
import { DemoPage } from '../../../demo/components/DemoPage';
import { IDemoPageProps } from '../../../demo/components/DemoPage.types';
const PeopleSelectedItemsListExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SelectedItemsList/examples/SelectedPeopleList.Basic.Example.tsx') as string;

export const SelectedPeopleListPageProps: IDemoPageProps = {
  title: 'SelectedPeopleList',
  componentName: 'SelectedPeopleList',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/SelectedPeopleList',
  examples: [
    {
      title: 'Selected People List',
      code: PeopleSelectedItemsListExampleCode,
      view: <PeopleSelectedItemsListExample />,
    },
  ],
  propertiesTablesSources: [
    require<
      string
    >('!raw-loader!office-ui-fabric-react/src/components/SelectedItemsList/BaseSelectedItemsList.types.ts'),
  ],
  overview: '',
  bestPractices: '',
  dos: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/SelectedItemsList/docs/SelectedPeopleListDos.md'),
  donts: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/SelectedItemsList/docs/SelectedPeopleListDonts.md'),
  isHeaderVisible: true,
};

export const SelectedPeopleListPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...SelectedPeopleListPageProps, ...props }} />
);
