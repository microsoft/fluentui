import * as React from 'react';
import { styled } from '@fluentui/react/lib/Utilities';
import {
  IMultiStackedBarChartProps,
  IMultiStackedBarChartStyleProps,
  IMultiStackedBarChartStyles,
} from './MultiStackedBarChart.types';
import { MultiStackedBarChartBase } from './MultiStackedBarChart.base';
import { getMultiStackedBarChartStyles } from './MultiStackedBarChart.styles';

// Create a MultiStackedBarChart variant which uses these default styles and this styled subcomponent.
/**
 * MultiStackedBarchart component
 * {@docCategory MultiStackedBarChart}
 */
export const MultiStackedBarChart: React.FunctionComponent<IMultiStackedBarChartProps> = styled<
  IMultiStackedBarChartProps,
  IMultiStackedBarChartStyleProps,
  IMultiStackedBarChartStyles
>(MultiStackedBarChartBase, getMultiStackedBarChartStyles);
