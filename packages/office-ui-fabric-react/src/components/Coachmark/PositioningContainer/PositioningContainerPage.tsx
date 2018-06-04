import * as React from 'react';

import { PositioningContainerBasicExample } from './examples/PositioningContainer.Basic.Example';
import { DemoPage } from '../../../demo/components/DemoPage';
import { IDemoPageProps } from '../../../demo/components/DemoPage.types';
const CoachmarkBasicExampleCode = require('!raw-loader!experiments/src/components/PositioningContainer/examples/PositioningContainer.Basic.Example.tsx') as string;

export const PositioningContainerPageProps: IDemoPageProps = {
  title: 'PositioningContainer',
  componentName: 'PositioningContainer',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/PositioningContainer',
  examples: [
    {
      title: 'Positioning Container Basic',
      code: CoachmarkBasicExampleCode,
      view: <PositioningContainerBasicExample />
    }
  ],
  propertiesTablesSources: [
    require<string>('!raw-loader!experiments/src/components/PositioningContainer/PositioningContainer.types.ts')
  ],
  overview: '',
  bestPractices: '',
  dos: '',
  donts: '',
  isHeaderVisible: true
};

export const PositioningContainerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...PositioningContainerPageProps, ...props }} />
);
