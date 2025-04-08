import * as React from 'react';
import { styled } from '@fluentui/react/lib/Utilities';
import { IHeatMapChartProps, IHeatMapChartStyleProps, IHeatMapChartStyles } from './HeatMapChart.types';
import { getHeatMapChartStyles } from './HeatMapChart.styles';
import { HeatMapChartBase } from './HeatMapChart.base';

/**
 * HeatMapchart component.
 * {@docCategory HeatMapChart}
 */
export const HeatMapChart: React.FunctionComponent<IHeatMapChartProps> = styled<
  IHeatMapChartProps,
  IHeatMapChartStyleProps,
  IHeatMapChartStyles
>(HeatMapChartBase, getHeatMapChartStyles);
