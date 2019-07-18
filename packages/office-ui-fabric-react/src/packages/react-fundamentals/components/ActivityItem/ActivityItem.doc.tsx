import * as React from 'react';
import { IDocPageProps } from '../../common/DocPage.types';
import { ActivityItemBasicExample } from './examples/ActivityItem.Basic.Example';
import { ActivityItemPersonaExample } from './examples/ActivityItem.Persona.Example';
import { ActivityItemCompactExample } from './examples/ActivityItem.Compact.Example';

const ActivityItemBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ActivityItem/examples/ActivityItem.Basic.Example.tsx') as string;
const ActivityItemPersonaExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ActivityItem/examples/ActivityItem.Persona.Example.tsx') as string;
const ActivityItemCompactExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ActivityItem/examples/ActivityItem.Compact.Example.tsx') as string;

export const ActivityItemPageProps: IDocPageProps = {
  title: 'ActivityItem',
  componentName: 'ActivityItem',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/ActivityItem',
  examples: [
    {
      title: 'Activity Items with Icons',
      code: ActivityItemBasicExampleCode,
      view: <ActivityItemBasicExample />
    },
    {
      title: 'Activity Items with Personas',
      code: ActivityItemPersonaExampleCode,
      view: <ActivityItemPersonaExample />
    },
    {
      title: 'Compact Activity Items',
      code: ActivityItemCompactExampleCode,
      view: <ActivityItemCompactExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/ActivityItem/docs/ActivityItemOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/ActivityItem/docs/ActivityItemDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/ActivityItem/docs/ActivityItemDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
