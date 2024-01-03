import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { HeatMapChartBasicExample } from './HeatMapChartBasic.Example';
import { HeatMapChartCustomAccessibilityExample } from './HeatMapChartBasic.CustomAccessibility.Example';

const HeatMapChartBasicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HeatMapChart/HeatMapChartBasic.Example.tsx');
const HeatMapChartCustomAccessibilityExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HeatMapChart/HeatMapChartBasic.CustomAccessibility.Example.tsx');

export const HeatMapChartPageProps: IDocPageProps = {
  title: 'HeatMapChart',
  componentName: 'HeatMapChart',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-charting/src/components/HeatMapChart',
  examples: [
    {
      title: 'HeatMapChart basic',
      code: HeatMapChartBasicExampleCode,
      view: <HeatMapChartBasicExample />,
    },
    {
      title: 'HeatMapChart custom accessibility',
      code: HeatMapChartCustomAccessibilityExampleCode,
      view: <HeatMapChartCustomAccessibilityExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HeatMapChart/docs/HeatMapChartOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HeatMapChart/docs/HeatMapChartBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HeatMapChart/docs/HeatMapChartDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/HeatMapChart/docs/HeatMapChartDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
