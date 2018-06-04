import * as React from 'react';

import { CoachmarkBasicExample } from './examples/Coachmark.Basic.Example';
import { DemoPage } from '../../demo/components/DemoPage';
import { IDemoPageProps } from '../../demo/components/DemoPage.types';
const CoachmarkBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Coachmark/examples/Coachmark.Basic.Example.tsx') as string;
export const CoachmarkPageProps: IDemoPageProps = {
  title: 'Coachmark',
  componentName: 'Coachmark',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Coachmark',
  examples: [
    {
      title: 'Coachmark Basic',
      code: CoachmarkBasicExampleCode,
      view: <CoachmarkBasicExample />
    }
  ],
  propertiesTablesSources: [
    require<
      string
    >('!raw-loader!office-ui-fabric-react/src/components/Coachmark/Coachmark.types.ts')
  ],
  overview: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/Coachmark/docs/CoachmarkOverview.md'),
  bestPractices: '',
  dos: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/Coachmark/docs/CoachmarkDos.md'),
  donts: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/Coachmark/docs/CoachmarkDonts.md'),
  isHeaderVisible: true
};

export const CoachmarkPage = (props: { isHeaderVisible: boolean }) =>
  <DemoPage {...{ ...CoachmarkPageProps, ...props }} />;
