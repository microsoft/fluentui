import * as React from 'react';
import { styled } from '@fluentui/react/lib/Utilities';
import {
  IHorizontalBarChartWithAxisProps,
  IHorizontalBarChartWithAxisStyleProps,
  IHorizontalBarChartWithAxisStyles,
} from '../../index';
import { HorizontalBarChartWithAxisBase } from './HorizontalBarChartWithAxis.base';
import { getStyles } from './HorizontalBarChartWithAxis.styles';

// Create a HorizontalBarChartWithAxis variant which uses these default styles and this styled subcomponent.
/**
 * HorizontalBarchartWithAxis component.
 * {@docCategory HorizontalBarChartWithAxis}
 */
export const HorizontalBarChartWithAxis: React.FunctionComponent<IHorizontalBarChartWithAxisProps> = styled<
  IHorizontalBarChartWithAxisProps,
  IHorizontalBarChartWithAxisStyleProps,
  IHorizontalBarChartWithAxisStyles
>(HorizontalBarChartWithAxisBase, getStyles);
