import * as React from 'react';

import { PositioningContainerBasicExample } from './examples/PositioningContainer.Basic.Example';
import { IDocPageProps } from '../../../common/DocPage.types';
const CoachmarkBasicExampleCode = require('!raw-loader!experiments/src/components/PositioningContainer/examples/PositioningContainer.Basic.Example.tsx') as string;

export const PositioningContainerPageProps: IDocPageProps = {
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
  propertiesTablesSources: [require<string>('!raw-loader!experiments/src/components/PositioningContainer/PositioningContainer.types.ts')],
  overview: '',
  bestPractices: '',
  dos: '',
  donts: '',
  isHeaderVisible: true
};
