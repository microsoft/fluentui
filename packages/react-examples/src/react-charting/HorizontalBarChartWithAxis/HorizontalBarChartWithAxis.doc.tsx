import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { HorizontalBarChartWithAxisBasicExample } from './HorizontalBarChartWithAxis.Basic.Example';
import { HorizontalBarChartWithAxisTooltipExample } from './HorizontalBarChartWithAxis.AxisTooltip.Example';
import { HorizontalBarChartWithAxisStringAxisTooltipExample } from './HorizontalBarChartWithAxis.StringAxisTooltip.Example';
import { HorizontalBarChartWithAxisDynamicExample } from './HorizontalBarChartWithAxis.Dynamic.Example';
import { HorizontalBarChartWithAxisNegativeExample } from './HorizontalBarChartWithAxis.Negative.Example';
import { HBWAAxisCategoryOrderExample } from './HorizontalBarChartWithAxis.AxisCategoryOrder.Example';

const HorizontalBarChartWithAxisBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.Basic.Example.tsx') as string;
const HorizontalBarChartWithAxisTooltipExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.AxisTooltip.Example.tsx') as string;
const HorizontalBarChartWithAxisStringAxisTooltipExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.StringAxisTooltip.Example.tsx') as string;
const HorizontalBarChartWithAxisDynamicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.Dynamic.Example.tsx') as string;
const HorizontalBarChartWithAxisNegativeExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.Negative.Example.tsx') as string;
const HBWAAxisCategoryOrderExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.AxisCategoryOrder.Example.tsx') as string;

export const HorizontalBarChartWithAxisPageProps: IDocPageProps = {
  title: 'HorizontalBarChartWithAxis',
  componentName: 'HorizontalBarChartWithAxis',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/charts/react-charting/src/components/HorizontalBarChartWithAxis',
  examples: [
    {
      title: 'HorizontalBarChartWithAxis basic',
      code: HorizontalBarChartWithAxisBasicExampleCode,
      view: <HorizontalBarChartWithAxisBasicExample />,
    },
    {
      title: 'HorizontalBarChartWithAxis tooltip',
      code: HorizontalBarChartWithAxisTooltipExampleCode,
      view: <HorizontalBarChartWithAxisTooltipExample />,
    },
    {
      title: 'HorizontalBarChartWithAxis string axis tooltip',
      code: HorizontalBarChartWithAxisStringAxisTooltipExampleCode,
      view: <HorizontalBarChartWithAxisStringAxisTooltipExample />,
    },
    {
      title: 'HorizontalBarChartWithAxis dynamic axis',
      code: HorizontalBarChartWithAxisDynamicExampleCode,
      view: <HorizontalBarChartWithAxisDynamicExample />,
    },
    {
      title: 'HorizontalBarChartWithAxis negative X axis',
      code: HorizontalBarChartWithAxisNegativeExampleCode,
      view: <HorizontalBarChartWithAxisNegativeExample />,
    },
    {
      title: 'HorizontalBarChartWithAxis Axis Category Order',
      code: HBWAAxisCategoryOrderExampleCode,
      view: <HBWAAxisCategoryOrderExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/docs/HorizontalBarChartWithAxisOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/docs/HorizontalBarChartWithAxisBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/docs/HorizontalBarChartWithAxisDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/docs/HorizontalBarChartWithAxisDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
