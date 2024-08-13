import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { VerticalBarChartBasicExample } from './VerticalBarChart.Basic.Example';
import { VerticalBarChartStyledExample } from './VerticalBarChart.Styled.Example';
import { VerticalBarChartDynamicExample } from './VerticalBarChart.Dynamic.Example';
import { VerticalBarChartTooltipExample } from './VerticalBarChart.AxisTooltip.Example';
import { VerticalBarChartCustomAccessibilityExample } from './VerticalBarChart.CustomAccessibility.Example';
import { VerticalBarChartRotatedLabelExample } from './VerticalBarChart.RotateLabels.Example';
import { VerticalBarChartDateAxisExample } from './VerticalBarChart.DateAxis.Example';

const VerticalBarChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/VerticalBarChart.Basic.Example.tsx') as string;
const VerticalBarChartStyledExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/VerticalBarChart.Styled.Example.tsx') as string;
const VerticalBarChartDynamicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/VerticalBarChart.Dynamic.Example.tsx') as string;
const VerticalBarChartTooltipExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/VerticalBarChart.AxisTooltip.Example.tsx') as string;
const VerticalBarChartCustomAccessibilityExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/VerticalBarChart.CustomAccessibility.Example.tsx') as string;
const VerticalBarChartRotateLabelsExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/VerticalBarChart.RotateLabels.Example.tsx') as string;
const VerticalBarChartDateAxisExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/VerticalBarChart.DateAxis.Example.tsx') as string;

export const VerticalBarChartPageProps: IDocPageProps = {
  title: 'VerticalBarChart',
  componentName: 'VerticalBarChart',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/react-charting/src/components/VerticalBarChart',
  examples: [
    {
      title: 'VerticalBarChart basic',
      code: VerticalBarChartBasicExampleCode,
      view: <VerticalBarChartBasicExample />,
    },
    {
      title: 'VerticalBarChart styled',
      code: VerticalBarChartStyledExampleCode,
      view: <VerticalBarChartStyledExample />,
    },
    {
      title: 'VerticalBarChart dynamic',
      code: VerticalBarChartDynamicExampleCode,
      view: <VerticalBarChartDynamicExample />,
    },
    {
      title: 'VerticalBarChart tooltip',
      code: VerticalBarChartTooltipExampleCode,
      view: <VerticalBarChartTooltipExample />,
    },
    {
      title: 'VerticalBarChart Custom Accessibility',
      code: VerticalBarChartCustomAccessibilityExampleCode,
      view: <VerticalBarChartCustomAccessibilityExample />,
    },
    {
      title: 'VerticalBarChart rotated labels',
      code: VerticalBarChartRotateLabelsExampleCode,
      view: <VerticalBarChartRotatedLabelExample />,
    },
    {
      title: 'VerticalBarChart Date Axis',
      code: VerticalBarChartDateAxisExampleCode,
      view: <VerticalBarChartDateAxisExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/docs/VerticalBarChartOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/docs/VerticalBarChartBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/docs/VerticalBarChartDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/VerticalBarChart/docs/VerticalBarChartDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
