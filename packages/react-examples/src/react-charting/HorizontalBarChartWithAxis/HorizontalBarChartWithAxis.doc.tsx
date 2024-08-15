import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { HorizontalBarChartWithAxisBasicExample } from './HorizontalBarChartWithAxis.Basic.Example';
import { HorizontalBarChartWithAxisTooltipExample } from './HorizontalBarChartWithAxis.AxisTooltip.Example';
import { HorizontalBarChartWithAxisStringAxisTooltipExample } from './HorizontalBarChartWithAxis.StringAxisTooltip.Example';
import { HorizontalBarChartWithAxisEmptyExample } from './HorizontalBarChartWithAxis.Empty.Example';

const HorizontalBarChartWithAxisBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.Basic.Example.tsx') as string;
const HorizontalBarChartWithAxisTooltipExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.AxisTooltip.Example.tsx') as string;
const HorizontalBarChartWithAxisStringAxisTooltipExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.StringAxisTooltip.Example.tsx') as string;
const HorizontalBarChartWithAxisEmptyExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.Empty.Example.tsx') as string;

export const HorizontalBarChartWithAxisPageProps: IDocPageProps = {
  title: 'HorizontalBarChartWithAxis',
  componentName: 'HorizontalBarChartWithAxis',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/react-charting/src/components/HorizontalBarChartWithAxis',
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
      title: 'HorizontalBarChartWithAxis empty data scenario',
      code: HorizontalBarChartWithAxisEmptyExampleCode,
      view: <HorizontalBarChartWithAxisEmptyExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/docs/HorizontalBarChartWithAxisOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/docs/HorizontalBarChartWithAxisBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/docs/HorizontalBarChartWithAxisDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HorizontalBarChartWithAxis/docs/HorizontalBarChartWithAxisDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
