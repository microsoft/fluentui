import * as React from 'react';
import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';
import { ActivityItemBasicExample } from './examples/ActivityItem.Basic.Example';
import { ActivityItemPersonaExample } from './examples/ActivityItem.Persona.Example';
import { ActivityItemCompactExample } from './examples/ActivityItem.Compact.Example';

const ActivityItemBasicExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/ActivityItem/examples/ActivityItem.Basic.Example.tsx') as string;
const ActivityItemPersonaExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/ActivityItem/examples/ActivityItem.Persona.Example.tsx') as string;
const ActivityItemCompactExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/ActivityItem/examples/ActivityItem.Compact.Example.tsx') as string;

export const ActivityItemPageProps: IDocPageProps = {
  title: 'ActivityItem',
  componentName: 'ActivityItem',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/ActivityItem',
  examples: [
    {
      title: 'Activity Items with Icons',
      code: ActivityItemBasicExampleCode,
      view: <ActivityItemBasicExample />,
    },
    {
      title: 'Activity Items with Personas',
      code: ActivityItemPersonaExampleCode,
      view: <ActivityItemPersonaExample />,
    },
    {
      title: 'Compact Activity Items',
      code: ActivityItemCompactExampleCode,
      view: <ActivityItemCompactExample />,
    },
  ],
  overview: require<
    string
  >('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/ActivityItem/docs/ActivityItemOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/ActivityItem/docs/ActivityItemBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
