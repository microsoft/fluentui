import * as React from 'react';
import { GroupedListBasicExample } from './examples/GroupedList.Basic.Example';
import { DemoPage } from '../../demo/components/DemoPage';
import { IDemoPageProps } from '../../demo/components/DemoPage.types';
import { GroupedListCustomExample } from './examples/GroupedList.Custom.Example';
import { GroupedListStatus } from './GroupedList.checklist';

const GroupedListBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/GroupedList/examples/GroupedList.Basic.Example.tsx') as string;
const GroupedListCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/GroupedList/examples/GroupedList.Custom.Example.tsx') as string;

export const GroupedListPageProps: IDemoPageProps = {
  title: 'GroupedList',
  componentName: 'GroupedList',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/GroupedList',
  componentStatus: GroupedListStatus,
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
  propertiesTablesSources: [
    require<string>('!raw-loader!office-ui-fabric-react/src/components/GroupedList/GroupedList.types.ts')
  ],
  overview: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/GroupedList/docs/GroupedListOverview.md'),
  bestPractices: '',
  dos: '',
  donts: '',
  isHeaderVisible: true
};

export const GroupedListPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...GroupedListPageProps, ...props }} />
);
