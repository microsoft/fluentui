import * as React from 'react';
import { GroupedListBasicExample } from './examples/GroupedList.Basic.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { GroupedListCustomExample } from './examples/GroupedList.Custom.Example';

const GroupedListBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/GroupedList/examples/GroupedList.Basic.Example.tsx') as string;
const GroupedListCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/GroupedList/examples/GroupedList.Custom.Example.tsx') as string;

export const GroupedListPageProps: IDocPageProps = {
  title: 'GroupedList',
  componentName: 'GroupedList',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/GroupedList',
  examples: [
    {
      title: 'GroupedList basic example',
      code: GroupedListBasicExampleCode,
      view: <GroupedListBasicExample />
    },
    {
      title: 'GroupedList example with custom header and footer',
      code: GroupedListCustomExampleCode,
      view: <GroupedListCustomExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/GroupedList/docs/GroupedListOverview.md'),
  bestPractices: '',
  dos: '',
  donts: '',
  isHeaderVisible: true,
  isFeedbackVisible: true
};
