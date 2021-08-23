import * as React from 'react';
import { SliderBasicExample } from './Slider.Basic.Example';
import { SliderVerticalExample } from './Slider.Vertical.Example';
import { SliderRangedExample } from './Slider.Ranged.Example';

import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';

const SliderBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Slider/Slider.Basic.Example.tsx') as string;
const SliderVerticalExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Slider/Slider.Vertical.Example.tsx') as string;
const SliderRangedExampleCode = require('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Slider/Slider.Ranged.Example.tsx') as string;

export const SliderPageProps: IDocPageProps = {
  title: 'Slider',
  componentName: 'Slider',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/7.0/packages/office-ui-fabric-react/src/components/undefined',
  examples: [
    {
      title: 'Horizontal sliders',
      code: SliderBasicExampleCode,
      view: <SliderBasicExample />,
    },
    {
      title: 'Ranged sliders',
      code: SliderRangedExampleCode,
      view: <SliderRangedExample />,
    },
    {
      title: 'Vertical sliders',
      code: SliderVerticalExampleCode,
      view: <SliderVerticalExample />,
    },
  ],
  overview: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Slider/docs/SliderOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/office-ui-fabric-react/Slider/docs/SliderBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
