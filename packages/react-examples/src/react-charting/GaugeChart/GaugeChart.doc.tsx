import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { GaugeChartBasicExample } from './GaugeChart.Basic.Example';
import { GaugeChartSingleSegmentExample } from './GaugeChart.SingleSegment.Example';
import { GaugeChartResponsiveExample } from './GaugeChart.Responsive.Example';

const GaugeChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GaugeChart/GaugeChart.Basic.Example.tsx') as string;
const GaugeChartSingleSegmentExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GaugeChart/GaugeChart.SingleSegment.Example.tsx') as string;
const GaugeChartResponsiveExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GaugeChart/GaugeChart.Responsive.Example.tsx') as string;

export const GaugeChartPageProps: IDocPageProps = {
  title: 'GaugeChart',
  componentName: 'GaugeChart',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/charts/react-charting/src/components/GaugeChart',
  examples: [
    {
      title: 'GaugeChart basic',
      code: GaugeChartBasicExampleCode,
      view: <GaugeChartBasicExample />,
    },
    {
      title: 'GaugeChart single segment variant',
      code: GaugeChartSingleSegmentExampleCode,
      view: <GaugeChartSingleSegmentExample />,
    },
    {
      title: 'GaugeChart responsive',
      code: GaugeChartResponsiveExampleCode,
      view: <GaugeChartResponsiveExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GaugeChart/docs/GaugeChartOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GaugeChart/docs/GaugeChartBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GaugeChart/docs/GaugeChartDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GaugeChart/docs/GaugeChartDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
