import * as React from 'react';
import { styled } from '@fluentui/react/lib/Utilities';
import {
  IHorizontalBarChartWithAxisProps,
  IHorizontalBarChartWithAxisStyleProps,
  IHorizontalBarChartWithAxisStyles,
} from '../../index';
import { getStyles } from './HorizontalBarChartWithAxis.styles';
import { HorizontalBarChartWithAxisWithFallback } from './HorizontalBarChartWithAxisWithFallback.base';

// Create a HorizontalBarChartWithAxis variant which uses these default styles and this styled subcomponent.
/**
 * HorizontalBarchartWithAxis component.
 * {@docCategory HorizontalBarChartWithAxis}
 */
export const HorizontalBarChartWithAxis: React.FunctionComponent<IHorizontalBarChartWithAxisProps> = styled<
  IHorizontalBarChartWithAxisProps,
  IHorizontalBarChartWithAxisStyleProps,
  IHorizontalBarChartWithAxisStyles
>(HorizontalBarChartWithAxisWithFallback, getStyles);
