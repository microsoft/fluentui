import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { StackedBarChartBasicExample } from './StackedBarChart.Basic.Example';
import { StackedBarChartBenchmarkExample } from './StackedBarChart.Benchmark.Example';
import { StackedBarChartMultipleExample } from './StackedBarChart.Multiple.Example';
import { StackedBarChartDynamicExample } from './StackedBarChart.Dynamic.Example';
import { StackedBarChartBaseBarExample } from './StackedBarChart.BaseBar.Example';
import { StackedBarChartCustomAccessibilityExample } from './StackedBarChart.CustomAccessibility.Example';

const StackedBarChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/StackedBarChart.Basic.Example.tsx') as string;
const StackedBarChartBenchmarkExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/StackedBarChart.Benchmark.Example.tsx') as string;
const StackedBarChartMultipleExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/StackedBarChart.Multiple.Example.tsx') as string;
const StackedBarChartDynamicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/StackedBarChart.Dynamic.Example.tsx') as string;
const StackedBarChartBaseBarExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/StackedBarChart.BaseBar.Example.tsx') as string;
const StackedBarChartCustomAccessibilityExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/StackedBarChart.CustomAccessibility.Example.tsx') as string;

export const StackedBarChartPageProps: IDocPageProps = {
  title: 'StackedBarChart',
  componentName: 'StackedBarChart',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/react-charting/src/components/StackedBarChart',
  examples: [
    {
      title: 'StackedBarChart basic',
      code: StackedBarChartBasicExampleCode,
      view: <StackedBarChartBasicExample />,
    },
    {
      title: 'StackedBarChart benchmark',
      code: StackedBarChartBenchmarkExampleCode,
      view: <StackedBarChartBenchmarkExample />,
    },
    {
      title: 'StackedBarChart multiple',
      code: StackedBarChartMultipleExampleCode,
      view: <StackedBarChartMultipleExample />,
    },
    {
      title: 'StackedBarChart dynamic',
      code: StackedBarChartDynamicExampleCode,
      view: <StackedBarChartDynamicExample />,
    },
    {
      title: 'StackedBarChart base bar',
      code: StackedBarChartBaseBarExampleCode,
      view: <StackedBarChartBaseBarExample />,
    },
    {
      title: 'StackedBarChart custom accessibility',
      code: StackedBarChartCustomAccessibilityExampleCode,
      view: <StackedBarChartCustomAccessibilityExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/docs/StackedBarChartOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/docs/StackedBarChartBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/docs/StackedBarChartDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/StackedBarChart/docs/StackedBarChartDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
