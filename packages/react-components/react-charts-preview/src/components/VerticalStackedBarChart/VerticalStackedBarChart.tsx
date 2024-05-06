import * as React from 'react';
import { styled } from '../../Utilities';
import {
  IVerticalStackedBarChartProps,
  IVerticalStackedBarChartStyleProps,
  IVerticalStackedBarChartStyles,
} from './VerticalStackedBarChart.types';
import { VerticalStackedBarChartBase } from './VerticalStackedBarChart.base';
import { getStyles } from './VerticalStackedBarChart.styles';

// Create a VerticalStackedBarChart variant which uses these default styles and this styled subcomponent.
/**
 * VerticalStackedBarchart component
 * {@docCategory VerticalStackedBarChart}
 */
export const VerticalStackedBarChart: React.FunctionComponent<IVerticalStackedBarChartProps> = styled<
  IVerticalStackedBarChartProps,
  IVerticalStackedBarChartStyleProps,
  IVerticalStackedBarChartStyles
>(VerticalStackedBarChartBase, getStyles);
