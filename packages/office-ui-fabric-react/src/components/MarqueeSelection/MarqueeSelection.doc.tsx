import * as React from 'react';

import { MarqueeSelectionBasicExample } from './examples/MarqueeSelection.Basic.Example';

import { IDocPageProps } from '../../common/DocPage.types';

const MarqueeSelectionBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/MarqueeSelection/examples/MarqueeSelection.Basic.Example.tsx') as string;
export const MarqueeSelectionPageProps: IDocPageProps = {
  title: 'MarqueeSelection',
  componentName: 'MarqueeSelection',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/MarqueeSelection',
  examples: [
    {
      title: 'Basic Selection Example',
      code: MarqueeSelectionBasicExampleCode,
      view: <MarqueeSelectionBasicExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/MarqueeSelection/docs/MarqueeSelectionOverview.md'),
  bestPractices: '',
  dos: '',
  donts: '',
  isHeaderVisible: true,
  isFeedbackVisible: true
};
