import * as React from 'react';
import { ScrollablePaneDefaultExample } from './examples/ScrollablePane.Default.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { ScrollablePaneDetailsListExample } from './examples/ScrollablePane.DetailsList.Example';

const ScrollablePaneDefaultExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/examples/ScrollablePane.Default.Example.tsx') as string;
const ScrollablePaneDetailsListExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/examples/ScrollablePane.DetailsList.Example.tsx') as string;

export const ScrollablePanePageProps: IDocPageProps = {
  title: 'ScrollablePane',
  componentName: 'ScrollablePane',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/ScrollablePane',
  examples: [
    {
      title: 'Default',
      code: ScrollablePaneDefaultExampleCode,
      view: <ScrollablePaneDefaultExample />,
      isScrollable: false
    },
    {
      title: 'DetailsList Locked Header',
      code: ScrollablePaneDetailsListExampleCode,
      view: <ScrollablePaneDetailsListExample />,
      isScrollable: false
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/docs/ScrollablePaneOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/docs/ScrollablePaneDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/docs/ScrollablePaneDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
  nativePropsElement: ['a', 'button']
};
