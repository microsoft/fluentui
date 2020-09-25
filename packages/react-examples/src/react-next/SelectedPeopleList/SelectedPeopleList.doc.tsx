import * as React from 'react';

import { IDocPageProps } from '@fluentui/react-next/lib/common/DocPage.types';

import { SelectedPeopleListBasicExample } from './SelectedPeopleList.Basic.Example';
import { SelectedPeopleListControlledExample } from './SelectedPeopleList.Controlled.Example';

const SelectedPeopleListBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-next/SelectedPeopleList/SelectedPeopleList.Basic.Example.tsx') as string;
const SelectedPeopleListControlledExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-next/SelectedPeopleList/SelectedPeopleList.Controlled.Example.tsx') as string;

export const SelectedPeopleListPageProps: IDocPageProps = {
  title: 'SelectedPeopleList',
  componentName: 'SelectedPeopleList',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/@fluentui/react-next/src/components/SelectedPeopleList',
  examples: [
    {
      title: 'Selected People List (uncontrolled)',
      code: SelectedPeopleListBasicExampleCode,
      view: <SelectedPeopleListBasicExample />,
    },
    {
      title: 'Selected People List (controlled)',
      code: SelectedPeopleListControlledExampleCode,
      view: <SelectedPeopleListControlledExample />,
    },
  ],
  propertiesTablesSources: [
    require<string>('!raw-loader!@fluentui/react-next/src/components/SelectedItemsList/BaseSelectedItemsList.types.ts'),
  ],
  overview: '',
  bestPractices: '',
  dos: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/react-next/SelectedPeopleList/docs/SelectedPeopleListDos.md'),
  donts: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/react-next/SelectedPeopleList/docs/SelectedPeopleListDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
