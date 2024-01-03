import { styled } from '@fluentui/react';
import * as React from 'react';
import { GaugeChartBase } from './GaugeChart.base';
import { getStyles } from './GaugeChart.styles';
import { IGaugeChartProps, IGaugeChartStyleProps, IGaugeChartStyles } from './GaugeChart.types';

/**
 * Gaugechart component.
 * {@docCategory GaugeChart}
 */
export const GaugeChart: React.FunctionComponent<IGaugeChartProps> = styled<
  IGaugeChartProps,
  IGaugeChartStyleProps,
  IGaugeChartStyles
>(GaugeChartBase, getStyles);
