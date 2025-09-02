import * as React from 'react';

import { ScatterChartBasicExample } from './ScatterChart.Basic.Example';
import { ScatterChartDateExample } from './ScatterChart.DateAxis.Example';
import { ScatterChartStringExample } from './ScatterChart.StringAxis.Example';
import { ScatterChartLogAxisExample } from './ScatterChart.LogAxis.Example';
import { ScatterChartShapesExample } from './ScatterChart.Shapes.Example';

export const Basic = () => <ScatterChartBasicExample />;
export const Date = () => <ScatterChartDateExample />;
export const StringAxis = () => <ScatterChartStringExample />;
export const LogAxis = () => <ScatterChartLogAxisExample />;
export const Shapes = () => <ScatterChartShapesExample />;

export default {
  title: 'Components/ScatterChart',
};
