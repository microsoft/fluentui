import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { AreaChartBasicExample } from './AreaChart.Basic.Example';
import { AreaChartStyledExample } from './AreaChart.Styled.Example';
import { AreaChartMultipleExample } from './AreaChart.Multiple.Example';
import { AreaChartCustomAccessibilityExample } from './AreaChart.CustomAccessibility.Example';
import { AreaChartLargeDataExample } from './AreaChart.LargeData.Example';

const AreaChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/AreaChart/AreaChart.Basic.Example.tsx') as string;
const AreaChartMultipleExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/AreaChart/AreaChart.Multiple.Example.tsx') as string;
const AreaChartStyledExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/AreaChart/AreaChart.Styled.Example.tsx') as string;
const AreaChartCustomAccessibilityExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/AreaChart/AreaChart.CustomAccessibility.Example.tsx') as string;
const AreaChartLargeDataExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/AreaChart/AreaChart.LargeData.Example.tsx') as string;

export const AreaChartPageProps: IDocPageProps = {
  title: 'AreaChart',
  componentName: 'AreaChart',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-charting/src/components/AreaChart',
  examples: [
    {
      title: 'AreaChart basic',
      code: AreaChartBasicExampleCode,
      view: <AreaChartBasicExample />,
    },
    {
      title: 'AreaChart styled',
      code: AreaChartStyledExampleCode,
      view: <AreaChartStyledExample />,
    },
    {
      title: 'Stacked Area chart',
      code: AreaChartMultipleExampleCode,
      view: <AreaChartMultipleExample />,
    },
    {
      title: 'AreaChart Custom Accessibility',
      code: AreaChartCustomAccessibilityExampleCode,
      view: <AreaChartCustomAccessibilityExample />,
    },
    {
      title: 'AreaChart large data',
      code: AreaChartLargeDataExampleCode,
      view: <AreaChartLargeDataExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/AreaChart/docs/AreaChartOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/AreaChart/docs/AreaChartBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/AreaChart/docs/AreaChartDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/AreaChart/docs/AreaChartDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
