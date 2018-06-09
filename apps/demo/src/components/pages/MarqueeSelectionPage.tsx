import * as React from 'react';

import { MarqueeSelectionBasicExample } from 'office-ui-fabric-react/lib/components/MarqueeSelection/examples/MarqueeSelection.Basic.Example';

import { DemoPage } from '../DemoPage';
import { IDemoPageProps } from '../DemoPage.types';

const MarqueeSelectionBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/MarqueeSelection/examples/MarqueeSelection.Basic.Example.tsx') as string;
export const MarqueeSelectionPageProps: IDemoPageProps = {
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
  propertiesTablesSources: [],
  overview: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/MarqueeSelection/docs/MarqueeSelectionOverview.md'),
  bestPractices: '',
  dos: '',
  donts: '',
  isHeaderVisible: true
};

export const MarqueeSelectionPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...MarqueeSelectionPageProps, ...props }} />
);
