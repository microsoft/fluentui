import * as React from 'react';
import { styled } from '@fluentui/react/lib/Utilities';
import { IModifiedCartesianChartProps, ICartesianChartStyleProps, ICartesianChartStyles } from './CartesianChart.types';
import { CartesianChartBase } from './CartesianChart.base';
import { getStyles } from './CartesianChart.styles';

/**
 * Cartesian Chart component
 * {@docCategory CartesianChart}
 */
export const CartesianChart: React.FunctionComponent<IModifiedCartesianChartProps> = styled<
  IModifiedCartesianChartProps,
  ICartesianChartStyleProps,
  ICartesianChartStyles
>(CartesianChartBase, getStyles);
