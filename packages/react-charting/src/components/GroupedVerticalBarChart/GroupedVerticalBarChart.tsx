import * as React from 'react';
import { styled } from '../../Utilities';
import {
  IGroupedVerticalBarChartProps,
  IGroupedVerticalBarChartStyleProps,
  IGroupedVerticalBarChartStyles,
} from '../../index';
import { GroupedVerticalBarChartBase } from './GroupedVerticalBarChart.base';
import { getStyles } from './GroupedVerticalBarChart.styles';

// Create a GroupedVerticalBarChart variant which uses these default styles and this styled subcomponent.
/**
 * GroupedVerticalBarchart component.
 * {@docCategory GroupedVerticalBarChart}
 */
export const GroupedVerticalBarChart: React.FunctionComponent<IGroupedVerticalBarChartProps> = styled<
  IGroupedVerticalBarChartProps,
  IGroupedVerticalBarChartStyleProps,
  IGroupedVerticalBarChartStyles
>(GroupedVerticalBarChartBase, getStyles);
