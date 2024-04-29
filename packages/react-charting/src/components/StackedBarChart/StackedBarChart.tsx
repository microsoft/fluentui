import * as React from 'react';
import { styled } from '@fluentui/react/lib/Utilities';
import { IStackedBarChartProps, IStackedBarChartStyleProps, IStackedBarChartStyles } from './StackedBarChart.types';
import { StackedBarChartBase } from './StackedBarChart.base';
import { getStyles } from './StackedBarChart.styles';

// Create a StackedBarChart variant which uses these default styles and this styled subcomponent.
/**
 * StackedBarchart component
 * {@docCategory StackedBarChart}
 */
export const StackedBarChart: React.FunctionComponent<IStackedBarChartProps> = styled<
  IStackedBarChartProps,
  IStackedBarChartStyleProps,
  IStackedBarChartStyles
>(StackedBarChartBase, getStyles);
