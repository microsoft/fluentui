import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { HorizontalBarChartBasicExample } from './HorizontalBarChart.Basic.Example';
import { HorizontalBarChartCustomCalloutExample } from './HorizontalBarChart.CustomCallout.Example';
import { HorizontalBarChartBenchmarkExample } from './HorizontalBarChart.Benchmark.Example';
import { HorizontalBarChartCustomAccessibilityExample } from './HorizontalBarChart.CustomAccessibility.Example';
import { HorizontalBarChartVariantExample } from './HorizontalBarChart.Variant.Example';

const HorizontalBarChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChart/HorizontalBarChart.Basic.Example.tsx') as string;
const HorizontalBarChartCustomCalloutExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChart/HorizontalBarChart.CustomCallout.Example.tsx') as string;
const HorizontalBarChartBenchmarkExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChart/HorizontalBarChart.Benchmark.Example.tsx') as string;
const HorizontalBarChartCustomAccessibilityExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChart/HorizontalBarChart.CustomAccessibility.Example.tsx') as string;
const HorizontalBarChartVariantExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChart/HorizontalBarChart.Variant.Example.tsx') as string;

export const HorizontalBarChartPageProps: IDocPageProps = {
  title: 'HorizontalBarChart',
  componentName: 'HorizontalBarChart',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/react-charting/src/components/HorizontalBarChart',
  examples: [
    {
      title: 'HorizontalBarChart n/m scale',
      code: HorizontalBarChartBasicExampleCode,
      view: <HorizontalBarChartBasicExample />,
    },
    {
      title: 'HorizontalBarChart custom accessibility',
      code: HorizontalBarChartCustomAccessibilityExampleCode,
      view: <HorizontalBarChartCustomAccessibilityExample />,
    },
    {
      title: 'HorizontalBarChart absolute scale',
      code: HorizontalBarChartVariantExampleCode,
      view: <HorizontalBarChartVariantExample />,
    },
    {
      title: 'HorizontalBarChart benchmark',
      code: HorizontalBarChartBenchmarkExampleCode,
      view: <HorizontalBarChartBenchmarkExample />,
    },
    {
      title: 'HorizontalBarChart custom callout',
      code: HorizontalBarChartCustomCalloutExampleCode,
      view: <HorizontalBarChartCustomCalloutExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChart/docs/HorizontalBarChartOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChart/docs/HorizontalBarChartBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChart/docs/HorizontalBarChartDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChart/docs/HorizontalBarChartDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
