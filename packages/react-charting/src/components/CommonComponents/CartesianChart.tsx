import * as React from 'react';
import { styled } from '@fluentui/react/lib/Utilities';
import {
  IModifiedCartesianChartProps,
  IModifiedCartesianChartLiteProps,
  ICartesianChartStyleProps,
  ICartesianChartStyles,
} from './CartesianChart.types';
import { CartesianChartBase } from './CartesianChart.base';
import { CartesianChartLiteBase } from './CartesianChartLite.base';
import { getStyles } from './CartesianChart.styles';

export const CartesianChart: React.FunctionComponent<IModifiedCartesianChartProps> = styled<
  IModifiedCartesianChartProps,
  ICartesianChartStyleProps,
  ICartesianChartStyles
>(CartesianChartBase, getStyles);

export const CartesianChartLite: React.FunctionComponent<IModifiedCartesianChartLiteProps> = styled<
  IModifiedCartesianChartProps,
  ICartesianChartStyleProps,
  ICartesianChartStyles
>(CartesianChartLiteBase, getStyles);
