import * as React from 'react';

import { CoachmarkBasicExample } from './examples/Coachmark.Basic.Example';

import { IDocPageProps } from '@fluentui/react-next/lib/common/DocPage.types';

const CoachmarkBasicExampleCode = require('!raw-loader!@fluentui/examples/src/react-next/Coachmark/examples/Coachmark.Basic.Example.tsx') as string;

export const CoachmarkPageProps: IDocPageProps = {
  title: 'Coachmark',
  componentName: 'Coachmark',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-next/src/components/Coachmark',
  examples: [
    {
      title: 'Coachmark Basic',
      code: CoachmarkBasicExampleCode,
      view: <CoachmarkBasicExample />,
      isScrollable: false,
    },
  ],
  overview: require<string>('!raw-loader!@fluentui/examples/src/react-next/Coachmark/docs/CoachmarkOverview.md'),
  bestPractices: require<string>('!raw-loader!@fluentui/examples/src/react-next/Coachmark/docs/BestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
