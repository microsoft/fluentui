import * as React from 'react';
import { styled } from '@fluentui/react/lib/Utilities';
import {
  IHorizontalBarChartWithAxisProps,
  IHorizontalBarChartWithAxisStyleProps,
  IHorizontalBarChartWithAxisStyles,
} from '../../index';
import { getStyles } from './HorizontalBarChartWithAxis.styles';
import { HorizontalBarChartWithAxisWithFallbackBase } from './HBCWithAxisWithFallback.base';

/**
 * HorizontalBarchartWithAxis component.
 * {@docCategory HorizontalBarChartWithAxis}
 */
export const HorizontalBarChartWithAxis: React.FunctionComponent<IHorizontalBarChartWithAxisProps> = styled<
  IHorizontalBarChartWithAxisProps,
  IHorizontalBarChartWithAxisStyleProps,
  IHorizontalBarChartWithAxisStyles
>(HorizontalBarChartWithAxisWithFallbackBase, getStyles);
