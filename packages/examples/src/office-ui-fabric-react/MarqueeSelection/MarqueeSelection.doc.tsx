import * as React from 'react';

import { MarqueeSelectionBasicExample } from './examples/MarqueeSelection.Basic.Example';

import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';

const MarqueeSelectionBasicExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/MarqueeSelection/examples/MarqueeSelection.Basic.Example.tsx') as string;
export const MarqueeSelectionPageProps: IDocPageProps = {
  title: 'MarqueeSelection',
  componentName: 'MarqueeSelection',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/MarqueeSelection',
  examples: [
    {
      title: 'Basic Selection Example',
      code: MarqueeSelectionBasicExampleCode,
      view: <MarqueeSelectionBasicExample />,
    },
  ],
  overview: require<
    string
  >('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/MarqueeSelection/docs/MarqueeSelectionOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/MarqueeSelection/docs/MarqueeSelectionBestPractices.md'),
  dos: '',
  donts: '',
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
