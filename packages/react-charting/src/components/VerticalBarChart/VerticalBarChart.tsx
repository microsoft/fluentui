import * as React from 'react';
import { styled } from '../../Utilities';
import { IVerticalBarChartProps, IVerticalBarChartStyleProps, IVerticalBarChartStyles } from '../../index';
import { VerticalBarChartBase } from './VerticalBarChart.base';
import { getStyles } from './VerticalBarChart.styles';

// Create a VerticalBarChart variant which uses these default styles and this styled subcomponent.
/**
 * VerticalBarchart component
 * {@docCategory VerticalBarChart}
 */
export const VerticalBarChart: React.FunctionComponent<IVerticalBarChartProps> = styled<
  IVerticalBarChartProps,
  IVerticalBarChartStyleProps,
  IVerticalBarChartStyles
>(VerticalBarChartBase, getStyles);
