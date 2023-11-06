import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { DonutChartBasicExample } from './DonutChart.Basic.Example';
import { DonutChartDynamicExample } from './DonutChart.Dynamic.Example';
import { DonutChartCustomCalloutExample } from './DonutChart.CustomCallout.Example';
import { DonutChartCustomAccessibilityExample } from './DonutChart.CustomAccessibility.Example';

const DonutChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DonutChart/DonutChart.Basic.Example.tsx') as string;
const DonutChartDynamicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DonutChart/DonutChart.Dynamic.Example.tsx') as string;
const DonutChartCustomCalloutExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DonutChart/DonutChart.CustomCallout.Example.tsx') as string;
const DonutChartCustomAccessibilityExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DonutChart/DonutChart.CustomAccessibility.Example.tsx') as string;

export const DonutChartPageProps: IDocPageProps = {
  title: 'DonutChart',
  componentName: 'DonutChart',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-charting/src/components/DonutChart',
  examples: [
    {
      title: 'DonutChart basic',
      code: DonutChartBasicExampleCode,
      view: <DonutChartBasicExample />,
    },
    {
      title: 'DonutChart dynamic',
      code: DonutChartDynamicExampleCode,
      view: <DonutChartDynamicExample />,
    },
    {
      title: 'DonutChart custom callout',
      code: DonutChartCustomCalloutExampleCode,
      view: <DonutChartCustomCalloutExample />,
    },
    {
      title: 'DonutChart Custom Accessibility',
      code: DonutChartCustomAccessibilityExampleCode,
      view: <DonutChartCustomAccessibilityExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DonutChart/docs/DonutChartOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DonutChart/docs/DonutChartBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DonutChart/docs/DonutChartDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DonutChart/docs/DonutChartDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
