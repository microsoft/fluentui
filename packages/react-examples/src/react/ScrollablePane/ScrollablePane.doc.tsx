import * as React from 'react';
import { ScrollablePaneDefaultExample } from './ScrollablePane.Default.Example';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';
import { ScrollablePaneDetailsListExample } from './ScrollablePane.DetailsList.Example';

const ScrollablePaneDefaultExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ScrollablePane/ScrollablePane.Default.Example.tsx') as string;
const ScrollablePaneDetailsListExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ScrollablePane/ScrollablePane.DetailsList.Example.tsx') as string;

export const ScrollablePanePageProps: IDocPageProps = {
  title: 'ScrollablePane',
  componentName: 'ScrollablePane',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/ScrollablePane',
  examples: [
    {
      title: 'Default',
      code: ScrollablePaneDefaultExampleCode,
      view: <ScrollablePaneDefaultExample />,
      isScrollable: false,
    },
    {
      title: 'DetailsList Fixed Header without ScrollablePane',
      code: ScrollablePaneDetailsListExampleCode,
      view: <ScrollablePaneDetailsListExample />,
      isScrollable: false,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ScrollablePane/docs/ScrollablePaneOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ScrollablePane/docs/ScrollablePaneBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
  nativePropsElement: ['a', 'button'],
};
