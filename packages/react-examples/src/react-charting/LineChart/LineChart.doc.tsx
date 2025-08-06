import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { LineChartBasicExample } from './LineChart.Basic.Example';
import { LineChartStyledExample } from './LineChart.Styled.Example';
import { LineChartMultipleExample } from './LineChart.Multiple.Example';
import { LineChartEventsExample } from './LineChart.Events.Example';
import { LineChartCustomAccessibilityExample } from './LineChart.CustomAccessibility.Example';
import { LineChartGapsExample } from './LineChart.Gaps.Example';
import { LineChartCustomLocaleDateAxisExample } from './LineChart.CustomLocaleDateAxis.Example';
import { LineChartNegativeExample } from './LineChart.Negative.Example';
import { LineChartAllNegativeExample } from './LineChart.AllNegative.Example';
import { LineChartSecondaryYAxisExample } from './LineChart.SecondaryYAxis.Example';
import { LineChartLogAxisExample } from './LineChart.LogAxis.Example';

const LineChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.Basic.Example.tsx') as string;
const LineChartStyledExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.Styled.Example.tsx') as string;
const MultipleLineChartExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.Multiple.Example.tsx') as string;
const LineChartEventsExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.Events.Example.tsx') as string;
const LineChartCustomAccessibilityExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.CustomAccessibility.Example.tsx') as string;
const LineChartGapsExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.Gaps.Example.tsx') as string;
const LineChartCustomLocaleDateAxisExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.CustomLocaleDateAxis.Example.tsx') as string;
const LineChartNegativeExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.Negative.Example.tsx') as string;
const LineChartAllNegativeExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.AllNegative.Example.tsx') as string;
const LineChartSecondaryYAxisExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.SecondaryYAxis.Example.tsx') as string;
const LineChartLogAxisExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.LogAxis.Example.tsx') as string;

export const LineChartPageProps: IDocPageProps = {
  title: 'LineChart',
  componentName: 'LineChart',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/charts/react-charting/src/components/LineChart',
  examples: [
    {
      title: 'LineChart basic',
      code: LineChartBasicExampleCode,
      view: <LineChartBasicExample />,
    },
    {
      title: 'LineChart styled',
      code: LineChartStyledExampleCode,
      view: <LineChartStyledExample />,
    },
    {
      title: 'Multiple Line chart',
      code: MultipleLineChartExampleCode,
      view: <LineChartMultipleExample />,
    },
    {
      title: 'LineChart with events',
      code: LineChartEventsExampleCode,
      view: <LineChartEventsExample />,
    },
    {
      title: 'LineChart Custom Accessibility',
      code: LineChartCustomAccessibilityExampleCode,
      view: <LineChartCustomAccessibilityExample />,
    },
    {
      title: 'LineChart with gaps',
      code: LineChartGapsExampleCode,
      view: <LineChartGapsExample />,
    },
    {
      title: 'LineChart custom date axis locale',
      code: LineChartCustomLocaleDateAxisExampleCode,
      view: <LineChartCustomLocaleDateAxisExample />,
    },
    {
      title: 'LineChart with Negative Y values',
      code: LineChartNegativeExampleCode,
      view: <LineChartNegativeExample />,
    },
    {
      title: 'LineChart with All Negative Y values',
      code: LineChartAllNegativeExampleCode,
      view: <LineChartAllNegativeExample />,
    },
    {
      title: 'LineChart secondary y-axis',
      code: LineChartSecondaryYAxisExampleCode,
      view: <LineChartSecondaryYAxisExample />,
    },
    {
      title: 'LineChart log axis',
      code: LineChartLogAxisExampleCode,
      view: <LineChartLogAxisExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/docs/LineChartOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/docs/LineChartBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/docs/LineChartDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/docs/LineChartDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
