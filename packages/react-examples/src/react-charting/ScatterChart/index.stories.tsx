import * as React from 'react';

import { ScatterChartBasicExample } from './ScatterChart.Basic.Example';
import { ScatterChartDateExample } from './ScatterChart.DateAxis.Example';
import { ScatterChartStringExample } from './ScatterChart.StringAxis.Example';

export const Basic = () => <ScatterChartBasicExample />;
export const Date = () => <ScatterChartDateExample />;
export const String = () => <ScatterChartStringExample />;

export default {
  title: 'Components/ScatterChart',
};
