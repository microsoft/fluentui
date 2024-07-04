import * as React from 'react';
import { styled } from '@fluentui/react/lib/Utilities';
import {
  IHorizontalBarChartProps,
  IHorizontalBarChartStyleProps,
  IHorizontalBarChartStyles,
} from './HorizontalBarChart.types';
import { getHorizontalBarChartStyles } from './HorizontalBarChart.styles';
import { HorizontalBarChartWithFallbackBase } from './HBCWithFallback.base';

/**
 * HorizontalBarchart component.
 * {@docCategory HorizontalBarChart}
 */
export const HorizontalBarChart: React.FunctionComponent<IHorizontalBarChartProps> = styled<
  IHorizontalBarChartProps,
  IHorizontalBarChartStyleProps,
  IHorizontalBarChartStyles
>(HorizontalBarChartWithFallbackBase, getHorizontalBarChartStyles);
