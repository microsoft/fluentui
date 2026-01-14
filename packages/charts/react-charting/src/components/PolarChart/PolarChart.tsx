import * as React from 'react';
import { styled } from '@fluentui/react/lib/Utilities';
import { IPolarChartProps, IPolarChartStyleProps, IPolarChartStyles } from './PolarChart.types';
import { PolarChartBase } from './PolarChart.base';
import { getStyles } from './PolarChart.styles';

/**
 * PolarChart component.
 * {@docCategory PolarChart}
 */
export const PolarChart: React.FunctionComponent<IPolarChartProps> = styled<
  IPolarChartProps,
  IPolarChartStyleProps,
  IPolarChartStyles
>(PolarChartBase, getStyles);
