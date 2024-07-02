import * as React from 'react';
import { styled } from '@fluentui/react/lib/Utilities';
import {
  IHorizontalBarChartProps,
  IHorizontalBarChartStyleProps,
  IHorizontalBarChartStyles,
} from './HorizontalBarChart.types';
import { getHorizontalBarChartStyles } from './HorizontalBarChart.styles';
import { HorizontalBarChartWithFallback } from './HorizontalBarChartWithFallback.base';

// Create a HorizontalBarChart variant which uses these default styles and this styled subcomponent.
/**
 * HorizontalBarchart component.
 * {@docCategory HorizontalBarChart}
 */
export const HorizontalBarChart: React.FunctionComponent<IHorizontalBarChartProps> = styled<
  IHorizontalBarChartProps,
  IHorizontalBarChartStyleProps,
  IHorizontalBarChartStyles
>(HorizontalBarChartWithFallback, getHorizontalBarChartStyles);
