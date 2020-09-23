import * as React from 'react';
import { styled } from 'office-ui-fabric-react/lib/Utilities';
import { IHeatMapChartProps, IHeatMapChartStyleProps, IHeatMapChartStyles } from './HeatMapChart.types';
import { getHeatMapChartStyles } from './HeatMapChart.styles';
import { HeatMapChartBase } from './HeatMapChart.base';

export const HeatMapChart: React.FunctionComponent<IHeatMapChartProps> = styled<
  IHeatMapChartProps,
  IHeatMapChartStyleProps,
  IHeatMapChartStyles
>(HeatMapChartBase, getHeatMapChartStyles);
