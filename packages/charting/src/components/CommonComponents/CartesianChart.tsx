import * as React from 'react';
import { styled } from 'office-ui-fabric-react/lib/Utilities';
import { IModifiedCartesianChartProps, ICartesianChartStyleProps, ICartesianChartStyles } from './CartesianChart.types';
import { CartesianChartBase } from './CartesianChart.base';
import { getStyles } from './CartesianChart.styles';

export const CartesianChart: React.FunctionComponent<IModifiedCartesianChartProps> = styled<
  IModifiedCartesianChartProps,
  ICartesianChartStyleProps,
  ICartesianChartStyles
>(CartesianChartBase, getStyles);
