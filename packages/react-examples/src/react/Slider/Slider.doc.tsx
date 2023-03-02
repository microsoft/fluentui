import * as React from 'react';
import { SliderBasicExample } from './Slider.Basic.Example';
import { SliderVerticalExample } from './Slider.Vertical.Example';
import { SliderRangedExample } from './Slider.Ranged.Example';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

const SliderBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Slider/Slider.Basic.Example.tsx') as string;
const SliderVerticalExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Slider/Slider.Vertical.Example.tsx') as string;
const SliderRangedExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Slider/Slider.Ranged.Example.tsx') as string;

export const SliderPageProps: IDocPageProps = {
  title: 'Slider',
  componentName: 'Slider',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/undefined',
  examples: [
    {
      title: 'Horizontal sliders',
      code: SliderBasicExampleCode,
      view: <SliderBasicExample />,
    },
    {
      title: 'Vertical sliders',
      code: SliderVerticalExampleCode,
      view: <SliderVerticalExample />,
    },
    {
      title: 'Ranged sliders',
      code: SliderRangedExampleCode,
      view: <SliderRangedExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Slider/docs/SliderOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Slider/docs/SliderBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
