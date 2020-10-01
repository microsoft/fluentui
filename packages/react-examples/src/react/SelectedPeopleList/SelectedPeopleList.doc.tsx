import * as React from 'react';

import { IDocPageProps } from '@fluentui/react-internal/lib/common/DocPage.types';

import { SelectedPeopleListBasicExample } from './SelectedPeopleList.Basic.Example';
import { SelectedPeopleListControlledExample } from './SelectedPeopleList.Controlled.Example';

const SelectedPeopleListBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/react/SelectedPeopleList/SelectedPeopleList.Basic.Example.tsx') as string;
const SelectedPeopleListControlledExampleCode = require('!raw-loader!@fluentui/react-examples/src/react/SelectedPeopleList/SelectedPeopleList.Controlled.Example.tsx') as string;

export const SelectedPeopleListPageProps: IDocPageProps = {
  title: 'SelectedPeopleList',
  componentName: 'SelectedPeopleList',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/SelectedPeopleList',
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
    require<
      string
    >('!raw-loader!@fluentui/react-internal/src/components/SelectedItemsList/BaseSelectedItemsList.types.ts'),
  ],
  overview: '',
  dos: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/react/SelectedPeopleList/docs/SelectedPeopleListDos.md'),
  donts: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/react/SelectedPeopleList/docs/SelectedPeopleListDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
