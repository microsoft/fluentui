import * as React from 'react';
import { SliderBasicExample } from './examples/Slider.Basic.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { SliderStatus } from './Slider.checklist';

const SliderBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Slider/examples/Slider.Basic.Example.tsx') as string;

export const SliderPageProps: IDocPageProps = {
  title: 'Slider',
  componentName: 'Slider',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/undefined',
  componentStatus: SliderStatus,
  examples: [
    {
      title: 'Slider',
      code: SliderBasicExampleCode,
      view: <SliderBasicExample />
    }
  ],
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/Slider/Slider.types.ts')],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Slider/docs/SliderOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Slider/docs/SliderDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Slider/docs/SliderDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
