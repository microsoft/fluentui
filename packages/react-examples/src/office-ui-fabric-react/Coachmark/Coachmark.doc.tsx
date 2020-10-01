import * as React from 'react';

import { CoachmarkBasicExample } from './Coachmark.Basic.Example';

import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';
const CoachmarkBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Coachmark/Coachmark.Basic.Example.tsx') as string;
export const CoachmarkPageProps: IDocPageProps = {
  title: 'Coachmark',
  componentName: 'Coachmark',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/7.0/packages/office-ui-fabric-react/src/components/Coachmark',
  examples: [
    {
      title: 'Coachmark Basic',
      code: CoachmarkBasicExampleCode,
      view: <CoachmarkBasicExample />,
      isScrollable: false,
    },
  ],
  overview: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Coachmark/docs/CoachmarkOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Coachmark/docs/CoachmarkBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
