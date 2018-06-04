import * as React from 'react';
import { ScrollablePaneDefaultExample } from './examples/ScrollablePane.Default.Example';
import { DemoPage } from '../../demo/components/DemoPage';
import { IDemoPageProps } from '../../demo/components/DemoPage.types';
import { ScrollablePaneDetailsListExample } from './examples/ScrollablePane.DetailsList.Example';
import { ScrollablePaneStatus } from './ScrollablePane.checklist';

const ScrollablePaneDefaultExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/examples/ScrollablePane.Default.Example.tsx') as string;

const ScrollablePaneDetailsListExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/examples/ScrollablePane.DetailsList.Example.tsx') as string;

export const ScrollablePanePageProps: IDemoPageProps = {
  title: 'ScrollablePane',
  componentName: 'ScrollablePane',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/ScrollablePane',
  componentStatus: ScrollablePaneStatus,
  examples: [
    {
      title: 'Default',
      code: ScrollablePaneDefaultExampleCode,
      view: <ScrollablePaneDefaultExample />
    },
    {
      title: 'DetailsList Locked Header',
      code: ScrollablePaneDetailsListExampleCode,
      view: <ScrollablePaneDetailsListExample />
    }
  ],
  propertiesTablesSources: [
    require<
      string
    >('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/ScrollablePane.types.ts'),
    require<
      string
    >('!raw-loader!office-ui-fabric-react/src/components/Sticky/Sticky.types.ts')
  ],
  overview: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/docs/ScrollablePaneOverview.md'),
  bestPractices: '',
  dos: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/docs/ScrollablePaneDos.md'),
  donts: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/docs/ScrollablePaneDonts.md'),
  isHeaderVisible: true,
  allowNativeProps: true,
  nativePropsElement: ['a', 'button']
};

export const ScrollablePanePage = (props: { isHeaderVisible: boolean }) =>
  <DemoPage {...{ ...ScrollablePanePageProps, ...props }} />;
